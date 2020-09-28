// Bonus part Gauge chart

function buildplot(sample){
    console.log("------------2")
  d3.json("js/samples.json").then((importedData)=>{
  // d3.json("static/samples.json").then(function(data) {
  
      console.log(importedData);
      
      var data=importedData;
      
  // -------------------------------------------------------------------------------------
  // Grab values from the data json object to build the plots
  var name = data.names;
  console.log(name);
   var samples = data.samples;
   console.log(samples);
  //  for (var i = 0; i < name.length; i++) {
  //    console.log(name[i]);
      //  console.log("-----------------------------------");
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample );
      console.log(resultArray);
      var result = resultArray[0];
   
     console.log(result);
     var sample_values = result.sample_values;
     console.log(sample_values);
     // Use `otu_labels` as the hovertext for the chart.
   var otu_labels = result.otu_labels;
   console.log(otu_labels);
   var otu_ids = result.otu_ids;
   console.log(otu_ids);
   // Use `otu_ids` as the labels for the bar chart
   var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse()
   console.log(yticks);
   var samplesSort = sample_values.slice(0,10).reverse();
   console.log(samplesSort);
  
  //  pie chart labels
//   var labels = otu_ids.slice(0, 10).map(otuID => `${otuID}`).reverse()
  //  -----------------part 3 Demographic info ----------------------------------------------
    var metaData =data.metadata;
    var metaData1 =metaData.filter(metadObj => metadObj.id == sample );
    // var metaData= data.metadata[0];
    console.log(metaData1[0]);
    d3.select("#sample-metadata").html(" ");
    Object.entries(metaData1[0]).forEach(([key, value]) => {
      
      d3.select("#sample-metadata")
              .append("h6")
        .text(`${key}: ${value}`);
  
    
    });
  
  
  // ---------------------------------Barchart-----------------------------------------------------------
  
  var trace1 = {
    type: "bar",
      
      x:samplesSort ,
        y:yticks,
      text:otu_labels,
       orientation: "h"
   }
  
  
  var data = [trace1];
  var layout = {
    title: "'Bar' Chart",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  
  Plotly.newPlot("bar",data,layout);  
  
  
     
  // ---------------------------- Bubble chart--------------------------------------------
  
  
  var trace2 = {
    x: otu_ids,
    y:samplesSort,
    // y:sample_values,
    mode: 'markers',
    text: otu_labels,
      marker: {
      color:otu_ids,
      colorscale:"Earth",
      opacity: [1,0.8, 0.6, 0.4, 0.2],
  //  size:sample_values
   size:samplesSort
    }
  };
  
  var data = [trace2];
  
  var layout = {
    title: "Bacteria Cultures Per Sample",
        // margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
          
      };
  
  
  Plotly.newPlot('bubble', data, layout)
  // ---------------------------------------pie chart--------------------------------------------------------------

    
  // -------------------------------init function testsubject id is updated----------------------------------------------
  
  
  
  
  
  });
  }
  function init(){
    console.log("------------1")
    buildplot(940);
   var testId = d3.select("#selDataset");
   d3.json("js/samples.json").then((importedData)=>{
    // d3.json("static/samples.json").then(function(data) {
    
        console.log(importedData);
  var data = importedData;
  var names = data.names;
  console.log(names);
  names.forEach(name=>{
    testId.append("option").property("value",name).text(name);
  
  })
  
   }); 
                
  }
  init();
  
  function optionChanged(sample){
  
  buildplot(sample);
  
  
  }

//   ------------------------------------------------------------------------------------

    // Enter a speed between 0 and 180
var level = 90;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
    
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);
 var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
// Path: may have to change to create a better triangle
 var mainPath = path1,
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 14, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  {values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
    //   values: [1,1,1,1,4],
  rotation: 90,
//   text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
  text: ['8-9','7-8','6-7','5-6','4-5','3-4','2-3','1-2','0-1'],

  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(249, 168, 37, .5)', 'rgba(183,28,28, .5)',
                         'rgba(0, 0, 0, 0.5)']},
  hoverinfo: 'label',
  hole: .5,
 type: 'pie',
  showlegend: false
       
}];

var layout = {title:" Belly button washing Frequency",

  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  height: 400,
  width: 400,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);