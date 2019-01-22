let mon = require('mongodb').MongoClient;
let fs = require('fs');
let toAccount = "mongodb://localhost:27017";
let db = 'z';
let col = 'fragile';

let exc = [
    ['66.249.64.0', '66.249.95.255'],
    ['194.183.183.142', '194.183.183.142'],
    ['13.52.0.0', '13.59.255.255']
]


let shops = {
    "moneyveo": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fuk%2Fregisternew",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fuk%2Flogin",
        "aff": "https://go.salesdoubler.net/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fuk%2Flogin",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853"
    },
    "dinero": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1571?aid=65853&dlink=https%3A%2F%2Fwww.dinero.ua%2Fbystryj-zajm%2Fkontaktnye-dannye",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1571?aid=65853&dlink=https%3A%2F%2Fwww.dinero.ua%2Favtorizacija%2Favtorizacija-sushestvujushego-klienta",
        "aff": "https://go.salesdoubler.net/in/offer/1571?aid=65853&dlink=https%3A%2F%2Fwww.dinero.ua%2Favtorizacija%2Favtorizacija-sushestvujushego-klienta",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1571?aid=65853"
    },
    "alexcredit": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1509?aid=65853&dlink=https%3A%2F%2Falexcredit.ua%2Fform",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1509?aid=65853&dlink=https%3A%2F%2Falexcredit.ua%2Faccount%2FlogIn",
        "aff": "https://go.salesdoubler.net/in/offer/1509?aid=65853&dlink=https%3A%2F%2Falexcredit.ua%2Faccount%2FlogIn",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1509?aid=65853"
    },
    "кредиткаса": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1704?aid=65853&dlink=https%3A%2F%2Fcreditkasa.com.ua%2Fnew%2Fnewclient",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1704?aid=65853&dlink=https%3A%2F%2Fcreditkasa.com.ua%2Fviews%2Flogin",
        "aff": "https://go.salesdoubler.net/in/offer/1704?aid=65853&dlink=https%3A%2F%2Fcreditkasa.com.ua%2Fviews%2Flogin",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1704?aid=65853"
    },
    "быстрозайм": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/852?aid=65853&dlink=https%3A%2F%2Fbistrozaim.ua%2Fregister",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/852?aid=65853&dlink=https%3A%2F%2Fbistrozaim.ua%2Fregister",
        "aff": "https://go.salesdoubler.net/in/offer/852?aid=65853&dlink=https%3A%2F%2Fbistrozaim.ua%2Fregister",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/852?aid=65853"
    },
    "ваша-готівочка": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1411?aid=65853&dlink=https%3A%2F%2Flk.vashagotivochka.ua%2Fru%2Flogin%2Fregistration",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1411?aid=65853&dlink=https%3A%2F%2Flk.vashagotivochka.ua%2Fru%2Flogin",
        "aff": "https://go.salesdoubler.net/in/offer/1411?aid=65853&dlink=https%3A%2F%2Flk.vashagotivochka.ua%2Fru%2Flogin",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1411?aid=65853"
    },
    "mycredit": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1261?aid=65853&dlink=https%3A%2F%2Fmycredit.ua%2Fua%2Fregistration%2F",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1261?aid=65853&dlink=https%3A%2F%2Fmycredit.ua%2Fua%2Fregistration%2F",
        "aff": "https://go.salesdoubler.net/in/offer/1261?aid=65853&dlink=https%3A%2F%2Fmycredit.ua%2Fua%2Fregistration%2F",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1261?aid=65853"
    },
    "creditplus": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1844?aid=65853&dlink=https%3A%2F%2Fcreditplus.ua%2Fuser%2Fregister%2Fstep1%3Flang%3Duk",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1844?aid=65853&dlink=https%3A%2F%2Fcreditplus.ua%2Fuser%3Flang%3Duk",
        "aff": "https://go.salesdoubler.net/in/offer/1844?aid=65853&dlink=https%3A%2F%2Fcreditplus.ua%2Fuser%3Flang%3Duk",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1844?aid=65853"
    },
    "soscredit": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1338?aid=65853&dlink=https%3A%2F%2Fsoscredit.ua%2Fuk%2Fuser%2Fsignup",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1338?aid=65853&dlink=https%3A%2F%2Fsoscredit.ua%2Fuk%2Fauth%2Flogin",
        "aff": "https://go.salesdoubler.net/in/offer/1338?aid=65853&dlink=https%3A%2F%2Fsoscredit.ua%2Fuk%2Fauth%2Flogin",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1338?aid=65853"
    },
    "topcredit": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1069?aid=65853&dlink=https%3A%2F%2Fsecure.topcredit.ua%2Fregistration",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1069?aid=65853&dlink=https%3A%2F%2Fsecure.topcredit.ua%2Flogin",
        "aff": "https://go.salesdoubler.net/in/offer/1069?aid=65853&dlink=https%3A%2F%2Fsecure.topcredit.ua%2Flogin",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1069?aid=65853"
    },
    "єврогроші": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1276?aid=65853&dlink=https%3A%2F%2Fmy.eurogroshi.com.ua%2F%23signUp",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1276?aid=65853&dlink=https%3A%2F%2Fmy.eurogroshi.com.ua%2F%23login",
        "aff": "https://go.salesdoubler.net/in/offer/1276?aid=65853&dlink=https%3A%2F%2Fmy.eurogroshi.com.ua%2F%23login",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1276?aid=65853"
    },
    "crediton": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1729?aid=65853&dlink=https%3A%2F%2Fwww.crediton.ua%2Fuk%2Fcredit%2Fapp%2Fprofile",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1729?aid=65853&dlink=https%3A%2F%2Fwww.crediton.ua%2Fuk%2Fauth",
        "aff": "https://go.salesdoubler.net/in/offer/1729?aid=65853&dlink=https%3A%2F%2Fwww.crediton.ua%2Fuk%2Fauth",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1729?aid=65853"
    },
    "moneyboom": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/381?aid=65853&dlink=https%3A%2F%2Fmy.moneyboom.ua%2Fregister",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/381?aid=65853&dlink=https%3A%2F%2Fmy.moneyboom.ua%2Flogin",
        "aff": "https://go.salesdoubler.net/in/offer/381?aid=65853&dlink=https%3A%2F%2Fmy.moneyboom.ua%2Flogin",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/381?aid=65853"
    },
    "credit365": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/163?aid=65853&dlink=https%3A%2F%2Fcredit365.ua%2Fuk%2Fregistration",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/163?aid=65853",
        "aff": "https://go.salesdoubler.net/in/offer/163?aid=65853",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/163?aid=65853"
    },
    "твої-гроші": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/302?aid=65853&dlink=https%3A%2F%2Fcabinet.tvoigroshi.com.ua%2Fuk%2Fsite%2Fform%2Fstep%2F1",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/302?aid=65853&dlink=https%3A%2F%2Fcabinet.tvoigroshi.com.ua%2Fsite%2Flogin",
        "aff": "https://go.salesdoubler.net/in/offer/302?aid=65853&dlink=https%3A%2F%2Fcabinet.tvoigroshi.com.ua%2Fsite%2Flogin",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/302?aid=65853"
    },
    "глобалкредит": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1200?aid=65853&dlink=https%3A%2F%2Fcabinet.globalcredit.ua%2Fuk%2Fform%2Fregistration",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1200?aid=65853&dlink=https%3A%2F%2Fcabinet.globalcredit.ua%2Fsite%2Flogin",
        "aff": "https://go.salesdoubler.net/in/offer/1200?aid=65853&dlink=https%3A%2F%2Fcabinet.globalcredit.ua%2Fsite%2Flogin",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1200?aid=65853"
    },
    "є-гроші": {
        "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1741?aid=65853&dlink=https%3A%2F%2Fe-groshi.com%2Fonline%2Freg",
        "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1741?aid=65853&dlink=https%3A%2F%2Fe-groshi.com%2Fonline%2F",
        "aff": "https://go.salesdoubler.net/in/offer/1741?aid=65853&dlink=https%3A%2F%2Fe-groshi.com%2Fonline%2F",
        "direct": "https://rdr.salesdoubler.com.ua/in/offer/1741?aid=65853"
    },
     "microcredit": {
            "loan-cash-register": "https://rdr.salesdoubler.com.ua/in/offer/1233?aid=65853&dlink=https%3A%2F%2Fonline.microcredit.ua%2Fget-credit",
            "loan-cash": "https://rdr.salesdoubler.com.ua/in/offer/1233?aid=65853&dlink=https%3A%2F%2Fonline.microcredit.ua%2Flogin",
            "aff": "https://go.salesdoubler.net/in/offer/1741?aid=65853&dlink=https%3A%2F%2Fe-groshi.com%2Fonline%2F",
            "direct": "https://rdr.salesdoubler.com.ua/in/offer/1233?aid=65853"
        }
}

function isExc(ip) {
    let _is = false;
    let _nom = function(ip) {
        return parseInt(ip.split('.').map(function(d) {
            return d.padStart(3, '0')
        }).join(''))
    };
    let _g = _nom(ip);
    for (let i = 0; i < exc.length; i++) {
        let _l = _nom(exc[i][0]);
        let _h = _nom(exc[i][1]);
        if (_g >= _l && _g <= _h) {
            _is = true;
            break;
        }
    }
    return _is
}

module.exports = {

    index(path) {
        return (req, res) => {
            let _ip = req.get('x-real-ip');
            let _ref = req.get('Referrer') == undefined ? '' : req.get('Referrer');
            let _exc = _ip == undefined ? true : isExc(_ip);
            if (_exc)
                res.status(404).sendFile(path + '/indexEr.html')
            else
                mon.connect(toAccount, {
                    useNewUrlParser: true
                }, (err, dbase) => {
                    let dbc = dbase.db(db);
                    let coll = dbc.collection(col);
                    let date = new Date();
                    coll.insertOne({
                        'ip': _ip,
                        'ref': _ref,
                        'shop': 'index',
                        'day': date.toLocaleDateString(),
                        'time': date.toLocaleTimeString().substr(0, 5)
                    }, (err, result) => {
                        dbase.close();
                        res.status(404).sendFile(path + '/indexEr.html')
                    })
                })
        }
    },

    list(path) {
        return (req, res) => {
            let _ip = req.get('x-real-ip');
            let _ref = req.get('Referrer') == undefined ? '' : req.get('Referrer');
            let _exc = _ip == undefined ? true : isExc(_ip);
            let param = req.params[0];
            let _s = param.split('/');
            if (_s[0] == 'show') {
                fs.readFile(`${path}/list.html`, (err, data) => {
                    let o = data.toString().replace('(list)', JSON.stringify(shops));
                    fs.writeFile(`${path}/l.html`, o, err => {
                        res.sendFile(`${path}/l.html`)
                    })
                })
                if (_s[1] == 'shops') {
                    let o = {};
                    for (let y in shops) {
                        if (!o.hasOwnProperty(y))
                            o[y] = []
                        for (let i in shops[y])
                            o[y].push(i)
                    }
                    res.json(o);
                }
            } else if (_s[0] == 'googleStatistics') {
                fs.unlink(`${path}/indexFun.html`, err => {})
                fs.unlink(`${path}/js/handleFun.js`, err => {})
                res.send('Statistics are written')
            } else if (_s[0] == 'statistics') {
                mon.connect(toAccount, {
                    useNewUrlParser: true
                }, (err, dbase) => {
                    let dbc = dbase.db(db);
                    let coll = dbc.collection(col);
                    coll.find({}, {
                        '_id': 0
                    }).toArray((err, arr) => {
                        dbase.close();
                        fs.readFile(`${path}/js/statistics.js`, (err, data) => {
                            data = data.toString().replace('/*(stat)*/', JSON.stringify(arr));
                            fs.writeFile(`${path}/js/stats.js`, data, (err) => {
                                res.sendFile(`${path}/statistics.html`)
                            })
                        })
                    })
                })
            } else if (!shops.hasOwnProperty(_s[0])) {
                let param = req.params[0];
                fs.stat(`${path}/${param}`, (err, st) => {
                    if (err) {
                        res.status(404).sendFile(`${path}/error.html`)
                    } else {
                        if (param.includes('.well-known')) {
                            res.sendFile(`${path}/${param}`, {
                                headers: {
                                    'Content-Type': 'text/plain'
                                }
                            })
                        } else
                            res.sendFile(`${path}/${param}`)
                    }
                })

            } else if (shops.hasOwnProperty(_s[0])) {
                if (_s[1] == undefined || _s[1] == '') {
                    /*let _link = shops[_s[0]]['aff'];
                    let _script = `
                        $('.mainStat').append('<iframe src="${_link}" width=600 height=150></iframe>');
                        function googleStatistics(){
                            $.get('/googleStatistics').fail(e=>{
                                googleStatistics()
                            })    
                        }
                        setTimeout(()=>{
                            $('.mainStat').remove();
                            googleStatistics()
                        },7000)
                    `;*/
                    let _link = shops[_s[0]]['direct'];
                    let _script = `
                    function googleStatistics(){
                            fetch('/googleStatistics').then(p=>{

                            },e=>{
                            	googleStatistics()
                            })
                        };
                        googleStatistics()
                        location.href = '${_link}';
                    `;

                    if (_exc) {
                        if (_ref.includes('google') || _ref.includes('facebook') || _ref.includes('instagram')) {
                            fs.writeFile(`${path}/js/handleFun.js`, _script, err => {
                                fs.readFile(`${path}/index.html`, (err, data) => {
                                    let html = data.toString().replace('global.js', 'handleFun.js');
                                    res.set('Content-Type', 'text/html');
                                    res.send(html);
                                })
                            })
                        } else
                            res.sendFile(`${path}/index.html`)
                    }
                    //                    fs.readFile(`${path}/js/handle.js`, (err, data) => {
                    //                      let js = data.toString().replace('/*stat*/', _script);
                    //                    fs.writeFile(`${path}/js/handleFun.js`, js, err => {
                    //                      fs.readFile(`${path}/index.html`, (err, data) => {
                    //                        let html = data.toString().replace('handle.js', 'handleFun.js');
                    //                      fs.writeFile(`${path}/indexFun.html`, html, err => {
                    //                        res.sendFile(`${path}/indexFun.html`);
                    //                                })
                    //                          })
                    //                    })
                    //              })}
                    else
                        mon.connect(toAccount, {
                            useNewUrlParser: true
                        }, (err, dbase) => {
                            let dbc = dbase.db(db);
                            let coll = dbc.collection(col);
                            let date = new Date();
                            coll.insertOne({
                                'ip': _ip,
                                'ref': _ref,
                                'shop': `${_s[0]}/aff`,
                                'day': date.toLocaleDateString(),
                                'time': date.toLocaleTimeString().substr(0, 5)
                            }, (err, result) => {
                                dbase.close();
                                //                    fs.readFile(`${path}/js/handle.js`, (err, data) => {
                                //                      let js = data.toString().replace('/*stat*/', _script);
                                //                    fs.writeFile(`${path}/js/handleFun.js`, js, err => {
                                //                      fs.readFile(`${path}/index.html`, (err, data) => {
                                //                        let html = data.toString().replace('handle.js', 'handleFun.js');
                                //                      fs.writeFile(`${path}/indexFun.html`, html, err => {
                                //                                    res.sendFile(`${path}/indexFun.html`);
                                //                              })
                                //                        })
                                //                  })
                                //               })
                                if (_ref.includes('google') || _ref.includes('facebook') || _ref.includes('instagram')) {
                                    fs.writeFile(`${path}/js/handleFun.js`, _script, err => {
                                        fs.readFile(`${path}/index.html`, (err, data) => {
                                            let html = data.toString().replace('global.js', 'handleFun.js');
                                            res.set('Content-Type', 'text/html');
                                            res.send(html);
                                        })
                                    })
                                } else
                                    res.sendFile(`${path}/index.html`)
                            })
                        })
                } else {
                    if (_exc)
                        res.redirect(301, shops[_s[0]][_s[1]])
                    else
                        mon.connect(toAccount, {
                            useNewUrlParser: true
                        }, (err, dbase) => {
                            let dbc = dbase.db(db);
                            let coll = dbc.collection(col);
                            let date = new Date();
                            coll.insertOne({
                                'ip': _ip,
                                'ref': _ref,
                                'shop': `${_s[0]}/${_s[1]}`,
                                'day': date.toLocaleDateString(),
                                'time': date.toLocaleTimeString().substr(0, 5)
                            }, (err, result) => {
                                dbase.close();
                                res.redirect(301, shops[_s[0]][_s[1]])
                            })
                        })
                }

            }
        }
    }

}