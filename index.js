const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

console.log('Starting file copy');

//get contents of excel file
var workbook = XLSX.readFile('example.xlsx');
var sheet = workbook.Sheets[workbook.SheetNames[0]];
var json = XLSX.utils.sheet_to_json(sheet);

//copy input files to output folder with new names
var imageSourceFolder = './input';
var imageDestinationFolder = './output';

if (!fs.existsSync(imageDestinationFolder)) {
    fs.mkdirSync(imageDestinationFolder);
}

for (var row of json) {
    var sourceFile = path.join(imageSourceFolder, row.column1 + '.txt');
    if (fs.existsSync(sourceFile)) {
        var destinationFile = path.join(imageDestinationFolder, row.column2 + '.txt');
        fs.writeFileSync(destinationFile, fs.readFileSync(sourceFile));
    }
}

console.log('Done copying files');