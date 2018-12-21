var express = require('express');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, 'public'));
app.set('port', '8001');

app.listen(app.get('port'), () => {
    console.log(`Port ${app.get('port')} is running...`)
});