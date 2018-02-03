/**
 * Convert a csv file to json
 * 
 * When no input filename provided, it looks for 'customer-data.csv'
 * The output file has the same name but with '.json' extension
 * Warning: if the output file already exists, it will be silently overwritten
 */
const csv = require('csvtojson')
const fs = require('fs')

const DEFAULT_FILENAME = 'customer-data.csv'
const EXT = '.json'

const converter = (fileIn = DEFAULT_FILENAME) => {
  let fileOut = fileIn.indexOf('.') == -1 ? fileIn + EXT : fileIn.replace(/\.[^/.]+$/, EXT)

  csv().fromFile(fileIn).on('end_parsed', jsonArray => {
    fs.writeFileSync(fileOut, JSON.stringify(jsonArray, null, 2));
    console.log(`${fileIn} converted to ${fileOut}`);
  }).on('error', (error) => {
    console.error(`Can't convert ${fileIn}: ${error.message}`)
  })
}

converter(process.argv[2])