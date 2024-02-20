
const fs = require('fs').promises;
// const path = require('path');
// const directoryPath = path.join(__home, 'Documents');

const directoryPath = 'home';
async function reddir() {
    try {
        const files = await fs.readdir(directoryPath)


        files.forEach((file) => {
            console.log(file);
        })

    } catch (error) {
        console.log(error);

    }
}
// const directoryName = "hello";
// function newDirectory(directoryName) {
//     fs.mkdir(directoryName, { recursive: true });
// }
// newDirectory(directoryName);
async function newDirectory(directoryName) {
    try {
        await fs.mkdir(directoryName);
        console.log("successfull");
    } catch (error) {
        console.log(error);
    }

}


async function readFile() {
    try {
        const data = await fs.readFile('home/hello.txt', 'utf-8')
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}




async function writeFile() {
    try {
        await fs.writeFile('home/hello.txt', "jdsscnmnsxnsbxbmansmnsmnmbqwjsh")
        console.log("file updated");
    } catch (error) {
        console.log(error);
    }

}
module.exports = { directoryPath, reddir, newDirectory, readFile, writeFile };
