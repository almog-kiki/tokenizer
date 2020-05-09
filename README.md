# Tokenizer - Coding Assignment
Tokenizer program, it converts a string into tokens - in this case - words.

# Technologies
npm  v6.13.7

node v13.10.1

# Installing
```
npm install
```

# Usage
```
npm start
```

# Running the tests:
```
npm test
```


# API
```
header:{
    Content-Type:"application/json"
    Accept:"application/json"
}  
```

1. HTTP GET    |   '/api/v1/tokenizer/getWordsList';

2. HTTP POST    |   '/api/v1/tokenizer/getWordsListByUrl';
  ```
body: {
        "url":"http://www.gutenberg.org/cache/epub/10/pg10.txt",
    }
```

3. HTTP POST    |   '/api/v1/tokenizer/getWordsListByUrlAndWord';
```

body: {
        "url":"http://www.gutenberg.org/cache/epub/10/pg10.txt",
        "word":"the"
    }
```

# Package
https://www.npmjs.com/package/line-by-line
