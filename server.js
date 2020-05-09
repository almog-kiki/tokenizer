const express       = require('express');
const bodyParser    = require('body-parser');
const dotenv        = require("dotenv");
const tokenizer     = require('./routes/tokenizer.route');
const constants     = require('./lib/constants');
const cluster       = require('cluster');
const numCPUs       = require('os').cpus().length;

const app           = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(constants.TOKENIZER_SERVICE, tokenizer);

function startServer(port){
    app.listen(port);
    console.log("Server listening at http://%s:%s", "localhost", port);
}

function createCluserts(){
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
        });
    } else {
        startServer(process.env.PORT || 8002)
    }
    console.log(`Worker ${process.pid} started`);
}

if (process.env.NODE_ENV !== 'test') {
    createCluserts();
} else {
    startServer(process.env.TEST_PORT || 7999)
}

module.exports = app;
