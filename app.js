var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var shop = require('./module/shops.js');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, 'public'));
app.set('port', '8765');

app.get("/", (req, res) => {
    res.sendFile(app.get('public') + '/index.html')
})

app.get("/*", shop.list(app.get('public')));

app.listen(app.get('port'), () => {
    console.log(`Port ${app.get('port')} is running...`)
});