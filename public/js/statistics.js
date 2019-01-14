let _stat = /*(stat)*/ ;
let _ip = {};
let _map = [];

function sortTime(a, b) {
    let _a = parseInt(a[0].split(':').join(''))
    let _b = parseInt(b[0].split(':').join(''))
    return _a - _b
}

function sortDay(a, b) {
    let _a = parseInt(a[0])
    let _b = parseInt(b[0])
    return _a - _b
}

function sortMon(a, b) {
    let _a = parseInt(a[0].split('.').join(''))
    let _b = parseInt(b[0].split('.').join(''))
    return _a - _b
}

function sortIp(a, b) {
    let _onesA = true;
    let _onesB = true;
    if (a[1].length > 1)
        _onesA = false
    else {
        if (a[1][0][1].length > 1)
            _onesA = false
        else {
            if (a[1][0][1][0][1].length > 1)
                _onesA = false
        }
    }
    if (b[1].length > 1)
        _onesB = false
    else {
        if (b[1][0][1].length > 1)
            _onesB = false
        else {
            if (b[1][0][1][0][1].length > 1)
                _onesB = false
        }
    }
    if (_onesA == true && _onesB == false)
        return 1
    else if (_onesA == false && _onesB == true)
        return -1
    else if ((_onesA == true && _onesB == true) || _onesA == false && _onesB == false) {
        let _ipDataA = a[1][a[1].length - 1];
        let _monA = _ipDataA[0];
        let _marrA = _monA.split('.');
        let _monDataA = _ipDataA[1][_ipDataA[1].length - 1];
        let _dayA = _monDataA[0];
        let _dayDataA = _monDataA[1][_monDataA[1].length - 1];
        let _timeA = _dayDataA[0];
        let _dA = new Date(`${_marrA[0]}.${_dayA}.${_marrA[1]} ${_timeA}`).getTime()
        let _ipDataB = b[1][b[1].length - 1];
        let _monB = _ipDataB[0];
        let _marrB = _monB.split('.');
        let _monDataB = _ipDataB[1][_ipDataB[1].length - 1];
        let _dayB = _monDataB[0];
        let _dayDataB = _monDataB[1][_monDataB[1].length - 1];
        let _timeB = _dayDataB[0];
        let _dB = new Date(`${_marrB[0]}.${_dayB}.${_marrB[1]} ${_timeB}`).getTime()
        return _dB - _dA
    }
};

function createObj() {
    let ip = `<div class="ip row d-flex flex-column" id="ip">
                <div class="caption" id="ip">(ip)</div>
                <div class="body d-flex flex-column" id="ip">
                (date)    
                </div>
            </div>`;
    let date = `<div class="date">
                    <div class="caption" id="date">(mon)</div>
                        <div class="body">
                            <table>
                                <tr class="d-flex">
                                (tr)
                                </tr>
                            </table>
                        </div>
                    </div>`;
    let tr = `
                <td class="d-flex flex-column">
                    <div class="caption">(day) &#8226; (time)</div>
                     <div class="td ref">(ref)</div>
                     <div class="td link">(link)</div>
                   </td>
              `;
    let obj = '';
    for (let i of _map) {
        let _ip = ip.replace('(ip)', i[0]);
        let _dates = '';
        for (let m of i[1]) {
            let _date = date.replace('(mon)', m[0]);
            let _trs = '';
            for (let d of m[1])
                for (let t of d[1])
                    for (let r of t[1]) {
                        let _tr = tr.replace('(day)', d[0]).replace('(time)', t[0]).replace('(ref)', r[0] == null ? 'direct' : r[0].replace(/http[s]*:\/\//g,'')).replace('(link)', r[1]);
                        _trs += _tr;
                    }
            _date = _date.replace('(tr)', _trs);
            _dates += _date;
        }
        _ip = _ip.replace('(date)', _dates)
        obj += _ip;
    }
    return obj;
}

$(() => {

    for (let i of _stat) {
        let arr = i.day.split('-');
        let mon = arr[1] + '.' + arr[0];
        let day = arr[2];
        if (!_ip.hasOwnProperty(i.ip)) {
            _ip[i.ip] = {};
            _ip[i.ip][mon] = {
                [day]: {
                    [i.time]: [
                        [i.ref, i.shop]
                    ]
                }
            }
        } else {
            if (!_ip[i.ip].hasOwnProperty(mon)) {
                _ip[i.ip][mon] = {
                    [day]: {
                        [i.time]: [
                            [i.ref, i.shop]
                        ]
                    }
                }
            } else {
                if (!_ip[i.ip][mon].hasOwnProperty(day)) {
                    _ip[i.ip][mon][day] = {
                        [i.time]: [
                            [i.ref, i.shop]
                        ]
                    }
                } else {
                    if (!_ip[i.ip][mon][day].hasOwnProperty(i.time))
                        _ip[i.ip][mon][day][i.time] = [
                            [i.ref, i.shop]
                        ]
                    else
                        _ip[i.ip][mon][day][i.time].push([i.ref, i.shop])
                }
            }

        }
    }

    for (let i in _ip) {
        let ip = [i];
        let colM = [];
        for (let y in _ip[i]) {
            let mo = [y];
            let colD = [];
            for (let z in _ip[i][y]) {
                let da = [z];
                let colT = [];
                for (let t in _ip[i][y][z]) {
                    let ti = [t];
                    let [...f] = _ip[i][y][z][t];
                    ti.push(f);
                    colT.push(ti)
                }
                da.push(colT);
                colD.push(da)
            }
            mo.push(colD);
            colM.push(mo)
        }
        ip.push(colM)
        _map.push(ip)
    }

    for (let i of _map) {
        i[1].sort(sortMon);
        for (let m of i[1]) {
            m[1].sort(sortDay);
            for (let d of m[1]) {
                d[1].sort(sortTime)
            }
        }
    }

    _map.sort(sortIp);

    $('.box').append(createObj())
})