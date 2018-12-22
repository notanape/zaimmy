var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, 'public'));
app.set('port', '8765');

app.get("/*", (req, res) => {
    let param = req.params[0];
    fs.stat(app.get("public") + "/" + param, (err, st) => {
        if (err) {
            res.status(404).end()
        }
        if (param.includes('.well-known')){
            res.sendFile(app.get("public") + "/" + param, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })}
        else
            res.sendFile(app.get("public") + "/" + param)
    })
})

app.listen(app.get('port'), () => {
    console.log(`Port ${app.get('port')} is running...`)
});

///.well-known/acme-challenge/06I9v1vWDVTRNdFFad8o3Fke92gfl37fQjUkCvYzXqs