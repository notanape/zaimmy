let fs = require('fs');

let shops = {
    'moneyveo': {
       'loan-cash-register': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fuk%2Fregisternew',
        'loan-cash': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fuk%2Flogin'
    },
    'dinero': {
        'loan-cash': 'https://rdr.salesdoubler.com.ua/in/offer/1571?aid=65853&dlink=https%3A%2F%2Fwww.dinero.ua%2Favtorizacija%2Favtorizacija-sushestvujushego-klienta',
        'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1571?aid=65853&dlink=https%3A%2F%2Fwww.dinero.ua%2Fbystryj-zajm%2Fkontaktnye-dannye'
    },
    'alexcredit':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1509?aid=65853&dlink=https%3A%2F%2Falexcredit.ua%2Fform',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1509?aid=65853&dlink=https%3A%2F%2Falexcredit.ua%2Faccount%2FlogIn'
    },
    'кредиткаса':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1704?aid=65853&dlink=https%3A%2F%2Fcreditkasa.com.ua%2Fnew%2Fnewclient',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1704?aid=65853&dlink=https%3A%2F%2Fcreditkasa.com.ua%2Fviews%2Flogin'
    },
    'Быстрозайм':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/852?aid=65853&dlink=https%3A%2F%2Fbistrozaim.ua%2Fregister',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/852?aid=65853&dlink=https%3A%2F%2Fbistrozaim.ua%2Fregister'
    },
    'ваша-готівочка':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1411?aid=65853&dlink=https%3A%2F%2Flk.vashagotivochka.ua%2Fru%2Flogin%2Fregistration',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1411?aid=65853&dlink=https%3A%2F%2Flk.vashagotivochka.ua%2Fru%2Flogin'
    },
    'mycredit':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1261?aid=65853&dlink=https%3A%2F%2Fmycredit.ua%2Fua%2Fregistration%2F',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1261?aid=65853&dlink=https%3A%2F%2Fmycredit.ua%2Fua%2Fregistration%2F'
    },
    'creditplus':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1844?aid=65853&dlink=https%3A%2F%2Fcreditplus.ua%2Fuser%2Fregister%2Fstep1%3Flang%3Duk',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1844?aid=65853&dlink=https%3A%2F%2Fcreditplus.ua%2Fuser%3Flang%3Duk'
    },
    'soscredit':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1338?aid=65853&dlink=https%3A%2F%2Fsoscredit.ua%2Fuk%2Fuser%2Fsignup',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1338?aid=65853&dlink=https%3A%2F%2Fsoscredit.ua%2Fuk%2Fauth%2Flogin'
    },
    'topcredit':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1069?aid=65853&dlink=https%3A%2F%2Fsecure.topcredit.ua%2Fregistration',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1069?aid=65853&dlink=https%3A%2F%2Fsecure.topcredit.ua%2Flogin'
    },
    'ЄвроГроші':{
    	'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1276?aid=65853&dlink=https%3A%2F%2Fmy.eurogroshi.com.ua%2F%23signUp',
    	'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1276?aid=65853&dlink=https%3A%2F%2Fmy.eurogroshi.com.ua%2F%23login'
    },
    'crediton':{
        'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1729?aid=65853&dlink=https%3A%2F%2Fwww.crediton.ua%2Fuk%2Fcredit%2Fapp%2Fprofile',
        'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1729?aid=65853&dlink=https%3A%2F%2Fwww.crediton.ua%2Fuk%2Fauth'
    },
    'moneyboom':{
        'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/381?aid=65853&dlink=https%3A%2F%2Fmy.moneyboom.ua%2Fregister',
        'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/381?aid=65853&dlink=https%3A%2F%2Fmy.moneyboom.ua%2Flogin'
    },
    'credit365':{
        'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/163?aid=65853&dlink=https%3A%2F%2Fcredit365.ua%2Fuk%2Fregistration',
        'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/163?aid=65853'
    },
    'твої-гроші':{
        'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/302?aid=65853&dlink=https%3A%2F%2Fcabinet.tvoigroshi.com.ua%2Fuk%2Fsite%2Fform%2Fstep%2F1',
        'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/302?aid=65853&dlink=https%3A%2F%2Fcabinet.tvoigroshi.com.ua%2Fsite%2Flogin'
    },
    'ГлобалКредит':{
        'loan-cash-register':'https://rdr.salesdoubler.com.ua/in/offer/1200?aid=65853&dlink=https%3A%2F%2Fcabinet.globalcredit.ua%2Fuk%2Fform%2Fregistration',
        'loan-cash':'https://rdr.salesdoubler.com.ua/in/offer/1200?aid=65853&dlink=https%3A%2F%2Fcabinet.globalcredit.ua%2Fsite%2Flogin'
    }
}

module.exports = {

    list(path) {
        return (req, res) => {
            let param = req.params[0];
            let _s = param.split('/');
            if (_s.includes('show')) {
                fs.readFile(`${path}/list.html`, (err, data) => {
                    let o = data.toString().replace('(list)', JSON.stringify(shops));
                    fs.writeFile(`${path}/l.html`, o, err => {
                        res.sendFile(`${path}/l.html`)
                    })
                })
            } else if (!shops.hasOwnProperty(_s[0])) {
                let param = req.params[0];
                fs.stat(`${path}/${param}`, (err, st) => {
                    if (err) {
                        res.status(404).end()
                    }
                    if (param.includes('.well-known')) {
                        res.sendFile(`${path}/${param}`, {
                            headers: {
                                'Content-Type': 'text/plain'
                            }
                        })
                    } else
                        res.sendFile(`${path}/${param}`)
                })
            } else if (shops.hasOwnProperty(_s[0])) {
                res.redirect(301,shops[_s[0]][_s[1]])
            }
        }
    }

}