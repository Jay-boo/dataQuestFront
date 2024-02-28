import ReactMarkdown from "react-markdown";
import ToggleList from "./toggleList";

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
                  <ReactMarkdown>{section.text}</ReactMarkdown>
                )
            );

          }
        )
      }
      
  </div>
  )
}

export default MarkdownRenderer;
