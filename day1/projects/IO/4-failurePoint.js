// Mixing Blocking and Non-blocking - Oops code!
const fs = require('fs');
const data = fs.readFileSync('./file1.md');

console.log(data);

fs.unlink('./file1.md', ()=> {})
// findout what fs.unlinkSync and fs.unlink does?


// Entirely Non-blocking - Good code!
// const fs = require('fs');  
// fs.readFile('/file1.md', (readFileErr, data) => {
//   if (readFileErr) throw readFileErr;
//   console.log(data);
//   fs.unlink('/file1.md', (unlinkErr) => {
//     if (unlinkErr) throw unlinkErr;
//   });
// });