let fs = require('fs');

let shops = {
    'moneyveo': {
        'srochnonakartu': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fru%2F--dengi-srochno',
        'plohoy': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fru%2F--bad-credit-history',
        'dozp': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fru%2F--dengi-do-zarplaty',
        'bistrozaim': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fru%2F--bustryj-credit',
        'onlinekredit': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fru%2F--zaim-online',
        'bistrodengi': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fru%2F--bistro-dengi',
        'loan-cash-register': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fuk%2Fregisternew',
        'loan-cash': 'https://rdr.salesdoubler.com.ua/in/offer/250?aid=65853&dlink=https%3A%2F%2Fmoneyveo.ua%2Fuk%2Flogin'
    },
    'dinero': {
        'loan-cash': ''
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
                res.redirect(shops[_s[0]][_s[1]])
            }
        }
    }

}