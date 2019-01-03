let b64 = require('base-64');
let u8 = require('utf8');
let fs = require('fs');

function enc(str) {
    return b64.encode(u8.encode(str))
}

function dec(str) {
    return u8.decode(b64.decode(str))
}

let shops = {
    'moneyveo': {
        'srochnonakartu': '',
        'plohoy': '',
        'dozp': '',
        'bistrozaim': '',
        'onlinekredit': '',
        'bistrodengi': '',
        'register':''
    },
    'dinero':{
        
    }
}

module.exports = {

    list(path) {
        return (req, res) => {
            let _param = req.params.shop;
            if (_param == 'show') {
                fs.readFile(`${path}/list.html`, (err, data) => {
                    let myList = {};
                    ({...myList} = shops);
                    for(let i in shops)
                        for(let y in shops[i])
                            myList[i][y] = enc(shops[i][y]).replace(/=/g,'');
                    let o = data.toString().replace('(list)', JSON.stringify(myList));
                    fs.writeFile(`${path}/list.html`, o, err => {
                        res.sendFile(`${path}/list.html`)
                    })
                })
            }
        }
    }

}