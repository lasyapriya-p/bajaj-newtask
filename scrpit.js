const fs = require('fs');
const filePath = 'test.txt'; // Path to your image file
const fileBuffer = fs.readFileSync(filePath);
const base64String = fileBuffer.toString('base64');
console.log(base64String);
