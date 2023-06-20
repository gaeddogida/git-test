'use strict'

const axios = require('axios'),

    TRANSCODE_URL = 'http://192.168.0.137:83/vams/transcoder'

Object.defineProperties(
    exports,
    {
        /*
         * @name        requestTranscoder
         * @function
         * @desc        HLS m3u8 파일 경로를 전달받아서 트랜스코딩 요청
         * @public
         * @param       {String}    hlsPath    m3u8 파일 경로
         * @returns     {Promise<String>}      mp4 경로
        */
        requestTranscoder: {
            enumerable: true,
            value: async (hlsPath) => {
                let transcodedPath

                // 트랜스코딩 요청
                await axios.post(
                    TRANSCODE_URL,
                    {
                        filePath: hlsPath,
                        id: 5451
                    })
                // mp4 경로 만들어서 리턴
                //transcodedPath = 
                return transcodedPath
            }
        }
    })