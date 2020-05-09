
const DEFAULT_URL = 'http://www.gutenberg.org/cache/epub/10/pg10.txt'
const API_PREFIX = "/api/v1";
const TOKENIZER_SERVICE = API_PREFIX+"/tokenizer";

const GET_WORDS_LIST = '/getWordsList';
const GET_WORDS_LIST_BY_URL = '/getWordsListByUrl';
const GET_WORDS_LIST_BY_URL_AND_WORD ='/getWordsListByUrlAndWord';


module.exports = Constants = {
    API_PREFIX:                             API_PREFIX,
    DEFAULT_URL:                            DEFAULT_URL,
    TOKENIZER_SERVICE:                      TOKENIZER_SERVICE,
    GET_WORDS_LIST:                  GET_WORDS_LIST,
    GET_WORDS_LIST_BY_URL:           GET_WORDS_LIST_BY_URL,
    GET_WORDS_LIST_BY_URL_AND_WORD:  GET_WORDS_LIST_BY_URL_AND_WORD

}