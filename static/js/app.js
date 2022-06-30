function init(){

d3.json("samples.json").then(function(data){

    //  console.log(data.names);
// build drop down by id
//option tag to rep the id numbers

    for(i = 0; i < data.names.length; i++){
        //append to drop down select tag
        //select the select tag
        // console.log(data.names[i])
        let dropdown = d3.select("#selDataset");
     
    // add value and content 
        namesList = dropdown.append("option")
        namesList.text(data.names[i])
        namesList.attr('value', data.names[i])
    }
    // displaying charts
   buildTable(data.metadata[0])
   barChart(data.samples[0])
   bubbleChart(data.samples[0])
//    gaugeChart(data.samples[0])

});
}

// updatePlotly, run following code when drop down is clicked
d3.select("#selDataset").on("change", updatePlotly);

// create function to change the plots with the selection on the dropdown
function updatePlotly(){
    // console.log("something is happening")
    
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let nameId = dropdownMenu.property("value");
        // console.log(nameId);

    //get data to update charts with
    d3.json("samples.json").then(function(data){
        // console.log(data.metadata)

    //use the 'id' key for the value that matches the nameId
    let metaId = data.metadata.filter((dict) => {return dict.id == nameId})
        // console.log(metaId)
    
    //update table
    buildTable(metaId[0])

    //use the 'id' key for the value that matches the nameId
    let sampleId = data.samples.filter((dict2) => {return dict2.id == nameId})
    console.log(sampleId)
    
    // update bar chart
    barChart(sampleId[0])

    // update bubble chart
    bubbleChart(sampleId[0])

    })
}

//define func
function buildTable(metadata){
    // console.log("buildTable func is being exe")
    // console.log(metadata)
    let demoTable = d3.select('#sample-metadata');

    //clear table before new data is appended
    demoTable.html('')

    //build table
    let fillTable = demoTable.append("table")
    let row = fillTable.append('tr')
    let tableData = row.append('td')

    //display metadata[0] within td tag
    let id = tableData.text('ID: '+ metadata.id)
    row = fillTable.append('tr')
    tableData = row.append('td')
    let ethn = tableData.text('Ethnicity: '+ metadata.ethnicity)
    row = fillTable.append('tr')
    tableData = row.append('td')
    let gen = tableData.text('Gender: '+ metadata.gender)
    row = fillTable.append('tr')
    tableData = row.append('td')
    let age = tableData.text('Age: '+ metadata.age)
    row = fillTable.append('tr')
    tableData = row.append('td')
    let loc = tableData.text('Location: '+ metadata.location)
    row = fillTable.append('tr')
    tableData = row.append('td')
    let bb = tableData.text('BB Type: '+ metadata.bbtype)
    row = fillTable.append('tr')
    tableData = row.append('td')
    let freq = tableData.text('Wfreq: '+ metadata.wfreq)
}

//create a bar chart
function barChart(sample){
    // console.log('bar chart is running')
    // console.log(sample.otu_ids)
    // console.log(sample.sample_values)
    // console.log(sample.otu_labels)

    // identify the top 10 otus
    let valueList = sample.sample_values.slice(0,10);
    let topTen = sample.otu_ids; 

    //   console.log(topTen)
    //   console.log(valueList)

    //add "otu" in front of y axis values
     let topTenString = topTen.map(function (x){return "OTU "+ x.toString()})
     let topTenOtu = topTenString.slice(0,10)
    //  console.log(topTenOtu)

    var data = [{
        type: 'bar',
        text: sample.otu_labels,
        x: valueList.sort(function(a,b){return a - b;}),
        y: topTenOtu.reverse(),
        orientation: 'h'
      }];

    var layout = {
        title: 'Top 10 OTUs'
    }
      
      Plotly.newPlot('bar', data, layout);
}

function bubbleChart(sample){
    // console.log('bubble chart is running')
    // console.log(sample.otu_ids)
    // console.log(sample.sample_values)
    // console.log(sample.otu_labels)

    var trace1 = {
    x: sample.otu_ids,
    y: sample.sample_values,
    text: sample.otu_labels,
    mode: 'markers',
    marker: {
        color: sample.otu_ids,
        size: sample.sample_values
    }
    };

    var data2 = [trace1];

    var layout2 = {
    title: 'OTU Values',
    };

    Plotly.newPlot('bubble', data2, layout2);
}

init();
