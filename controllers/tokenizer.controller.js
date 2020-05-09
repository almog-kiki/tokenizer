const constants     = require('../lib/constants');
const requestUtils  = require('../lib/requestUtils');
const utils         = require('../lib/utils');

async function getWordsCountDict(res, url,wordToFind){
    let filePath;
    try{
        filePath =  await requestUtils.downloadFile(url);
        let wordCountDict =  await utils.processLineByLine(filePath, wordToFind, false);
        requestUtils.retrunSuccessResponse(res, wordCountDict, filePath)
     }catch(error){
        requestUtils.retrunFailureResponse(res, error,filePath);
     }
}

exports.getWordsList = async function (req, res){
    getWordsCountDict(res, constants.DEFAULT_URL)
}

exports.getWordsListByUrl = async function (req, res){
    getWordsCountDict(res, req.body.url)
};

exports.getWordsListByUrlAndWord = async function (req, res){
    getWordsCountDict(res, req.body.url, req.body.word)
};