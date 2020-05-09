const { once }              = require('events');
const { createReadStream }  = require('fs');
const { createInterface }   = require('readline');

function createClientObject(word, repetitions){
    return {
        word: word,
        repetitions: repetitions
    }
}

function sliptlineToWords(line, isCaseSensitive){
    let splitLine = line.split(/[^a-zA-Z]/g).filter(elem => elem !== "");
    if(!isCaseSensitive){
        splitLine = splitLine.toLocaleString().toLowerCase().split(',');
    }
    return splitLine
}

function increaseWordCount(wordCountDict, word){
    if( !wordCountDict[word]){
        wordCountDict[word] = createClientObject(word, 0);
    }
    wordCountDict[word].repetitions = wordCountDict[word].repetitions+1;
}

const convertDictToArray = function (dict) {
    return Object.keys(dict).map(function (value) {
        return dict[value] ;
    });
}

const handleReadLine = function (line, wordToFind, isCaseSensitive, wordCountDict){
    let splitLine = sliptlineToWords(line, isCaseSensitive);
    for (let word of splitLine) {
        if(wordToFind){
            if( wordToFind === word) {
                increaseWordCount(wordCountDict, word)
            }
        } else {
            increaseWordCount(wordCountDict, word)
        }        
    }
}

const processLineByLine = async function(filePath, wordToFind, isCaseSensitive ) {
    try {
        let wordCountDict = {};
        const rl = createInterface({
            input: createReadStream(filePath),
            crlfDelay: Infinity
        });
  
        rl.on('line', (line) => {
            handleReadLine(line, wordToFind, isCaseSensitive, wordCountDict);
        });
    
        await once(rl, 'close');
    
        console.log('File processed.');
        return convertDictToArray(wordCountDict);
    } catch (error) {
        console.error(error);
        throw error
    }
  };


module.exports = Utils = {
    processLineByLine: processLineByLine,
    convertDictToArray: convertDictToArray
}