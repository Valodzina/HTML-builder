const fsPromises = require('fs/promises');
const path = require('path');
const fpath = path.join(__dirname, 'secret-folder');

(async() => {
    const arrFiles = await fsPromises.readdir(fpath, { withFileTypes: true });
    for (let file of arrFiles) {
        if (file.isFile() == true) {

            const fullname = file.name.split('.');
            const type = fullname.pop();
            const name = fullname.join('.')
            const size = (await fsPromises.stat(path.join(__dirname, 'secret-folder', file.name))).size;
            console.log(name + ' - ' + type + ' - ' + size + 'b')
        }
    }
})();