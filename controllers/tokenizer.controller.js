const constants     = require('../lib/constants');
const requestUtils  = require('../lib/requestUtils');
const utils         = require('../lib/utils');

async function getWordsCountDict(res, url, wordToFind, isCaseSensitive){
    let filePath;
    try{
        filePath =  await requestUtils.downloadFile(url);
        let wordsListDictionary =  await utils.handleReadTextFile(filePath, wordToFind, isCaseSensitive);
        requestUtils.retrunSuccessResponse(res, wordsListDictionary, filePath)
     }catch(error){
        requestUtils.retrunFailureResponse(res, error,filePath);
     }
}

exports.getWordsList = async function (req, res){
    getWordsCountDict(res, constants.DEFAULT_URL, undefined, false)
}

exports.getWordsListByUrl = async function (req, res){
    getWordsCountDict(res, req.body.url, req.body.word, req.body.isCaseSensitive)
};
