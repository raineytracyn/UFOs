// import data from data.js
const tableData = data;
// Ref HTML table(output) using d3 library
var tbody = d3.select('tbody');
// Fx of populate data into html table
function buildTable(data) {
    // init table data
    tbody.html('');

    // 1st array loop for <tr>
    data.forEach((dataRow) => {
        let row = tbody.append('tr'); //html
        //second loop for <td>
        Object.values(dataRow).forEach((val) =>{
            let cell = row.append('td'); //html
            // d3 funtion 
            cell.text(val);
        });
    });

};
// Track filters
var filters = {};
function updateFilters() {
    // Save element, value, & id of the filter that was changed
        let inputElement = d3.select(this);
        let inputID = inputElement.attr("id");
        let inputValue = inputElement.property("value");
        // Create an if-else statement to add filter data from input
        if (inputValue) {
            filters[inputID] = inputValue;
        } else{filters ={};};
    //console.log(filters)
    // Call fx to apply all filters and rebuild the table
    filterTable(filters);
};

function filterTable(obj) {

    // Set the filteredData to the tableData
    let filteredData = tableData;
    // Loop through the filters and keep any data that
    // matches the filter values

    Object.entries(obj).forEach(([fkey, fval]) =>{
        
        filteredData = filteredData.filter((row) => row[fkey] === fval)
    
    });

    // Finally, rebuild table using the filtered Data
    buildTable(filteredData);
};



// d3 event handling
d3.selectAll("input").on("change",updateFilters);
// show original table when page loads, before event triggerd
buildTable(tableData);