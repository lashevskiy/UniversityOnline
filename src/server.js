const axios = require('axios')
const fetch = require('isomorphic-fetch');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/', (req, res) => {
    // console.log('666', req.body);

    console.log(req.body.url)

    fetch(req.body.url)
        .then(ress => {
            return ress.json();
        })
        .then(response => {
            res.send(response)
        });

});

app.listen(3003, function () {
    console.log('Example app listening on port 3003!');
});
