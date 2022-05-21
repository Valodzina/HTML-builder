//1
const fs = require('fs');
const path = require('path');
//2
const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


//3
console.log('Insert text')
    //4-6
readline.on('line', (text) => {
    let txttrm = text.trim()
    if (txttrm === 'exit') {
        readline.close();
    }

    stream.write(text + '\n');
});

readline.on('close', () => {
    process.exit();
});
process.on('SIGINT', () => {
    readline.close();
    process.exit();
});
//7
process.on('exit', () => {
    console.log('Bye!');
});