const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const pathFiles = path.join(__dirname, 'files');
const pathFilesCopy = path.join(__dirname, 'files-copy');

fs.access(pathFilesCopy, (error) => {
    if (error) {
        fsPromises.mkdir(pathFilesCopy);
    }
});

copyFolder(pathFiles, pathFilesCopy);
console.log('Look at folders, all is Done')


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