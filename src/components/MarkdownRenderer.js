import ReactMarkdown from "react-markdown";
import ToggleList from "./toggleList";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import Callout from "./callout";
import Jump from "./jump";

const copyToClipboard = (text) => {
                    console.log("COPY TO CLIPBOARD",text);
                    navigator.clipboard.writeText(text)
                      .catch((error) => console.error('Could not copy code: ', error));
                  };

const parseMarkdownContent = (content) => {
  console.log("parseMardownContent");
  const hintRegex = /<!-- hint -->(.*?)<!-- \/hint -->/gs;
  const calloutRegex = /<!-- callout -->(.*?)<!-- \/callout -->/gs;
  const jumpRegex = /<!-- jump -->(.*?)<!-- \/jump -->/gs;
  const sections = [];
  let hintMatch;
  let calloutMatch;
  let jumpMatch;
  // console.log("BEFORED MATCHE HINT",hintMatch);
  // console.log("BEFORED MATCHE CALLOUT",calloutMatch);
  while ((hintMatch=hintRegex.exec(content))!==null){
    sections.push({index:hintMatch.index,length:hintMatch[0].length,text:hintMatch[1],isHint:true,isCallout:false,isJump:false})
  }
  while ((calloutMatch=calloutRegex.exec(content))!==null){
    sections.push({index:calloutMatch.index,length:calloutMatch[0].length,text:calloutMatch[1],isHint:false,isCallout:true,isJump:false})
  }
  while ((jumpMatch=jumpRegex.exec(content))!==null){
    sections.push({index:jumpMatch.index,length:jumpMatch[0].length,text:jumpMatch[1],isHint:false,isCallout:false,isJump:true })
  }
  // console.log("SECTION THERE :",sections);
  sections.sort((a,b)=>a.index - b.index);
  // console.log("SECTION SORTED :",sections);
  let fullSections=[]
  let lastIndex = 0;
  sections.forEach((section,index)=>{
    if (section.index > lastIndex){
      fullSections.push({
        text:content.substring(lastIndex,section.index),
        isHint:false,
        isCallout:false,
        isJump:false
      })
    }
    fullSections.push({
      text:section.text,
      isHint:section.isHint,
      isCallout:section.isCallout,
      isJump:section.isJump
    })
    lastIndex=section.index+section.length;
  })
  if (lastIndex < content.length){
    fullSections.push({
      text:content.substring(lastIndex),
      isHint:false,
      isCallout:false,
      isJump:false
    })
  }
  // console.log("Detected Sections",sections);
  // console.log("Detected Sections in markdown : ",fullSections);
  return fullSections;
};











const MarkdownRenderer =({content})=>{
  const subcomponents={
      code({node,inline,className,children,...props}){
        const language= className ? className.replace('language-',''):'plaintext';
        console.log('language',language);
        if (language=="plaintext"){
                      return(
                          <span style={{backgroundColor:"red",justifyContent:"center",paddingLeft:"5px",paddingRight:"5px",paddingTop:"2px",borderRadius:"5px",backgroundColor:"#2e344b",color:"#C38181"}}>{children}</span>
                      )
        }
      },
  }

  const components={
    code({node,inline,className,children,...props}){
      const language= className ? className.replace('language-',''):'plaintext';
      // console.log('language',language);
      if (language=="plaintext"){
                    return(
                        <span style={{backgroundColor:"red",justifyContent:"center",paddingLeft:"5px",paddingRight:"5px",paddingTop:"2px",borderRadius:"5px",backgroundColor:"#2e344b",color:"#C38181"}}>{children}</span>
                    )
      }else if(language=="callout"){
        return(

                    <div style={{ display:'flex',width:"100%",justifyContent:"center"}}>
                      <div style={{ backgroundColor:"#C38181", padding: "0.5em", overflow: "auto", borderRadius: "10px", width:"90%",fontWeight:"bolder", fontSize:"16px" }}>
            <ReactMarkdown components={subcomponents}>{children}</ReactMarkdown>
                        
                      </div>
                    </div>
                    )
      }else{
        return (
                    <div style={{ display:'flex',width:"100%",justifyContent:"center"}}>
                    <div style={{ backgroundColor:"#060522", padding: "1em", margin: "0.5em 0px", overflow: "auto", borderRadius: "10px", width:"90%",fontSize:"14px" }}>
                      <div style={{ position: 'relative',display:'flex'  }}>
                        <IconButton aria-label="content-copy" style={{ position: 'absolute', top: '-4px', right: '5px', color:"white" }} onClick={() => { copyToClipboard(children) }}>
                          <ContentCopyIcon />
                        </IconButton>
                        <SyntaxHighlighter
                          language={className.replace('language-', '')} // Extract language from className
                          style={darcula}
                          PreTag={(props) => (
                            <pre id={`code-${Math.random().toString(36).substr(2, 9)}`} {...props} style={{ borderRadius: "10px", marginTop:"0%" }} />
                          )}
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                    </div>
                  );


      }
    },
    p({node,children,...props}){
      return (
      <p style={{marginBottom:"1rem"}} {...props}> 
          {children}
      </p>
      )
    }
    // hr: () => <p style={{ marginBottom: "1rem" }}>Hello World</p>


  }

  // console.log("In MarkdownRenderer",content);
  const parsedContent=parseMarkdownContent(content);
  // console.log("Parsed sections : ",parsedContent);
  return(
  <div>
      {
        parsedContent.map(
          (section,index)=>{
            console.log('section ===>',section);
            return(
              section.isHint ? (
                <ToggleList>{section.text}</ToggleList>
              ): section.isCallout ? (
              <Callout>{section.text}</Callout>
              ):section.isJump ? (
                <Jump>{section.text}</Jump>


              ):(
                  <ReactMarkdown components={components}>{section.text}</ReactMarkdown>
                )
            );

          }
        )
      }
      
  </div>
  )
}

export default MarkdownRenderer;
