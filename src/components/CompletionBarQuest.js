
import React from "react";
import * as d3 from 'd3';
import "../styles/completionBar.css"

function CompletionBarQuest({ data ,max}) {
    console.log('completion bar entering data',data);
    const svgRef = React.useRef();
    // const totalTrue=data.filter(d=>d.exist).length;
    // const totalFalse=data.length- totalTrue;
    let existPercentage = (data / max) * 100;
    existPercentage=existPercentage.toFixed(0)
    let nonExistPercentage = (data / max) * 100;
    nonExistPercentage=nonExistPercentage.toFixed(1)





    const minWidthForText = 20; // Minimum width for showing text
    const minHeightForText = 20; // Minimum height for showing text

    // console.log(existPercentage);
  
    React.useEffect(() => {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();
  
      // Append non-exist bar
      svg.append("rect")
        .attr("class", "non-exist")
        .attr("x", function(){
          var xvalue=(existPercentage-10)>0 ? (existPercentage-10) +"%" : "0%"
          return xvalue
        })
        .attr("y", 0)
        .attr("width", (100 - existPercentage) + "%")
        .attr("height", "100%") // Set height to 100%
        .attr('rx',10)
        .attr('ry',10)
        .attr('fill','#939393')
        .append('title').text(`${(max-data)}/${max} questions non validées`);
  
      // Append exist bar
      svg.append("rect")
        .attr("class", "exist")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", existPercentage + "%")
        .attr("height", "100%")
        .attr('rx',10)
        .attr('ry',10)
        .attr('fill',"#20772A")
        .append('title').text(`${data}/${max} questions validées`)

    svg.append("text")
        .attr("x", existPercentage / 2 + "%")
        .attr("y", "50%")
        .attr("text-anchor", "start")
        .attr("dominant-baseline", "middle")
        .attr("fill", "black")
        .text(existPercentage + "%");


    svg.selectAll("rect")
    .on("mouseover",(event,v)=>{
      
      d3.select(event.currentTarget).attr("stroke-width",4).attr('stroke', '#31363F');
    })
  .on("mouseout",(event,v)=>{
      
      d3.select(event.currentTarget).attr('stroke', 'None');
    })
    }, [existPercentage]);
        
        
  
    return (
      <svg ref={svgRef} width="50%" height="10%">
        {/* Apply additional SVG elements if needed */}
      </svg>
    );
  }
  export default CompletionBarQuest;
