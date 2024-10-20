const fs = require('fs');
if(!fs.existsSync('new')){

  fs.mkdirSync('new');
}
fs.writeFileSync('new/test.js', 'console.log(`hello`);');
// console.log();
fs.appendFileSync('new/test.js', '  console.log(`welocme`);');
// console.log();

const data = fs.readFileSync('new/test.js', 'utf8');
console.log(data);

fs.renameSync('new/test.js', 'new/new.js');

fs.unlinkSync('new/new.js');
fs.rmdirSync('new');