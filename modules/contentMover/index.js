'use strict'

const path = require('path'), 
    utils = require('@amuzlab/utils'),
    fsPromise = require('@amuzlab/fs-promise'),
    config = require('@amuzlab/config')

Object.defineProperties(
    exports,
    {
        /*
         * @name        copyContent
         * @function
         * @desc        mp4 파일 경로를 전달받아서 target 경로에 복사
         * @public
         * @param       {String}    filePath    mp4 파일 경로
         * @returns     {String}    target 경로
        */
        copyContent: {
            enumerable: true,
            value: filePath => copyFile(filePath)
        }
    })
 

async function copyFile (fullPath) {
    let fileName, contentId, contentName, dramaName, targetPath

    fileName = path.basename(fullPath)
    contentId = path.basename(fullPath, path.extname(fullPath))
    utils.go(
        fullPath.split('/').filter(str => str),
        utils.some(
            (str, index, arr) => (
                contentId === str && (
                    contentName = arr[index - 1],
                    dramaName = arr[index - 2]))))

    targetPath = path.join(config.targetPath, dramaName, contentName, fileName)

    return await _isCopied(fullPath, targetPath) || (
        console.log(
            `copyFile (fullPath : %s, fileName : %s, contentId : %s, contentName : %s, dramaName : %s, targetPath : %s)`,
            fullPath,
            fileName,
            contentId,
            contentName,
            dramaName,
            targetPath),
        await fsPromise.fileSystem.copyFile(
            fullPath,
            targetPath,
            {
                startCopyFile: data => logger.info('start copy file (%j)', data),
                data: progress => console.log(`copy file progress (fileName : ${progress.fileName}, percentage : ${progress.percentAge}, size : ${progress.size}, maxSize : ${progress.maxSize}, speed : ${progress.speed})`),
                end: result => logger.info('end copy file (source : %s, destination : %s)', result.source, result.destination)
            }))

    async function _isCopied (sourcePath, targetPath) {
        let result, sourceSize, targetSize

        try {
            targetSize = (await fsPromise.fileSystem.checkPath(targetPath)).stat.size
        } finally {
            result && logger.debug('is already copy file (fileName : %s, sourceSize : %d, targetSize : %d)', path.basename(sourcePath), sourceSize, targetSize)
            return result
        }
    }
}

async function findContentPath (dirPath, contentId) {
    let result = await fsPromise.fileSystem.readdir(dirPath)
}

// async function copyContent (contentId) {
//     let result = await fsPromise.fileSystem.readdir(dirPath)

//     await utils.async.forEach(
//         result.files,
//         async (file) => {
//             const filePath = path.join(result.path, file),
//                 checkResult = await fsPromise.fileSystem.checkPath(filePath)

//             if (checkResult.stat.isDirectory()) {
//                 await copyContents(filePath)
//             } else {
//                 if (/^Transcoder$/.test(path.basename(result.path)) && /.mp4$/i.test(path.extname(file))) {
//                     try {
//                         logger.info('Detect content (path : %s)', filePath)
//                         await copyFile(filePath)
//                     } catch (error) {
//                         logger.error('Failed copy file (path : %s, error : %j)', filePath, error)
//                     }
//                 }
//             }
//         })
// }

// async function copyContents (dirPath) {
//     let result = await fsPromise.fileSystem.readdir(dirPath)

//     await utils.async.forEach(
//         result.files,
//         async (file) => {
//             const filePath = path.join(result.path, file),
//                 checkResult = await fsPromise.fileSystem.checkPath(filePath)

//             if (checkResult.stat.isDirectory()) {
//                 await copyContents(filePath)
//             } else {
//                 if (/^Transcoder$/.test(path.basename(result.path)) && /.mp4$/i.test(path.extname(file))) {
//                     try {
//                         logger.info('Detect content (path : %s)', filePath)
//                         await copyFile(filePath)
//                     } catch (error) {
//                         logger.error('Failed copy file (path : %s, error : %j)', filePath, error)
//                     }
//                 }
//             }
//         })
// }