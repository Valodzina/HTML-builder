const fs = require('fs'); //module
const path = require('path');
const stream = fs.createReadStream((path.join(__dirname, 'text.txt')), 'utf-8');
//use Read Stream
let data = '';

stream.on('data', chunk => data += chunk); // data in chanks length 64kb
stream.on('end', () => console.log( data)); // when end show data
stream.on('error', error => console.log('Error', error.message)); // in wrong name of the path