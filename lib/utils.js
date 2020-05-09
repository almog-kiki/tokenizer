const { once }              = require('events');
const { createReadStream }  = require('fs');
const { createInterface }   = require('readline');

function createClientObject(word, repetitions){
    return {
        word: word,
        repetitions: repetitions
    }
}

function splitlineToWords(line, isCaseSensitive){
    let splitLine = line.split(/[^a-zA-Z]/g).filter(elem => elem !== "");
    if(!isCaseSensitive){
        splitLine = splitLine.toLocaleString().toLowerCase().split(',');
    }
    return splitLine
}

function increaseWordRepetitions(wordsListDictionary, word){
    if( !wordsListDictionary[word]){
        wordsListDictionary[word] = createClientObject(word, 0);
    }
    wordsListDictionary[word].repetitions = wordsListDictionary[word].repetitions+1;
}

const convertDictToArray = function (dict) {
    return Object.keys(dict).map(function (value) {
        return dict[value] ;
    });
}

const handleReadLine = function (line, wordToFind, isCaseSensitive, wordsListDictionary){
    let splitLine = splitlineToWords(line, isCaseSensitive);
    for (let word of splitLine) {
        if(wordToFind){
            if( wordToFind === word) {
                increaseWordRepetitions(wordsListDictionary, word)
            }
        } else {
            increaseWordRepetitions(wordsListDictionary, word)
        }        
    }
}

const handleReadTextFile = async function(filePath, wordToFind, isCaseSensitive ) {
    try {
        let wordsListDictionary = {};
        const rl = createInterface({
            input: createReadStream(filePath),
            crlfDelay: Infinity
        });
  
        rl.on('line', (line) => {
            handleReadLine(line, wordToFind, isCaseSensitive, wordsListDictionary);
        });
    
        await once(rl, 'close');
    
        console.log('File reading ended.');
        return convertDictToArray(wordsListDictionary);
    } catch (error) {
        console.error(error);
        throw error
    }
  };


module.exports = Utils = {
    handleReadTextFile: handleReadTextFile,
    convertDictToArray: convertDictToArray
}