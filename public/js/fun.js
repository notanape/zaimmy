function findBound(move, level) {
    let _a = [];
    let _mW = move.width() / 2;
    let _lW = level.width();
    let _lL = level.position().left;
    _a[0] = _money_slider.left = _time_slider.left = _lL - _mW;
    _a[1] = 0;
    _a[2] = _lL + _lW - _mW;
    _a[3] = 0;
    return _a;
}

function dragOptions(move, level) {
    let _opt = {
        axis: 'x',
        containment: findBound(move, level),
        stop: () => {
            calibrateOffers()
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
    if (arguments.length == 2) {
        _slider.left = _move.position().left;
        let _grid = _info.max / _info.min;
        let _oneStep = _level.width() / _grid;
        let _posLevel = Math.floor((_slider.left + (_move.width() / 2) - _level.position().left) / _oneStep);
        _slider.value = _info.min + (_info.step * (_posLevel - (_posLevel == 0 ? 0 : 1)));
        _call(_move);
    } else {
        _slider.value = arguments[1];
        let _grid = _info.max / _info.min;
        let _oneStep = _level.width() / _grid;
        let _needSteps = _slider.value / _info.step;
        let _posLevel = _oneStep * _needSteps;
        _slider.left = _posLevel - (_posLevel == 1 ? 1 : 0) + (_level.position().left - _move.width() / 2);
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

function aboutUs(e) {
    e.stopImmediatePropagation();
    if ($aboutW.css('display') == "none") {
        $aboutW.slideDown({
                duration: 300,
                step: calibrateElements,
                complete: () => {
                    $aboutW.css('display', 'inline-block');
                    $aboutT.animate({
                        opacity: 1
                    }, 150)}
                });
            return false
        }
        else {
            $aboutT.animate({
                opacity: 0
            }, 150, () => {
                $aboutW.css('display', 'block');
                $aboutW.slideUp({
                    duration: 300,
                    step: calibrateElements,
                    complete: calibrateElements
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

    function calibrateElements(){
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
            sliderValue(_move, _slider.value, labelMove);
        });
        calibrateFlags($flag)
    }

    function calibrateFlags(flags) {
        flags.each(function() {
            let _flag = $(this);
            adjustFlag(_flag);
            _flag.position({
                my: 'left top',
                at: 'right top',
                of: _flag.parent().find('.right .label .title')
            })
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
                _amm.text(Math.floor(_mV + _mV / 100 * _conditions.get(_off)[_conN].percentage).toString());

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