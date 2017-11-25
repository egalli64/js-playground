/*
csvtojson https://npmjs.org/csvtojson

from csv:
id,first_name,last_name,email,gender,ip_address,ssn,credit_card,bitcoin,street_address
1,Ario,Noteyoung,anoteyoung0@nhs.uk,Male,99.5.160.227,509-86-9654,5602256742685208,179BsXQkUuC6NKYNsQkdmKQKbMBPmJtEHB,0227 Kropf Court
2,Minni,Endon,mendon1@netvibes.com,Female,213.62.229.103,765-11-9543,67613037902735554,135wbMcR98R6hqqWgEJXHZHcanQKGRPwE1,90 Sutteridge Way

to json:
[
  {
    "id": "1",
    "first_name": "Ario",
    "last_name": "Noteyoung",
    "email": "anoteyoung0@nhs.uk",
    "gender": "Male",
    "ip_address": "99.5.160.227",
    "ssn": "509-86-9654",
    "credit_card": "5602256742685208",
    "bitcoin": "179BsXQkUuC6NKYNsQkdmKQKbMBPmJtEHB",
    "street_address": "0227 Kropf Court"
  },
  {
    "id": "2",
    "first_name": "Minni",
    "last_name": "Endon",
    "email": "mendon1@netvibes.com",
    "gender": "Female",
    "ip_address": "213.62.229.103",
    "ssn": "765-11-9543",
    "credit_card": "67613037902735554",
    "bitcoin": "135wbMcR98R6hqqWgEJXHZHcanQKGRPwE1",
    "street_address": "90 Sutteridge Way"
  },
  ...
 */

const csvFilePath = 'customer-data.csv'
const csv = require('csvtojson')
const fs = require('fs')
const path = require('path')

var jsonArray = []

csv()
  .fromFile(csvFilePath)
  .on('json', (data) => {
    //    console.log(data)
    jsonArray.push(data)
  }).on('end', () => {
    fs.writeFileSync(path.join(__dirname, 'customer-data.json'), JSON.stringify(jsonArray, null, 2))
    //    console.log(jsonArray)
  })