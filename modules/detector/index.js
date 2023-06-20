const schedule = require('node-schedule'),

    config = require('@amuzlab/config'),
    fsPromise = require('@amuzlab/fs-promise'),

    LOCK_FILE_NAME = 'lock'

module.exports = {
    schedule_job: () => {
        let rule = new schedule.RecurrenceRule()
        rule.hour = 24

        schedule.scheduleJob(rule, async() => {
            // let today = new Date()
            // console.log(today)
            // config.sourcePath
            // 1. 1시간에 한 번씩 drama 폴더를 보고 mp4 파일을 만들어야할 컨텐츠를 찾아
            // (기준 : Transcoder 폴더에 mp4 파일이 없고 lock 파일이 없어)
            // 2. 컨텐츠를 찾았으면 mp4 만들라고 요청 보내
            // 3. 요청에 대한 응답이 성공이면 mp4 요청 보냈다고 표시 (drama/1/lock)
            
        })
    }
}
// mp4 파일을 만들어야할 컨텐츠를 찾아
// (기준 : Transcoder 폴더에 mp4 파일이 없고 lock 파일이 없어)
async function findContent (dirPath) {
    let result = await fsPromise.fileSystem.readdir(dirPath)

    await utils.async.forEach(
        result.files,
        async (file) => {
            const filePath = path.join(result.path, file),
                checkResult = await fsPromise.fileSystem.checkPath(filePath)

            if (checkResult.stat.isDirectory()) {
                if (/^Transcoder$/.test(path.basename(filePath))) {
                    if (!(await fsPromise.fileSystem.readdir(dirPath))
                    .files.some(file => /.mp4$/i.test(path.extname(file))) && ) {
                        // request
                    }
                } else {
                    await findContent(filePath)
                }
            }
            //  else {
            //     if (/^Transcoder$/.test(path.basename(result.path)) && /.mp4$/i.test(path.extname(file))) {
            //         try {
            //             logger.info('Detect content (path : %s)', filePath)
            //             await copyFile(filePath)
            //         } catch (error) {
            //             logger.error('Failed copy file (path : %s, error : %j)', filePath, error)
            //         }
            //     }
            // }
        })
}

async function makeLockFile (dirPath) {
    return await fsPromise.fileSystem.writeFile(path.join(dirPath, LOCK_FILE_NAME), '')
}