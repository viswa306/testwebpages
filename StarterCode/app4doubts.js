// / new file for the homework with out event handler the graph are working:
// Use the D3 library to read in `samples
// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument


// function unpack(rows, index) {
//     return rows.map(function(row) {
//       return row[index];
//     });
//   }
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
var labels = otu_ids.slice(0, 10).map(otuID => `${otuID}`).reverse()
//  -----------------part 3 Demographic info for this code data is displaying as array----------------------------------------------
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

// * Use `otu_ids` for the x values.

// * Use `sample_values` for the y values.

// * Use `sample_values` for the marker size.

// * Use `otu_ids` for the marker colors.

// * Use `otu_labels` for the text values.

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
        //  margin: { t: 30} if this is in the chart is showing the tiltle
    };


Plotly.newPlot('bubble', data, layout)
// ---------------------------------------pie chart--------------------------------------------------------------
var trace3 = {
  labels: labels,
    values:otu_ids,
  type: "pie"
};
var data =[trace3]
 var layout ={

  title:"pie chart"
 }
 Plotly.newPlot("pie",data,layout);
  
 
// -------------------------------Demographic info-----------------------------------------------





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