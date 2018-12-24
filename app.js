var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var request = require('request')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//app.use(express.static(path.join(__dirname, 'public')));
app.set('public', path.join(__dirname, 'public'));
app.set('port', '8765');

app.get("/ad", (req, res) => { 
    request.post({
        url: 'https://api.admitad.com/token/',
        headers:
                {   'cache-control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: 'Basic NjlkZDI1ZmU2OGMzMDA3OGNjNDU0Mzk3ZWY5NWY5OjhmMjVjNjQ4YmMxOWEzOGJiMGQ5MGI2ZTRjODczZQ=='},
        form:
                {grant_type: 'client_credentials',
                    client_id: '69dd25fe68c30078cc454397ef95f9',
                    scope: 'advcampaigns_for_website arecords broker_application manage_advcampaigns websites advcampaigns manage_broker_application'}
    },(body,resp,er)=>{
        res.set('Content-Type','application/json');
        res.send(resp.body)
    })
})

app.get("/*", (req, res) => {
    let param = req.params[0];
    fs.stat(app.get("public") + "/" + param, (err, st) => {
        if (err) {
            res.status(404).end()
        }
        if (param.includes('.well-known')) {
            res.sendFile(app.get("public") + "/" + param, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
        } else
            res.sendFile(app.get("public") + "/" + param)
    })
})

app.listen(app.get('port'), () => {
    console.log(`Port ${app.get('port')} is running...`)
});

///.well-known/acme-challenge/06I9v1vWDVTRNdFFad8o3Fke92gfl37fQjUkCvYzXqs