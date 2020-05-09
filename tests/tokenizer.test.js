
const app       = require('../server') // Link to your server file
const supertest = require('supertest')
const constants = require('../lib/constants');
const request   = supertest(app)

beforeAll(async() => {
})


test('GET /getWordsList : length of words list equal to 12900', async done => {
    const wordsListLength = 12900;
    const response = await request.get(constants.TOKENIZER_SERVICE + constants.GET_WORDS_LIST);
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(wordsListLength);
    done();    
});

describe("POST /getWordsListByUrl ",()=>{
  it(' send correct url and length of words list equal to 12900', async done => {
    const wordsListLength = 12900;
    const response = await request.post(constants.TOKENIZER_SERVICE + constants.GET_WORDS_LIST_BY_URL)
    .send({url: 'http://www.gutenberg.org/cache/epub/10/pg10.txt'})
    .set('Accept', 'application/json')
    
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(wordsListLength);
    done()
  });

  it(' send incorrect url', async done => {
    const response = await request.post(constants.TOKENIZER_SERVICE + constants.GET_WORDS_LIST_BY_URL)
    .send({url: 'http://www.gutenberg22.org/cache/epub/10/pg10.txt'})
    .set('Accept', 'application/json')
    expect(response.status).not.toBe(200);
    done()
  });

  it('repetitions of "the" word equal to 64204', async done => {
    const word = "the";
    const response = await request.post(constants.TOKENIZER_SERVICE + constants.GET_WORDS_LIST_BY_URL)
    .send({url: 'http://www.gutenberg.org/cache/epub/10/pg10.txt', word: word})
    .set('Accept', 'application/json')
    
    expect(response.status).toBe(200);
    expect(response.body[0].repetitions).toEqual(64204);
    done()
  });

  it('isCaseSensitive=true and repetitions of the word "THE" equal to 23', async done => {
    const word = "THE";
    const response = await request.post(constants.TOKENIZER_SERVICE + constants.GET_WORDS_LIST_BY_URL)
    .send({url: 'http://www.gutenberg.org/cache/epub/10/pg10.txt', word: word, isCaseSensitive: true})
    .set('Accept', 'application/json')
    
    expect(response.status).toBe(200);
    expect(response.body[0].repetitions).toEqual(23);
    done()

  });

  it('send word that not in the text ', async done => {
    const word = "almog";
    const response = await request.post(constants.TOKENIZER_SERVICE + constants.GET_WORDS_LIST_BY_URL)
    .send({url: 'http://www.gutenberg.org/cache/epub/10/pg10.txt', word: word})
    .set('Accept', 'application/json')
    
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(0);
    done()
  });
})

afterAll(async () => {
});