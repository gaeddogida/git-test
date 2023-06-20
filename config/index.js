'use strict'

// 서버 설정 파일은 인메모리로 로딩하는 역할
// 설정 파일 (json 파일) 의 내용을 인메모리로 로딩 시킴
// 서버 로직 내에서 설정 파일의 내용을 고정적으로 커스텀해서 써야되는 경우가 있을 수 있으므로, 이런 경우에는 mapper를 통해 설정 내용을 조작한다. 
const path = require('path'),
    ROOT_PATH = path.join(__dirname, '..'),

    config = require('@amuzlab/config')(Object.assign(
        typeof process.env.CONF_DIR === 'string' ? {confPath: process.env.CONF_DIR} : {confPath: path.join(__dirname, '..', 'conf')},
        {
            mapper: {
                 config: data => {
                    console.log(data)
                    data.log && !path.isAbsolute(data.log.logDir) && (data.log.logDir = path.resolve(ROOT_PATH, data.log.logDir))

                    if (!path.isAbsolute(data.tempPath)) {
                        data.tempPath = path.resolve(ROOT_PATH, data.tempPath)
                    }
 
                    return data
                }
            },
            isGlobal: true,
            globalName: '_APP_CONFIG'
        }
     ))
 
 module.exports = exports = config