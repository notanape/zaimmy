function findBound(move, level) {
    let _a = [];
    let _mW = move.width() / 2;
    let _lW = level.width();
    let _lL = level.position().left;
    let _lM = parseInt(level.css('margin-left').replace('px', ''));
    let _p1 = level.closest('.handler').position().left;
    let _p1M = parseInt(level.closest('.handler').css('margin-left').replace('px', ''));
    let _p2 = level.closest('.sliderCalc').position().left;
    let _p2M = parseInt(level.closest('.sliderCalc').css('margin-left').replace('px', ''));
    let _p3M = parseInt($('.container-fluid').css('margin-left').replace('px', ''));
    _a[0] = _money_slider.left = _time_slider.left = (_lL + _lM + _p1 + _p1M + _p2 + _p2M + _p3M) - _mW;
    _a[1] = 0;
    _a[2] = (_lL + _lM + _p1 + _p1M + _p2 + _p2M + _p3M) + _lW - _mW;
    _a[3] = 0;
    return _a;
}

function dragOptions(move, level) {
    let _opt = {
        axis: 'x',
        containment: level.closest('.handler'),
        stop: () => {
            calibrateOffers();
        }
    }
    return _opt
}

function sliderValue() {
    let _move = arguments[0];
    let _call = arguments[arguments.length - 1];
    let _level = _move.is($moveM) ? $levelM : $levelT;
    let _slider = _move.is($moveM) ? _money_slider : _time_slider;
    let _info = _move.is($moveM) ? _money_info : _time_info;
    let _levelL = _level.position().left + parseInt(_level.css('margin-left').replace('px', ''));
    if (arguments.length == 2) {
        _slider.left = _move.position().left;
        let _grid = _info.max / _info.min;
        let _oneStep = _level.width() / _grid;
        let _posLevel = Math.floor((_slider.left + (_move.width() / 2) - _levelL) / _oneStep);
        _slider.value = _info.min + (_info.step * (_posLevel));
        _call(_move);
    } else {
        _slider.value = arguments[1];
        let _grid = _info.max / _info.min;
        let _oneStep = _level.width() / _grid;
        let _needSteps = _slider.value / _info.step;
        let _posLevel = _oneStep * _needSteps;
        _slider.left = _posLevel + (_levelL - _move.width() / 2);
        _move.css('left', `${_slider.left}px`);
        _call(_move);
    }
}

function labelMove(move) {
    let _label = move.parent().parent().find('.label');
    let _slider = move.is($moveM) ? _money_slider : _time_slider;
    _label.find('b').text(_slider.value);
    if (move.is($moveT)) {
        let _am = _slider.value;
        let _span = _label.find('span');
        if (_am > 4 && _am < 20)
            _span.text(' днів')
        else {
            let _last = parseInt(`${_am}`.substr(-1));
            if (_last == 1)
                _span.text(' день')
            else if (_last > 1 && _last < 5)
                _span.text(' дні')
            else
                _span.text(' днів')
        }
    }
    _label.position({
        my: 'center bottom',
        at: `center top`,
        of: move,
        collision: 'fit',
        within: _label.parent()
    })
}

function opac() {
    $moveM.add($moveT).add($flag).each(function() {
        $(this).css('opacity', 0);
    })
}

function disopac() {
    $moveM.add($moveT).add($flag).each(function() {
        $(this).css('opacity', 1);
    })
}

function aboutUs(e) {
    e.stopImmediatePropagation();
    if ($aboutW.css('display') == "none") {
        opac()
        $aboutW.slideDown(300, () => {
            $aboutW.css('display', 'inline-block');
            calibrate();
            disopac();
            $aboutT.animate({
                opacity: 1
            }, 150)
        });
        return false
    } else {
        $aboutT.animate({
            opacity: 0
        }, 150, () => {
            $aboutW.css('display', 'block');
            opac()
            $aboutW.slideUp(300, () => {
                calibrate();
                disopac()
            });
        })
        return false
    }

}

function calibrate() {
    let _moves = $moveM.add($moveT);
    _moves.each(function() {
        let _move = $(this);
        let _level = _move.prev();
        let _slider = _move.is($moveM) ? _money_slider : _time_slider;
        _move.position({
            my: 'center',
            at: 'left center',
            of: _level
        });
        _move.draggable(dragOptions(_move, _level));
        sliderValue(_move, _slider.value, labelMove);
    });
    calibrateFlags($flag)
}

function calibrateFlags(flags) {
    flags.each(function() {
        let _flag = $(this);
        //recountFlag(_flag)
        adjustFlag(_flag);
        _flag.position({
            my: 'left top',
            at: 'right top',
            of: _flag.parent().find('.right .label .title')
        });
    })
}

function adjustFlag(flag) {
    let _fW = flag.width() / 2;
    let _leftCorner = flag.find('.leftCorner');
    let _rightCorner = flag.find('.rightCorner');
    _leftCorner.add(_rightCorner).each(function() {
        let _corner = $(this);
        _corner.css(`border-${_corner.is(_leftCorner)?'right':'left'}-width`, `${_fW}px`);
    })
}

function recountFlag(flag) {
    let _label = flag.find('.label').find('span');
    let _off = flag.closest('.offer').attr('id');
    let _perc = 0;
    if (_conditions.get(_off).hasOwnProperty('first')) {
        if (_conditions.get(_off).first.hasOwnProperty('multiplier'))
            _perc = ((_time_slider.value * _conditions.get(_off).first.multiplier).toFixed(2)).toString()
        else
            _perc = _conditions.get(_off).first.percentage
    } else if (_conditions.get(_off).hasOwnProperty('ordinary')) {
        if (_conditions.get(_off).ordinary.hasOwnProperty('multiplier'))
            _perc = ((_time_slider.value * _conditions.get(_off).ordinary.multiplier).toFixed(2)).toString()
        else
            _perc = _conditions.get(_off).ordinary.percentage
    }
    _label.text(`${_perc}%`)
}

function addOffers() {
    _conditions.forEach((v, k) => {
        let _offerD = $(_offer(k, v));
        $offers.append(_offerD);
        $flag = $offers.find('.flag');
        _offerD.find('img').on('load', e => {
            $flag = $offers.find('.flag');
            calibrateFlags($flag);
        });
    })
}


function calibrateOffers() {
    let _map = {};
    let _mV = _money_slider.value;
    let _tV = _time_slider.value;
    _conditions.forEach((v, k) => {
        if (!_map.hasOwnProperty(k))
            _map[k] = [];
        for (let i in v) {
            let _o = v[i];
            if ((_mV >= _o.minAmount && _mV <= _o.maxAmount) && (_tV >= _o.minTime && _tV <= _o.maxTime)) {
                _map[k].push(i)
            }
        }
    });
    for (let _off in _map) {
        let _con = _map[_off];

        let _company = $(`[id="${_off}"]`);
        _company.find('.condition').each(function() {
            let _conN = $(this).attr('id');
            let _amm = $(this).find('.total');
            let _per = $(this).find('.percentage');
            let _keys = _conditions.get(_off)[_conN];
            let _perc = 0;
            _amm.parent().css('opacity', '0');
            _per.parent().css('opacity', '0');

            setTimeout(() => {
                if (_keys.hasOwnProperty('time_multiplier')) {
                    _perc = _tV * _keys['time_multiplier'];
                }
                if (_keys.hasOwnProperty('amount_multiplier')) {
                    _perc += _tV * _keys['amount_multiplier'];
                } else if (!_keys.hasOwnProperty('time_multiplier') && !_keys.hasOwnProperty('amount_multiplier'))
                    _perc = _keys.percentage;
                _amm.text(Math.floor(_mV + _mV / 100 * _perc).toString());
                _per.text(_perc.toFixed(2));
                _amm.parent().css('opacity', '1');
                _per.parent().css('opacity', '1');
            }, 200)


        })
        if (_con.length == 0) {
            if (_company.css('display') != "none")
                _company.slideUp({
                    duration: 200,
                    step: () => {
                        calibrateFlags($flag)
                    }
                })
        } else {
            if (_company.css('display') == "none")
                _company.slideDown({
                    duration: 200,
                    step: () => {
                        calibrateFlags($flag)
                    }
                })
            let _c = _company.find('.condition')
            for (let i of _c) {
                let _elem = $(i);
                let _id = _elem.attr('id');
                if (_con.includes(_id)) {
                    if (_elem.css('display') == "none")
                        _elem.slideDown(200)
                } else
                if (_elem.css('display') != "none") {
                    _elem.find('.total').text('');
                    _elem.slideUp(200)
                }
            }
        }
    }
}