const fsPromises = require('fs/promises');
const path = require('path');

(async() => {
    const pathFROM = path.join(__dirname, 'styles');
    const pathIN = path.join(__dirname, 'project-dist', 'bundle.css');

    const files = await fsPromises.readdir(pathFROM, { withFileTypes: true });
    let bundleText = '';

    for (let file of files) {
        const pathItem = path.join(pathFROM, file.name);
        const type = file.name.split('.').pop();

        if (type === 'css') {
            const cssContent = await fsPromises.readFile(pathItem, 'utf8');
            bundleText = bundleText + cssContent + '\n\n\n';
        }
    }

    await fsPromises.writeFile(pathIN, bundleText);
    console.log('Done, look at folders')
})();