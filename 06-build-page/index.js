const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const pathProjectDist = path.join(__dirname, 'project-dist');
const pathPDAssets = path.join(__dirname, 'project-dist', 'assets');
const pathPDStyle = path.join(__dirname, 'project-dist', 'style.css');
const pathPDIndex = path.join(__dirname, 'project-dist', 'index.html');
const pathComponents = path.join(__dirname, 'components');
const pathAssets = path.join(__dirname, 'assets');
const pathStyles = path.join(__dirname, 'styles');
const pathTemplate = path.join(__dirname, 'template.html');


fs.access(pathProjectDist, (error) => {
    if (error) {
        fsPromises.mkdir(pathProjectDist);
    }
});

(async() => {
    let bundleText = '';
    const files = await fsPromises.readdir(pathStyles, { withFileTypes: true });
    for (let file of files) {
        const pathItem = path.join(pathStyles, file.name);
        const type = file.name.split('.').pop();
        if (type === 'css') {
            const cssContent = await fsPromises.readFile(pathItem, 'utf8');
            bundleText = bundleText + cssContent + '\n\n\n';

        }
    }
    createFile(pathPDStyle, bundleText);
})();



async function copyFolder(pathFolderFrom, pathFolderIn) {
    await fsPromises.rm(pathFolderIn, { force: true, recursive: true });
    await fsPromises.mkdir(pathFolderIn, { recursive: true });

    const filesItems = await fsPromises.readdir(pathFolderFrom, { withFileTypes: true });

    for (let item of filesItems) {
        if (item.isFile() == true) {
            await fsPromises.copyFile(path.join(pathFolderFrom, item.name), path.join(pathFolderIn, item.name));
        }
        if (item.isDirectory() == true) {
            await fsPromises.mkdir(path.join(pathFolderIn, item.name), { recursive: true });
            await copyFolder(path.join(pathFolderFrom, item.name), path.join(pathFolderIn, item.name));
        }
    }
}
copyFolder(pathAssets, pathPDAssets);


(async() => {
    let contentHTML = await fsPromises.readFile(pathTemplate, 'utf-8');
    const files = await fsPromises.readdir(pathComponents, { withFileTypes: true });

    for (let item of files) {
        const itemContent = await fsPromises.readFile(path.join(pathComponents, item.name), 'utf-8');
        const regExp = new RegExp(`{{${(item.name).split('.')[0]}}}`, 'g');
        contentHTML = contentHTML.replace(regExp, itemContent);
    }

    createFile(pathPDIndex, contentHTML);
})();

async function createFile(pathFile, text) {
    return await fsPromises.writeFile(pathFile, text);
}