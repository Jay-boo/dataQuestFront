import ReactMarkdown from "react-markdown";
import ToggleList from "./toggleList";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const copyToClipboard = (text) => {
                    console.log("COPY TO CLIPBOARD",text);
                    navigator.clipboard.writeText(text)
                      .catch((error) => console.error('Could not copy code: ', error));
                  };
const parseMarkdownContent=(content)=>{
  console.log("content",content);
  console.log("parseMarkdownContent",content,content.length)
  
  const hintRegex = /<!-- hint -->(.*?)<!-- \/hint -->/gs;
  const sections=[]
  let match;
  let lastIndex=0;
  let counter=0;
  // console.log("parseMarkdownContent",hintRegex.exec(content));
  while ((match=hintRegex.exec(content)) !==null){
    // console.log("Match==========>",match,counter);
    if (match.index>lastIndex){
      sections.push({
        text:content.substring(lastIndex,match.index),
        isHint:false,
        
      })
    }
    sections.push({text:match[1],isHint:true});
    lastIndex=hintRegex.lastIndex;
    counter=counter+1;
  }
  console.log("content.length",content.length);
  if (lastIndex < content.length){
    sections.push({
      text:content.substring(lastIndex),
      isHint:false
    })
  }
  console.log("ending sections",sections);
  return sections;
  
}


const MarkdownRenderer =({content})=>{
    const components={
      code({node,inline,className,children,...props}){
        const language= className ? className.replace('language-',''):'plaintext';
        console.log('language',language);
        if (language=="plaintext"){
                      return(
                          <span style={{backgroundColor:"red",justifyContent:"center",paddingLeft:"5px",paddingRight:"5px",paddingTop:"2px",borderRadius:"5px",backgroundColor:"#2e344b",color:"#C38181"}}>{children}</span>
                      )
        }else if(language=="callout"){
          return(

                      <div style={{ backgroundColor:"#C38181", padding: "1em", margin: "0.5em 0px", overflow: "auto", borderRadius: "10px", width:"90%",fontWeight:"bolder", fontSize:"16px" }}>
                        <div style={{ position: 'relative' }} dangerouslySetInnerHTML={{ __html: children }}>
                        </div>
                      </div>
                      )
        }else{
          return (
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


    }

  console.log("In MarkdownRenderer",content);
  const parsedContent=parseMarkdownContent(content);
  console.log("PARSED RENDER",parsedContent);
  return(
  <div>
      {
        parsedContent.map(
          (section,index)=>{
            console.log('section===>',section);
            return(
              section.isHint ? (
                <ToggleList>{section.text}</ToggleList>
              ): (
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
