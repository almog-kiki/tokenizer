const express           = require('express');
const user_controller   = require('../controllers/tokenizer.controller');
const constants         = require('../lib/constants');
const router            = express.Router();

router.get(constants.GET_WORDS_LIST, user_controller.getWordsList);
router.post(constants.GET_WORDS_LIST_BY_URL, user_controller.getWordsListByUrl)
router.post(constants.GET_WORDS_LIST_BY_URL_AND_WORD, user_controller.getWordsListByUrlAndWord)

module.exports = router;
