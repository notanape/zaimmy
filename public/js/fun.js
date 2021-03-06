function dragOptions(move, level) {
    let _opt = {
        axis: 'x',
        containment: level.closest('.handler'),
        stop: () => {
            loading();
            setTimeout(() => {
                calibrateOffers(loading)
            }, 10)
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
    let _back = _move.is($moveM) ? $backM : $backT;
    if (arguments.length == 2) {
        _slider.left = _move.position().left;
        let _grid = _info.max / _info.min;
        let _oneStep = _level.width() / _grid;
        let _posLevel = Math.floor((_slider.left + (_move.width() / 2) - _levelL) / _oneStep);
        _slider.value = _info.min + (_info.step * (_posLevel));
    } else {
        _slider.value = arguments[1];
        let _grid = _info.max / _info.min;
        let _oneStep = _level.width() / _grid;
        let _needSteps = _slider.value / _info.step;
        let _posLevel = _oneStep * _needSteps;
        _slider.left = _posLevel + (_levelL - _move.width() / 2);
        _move.css('left', `${_slider.left}px`);
    }
    _back.css('width', `${_move.position().left - _levelL + 2}px`)
    _call(_move);
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

function plusMinus(e) {
    e.stopImmediatePropagation();
    let _b = $(e.target).closest('.inter');
    let _move = _b.parent().find(`.sliderCalc#${_b.attr('id')}`).find('.move');
    let _info = _b.attr('id') == 'money' ? _money_info : _time_info;
    let _slider = _b.attr('id') == 'money' ? _money_slider : _time_slider;
    if (_b.hasClass('plus')) {
        if (_slider.value < _info.max)
            _slider.value += _info.step;
    } else if (_b.hasClass('minus')) {
        if (_slider.value > _info.min)
            _slider.value -= _info.step;
    }
    sliderValue(_move, _slider.value, labelMove);
    setTimeout(() => {
        calibrateOffers()
    }, 10)
}

function opac() {
    $moveM.add($moveT).add($flag).add($plus).add($minus).each(function() {
        $(this).css('opacity', 0);
    })
}

function disopac() {
    $moveM.add($moveT).add($flag).add($plus).add($minus).each(function() {
        $(this).css('opacity', 1);
    })
}

function aboutUs(e) {
    e.stopImmediatePropagation();
    if ($aboutW.css('display') == "none") {
        opac()
        $aboutW.slideDown({
            start: () => {
                $('.head').css({
                    borderRadius: '0'
                });
                $('.head .button').css({
                    borderRadius: '17px 0 0 0'
                })
            },
            duration: 300,
            complete: () => {
                $aboutW.css('display', 'inline-block');
                calibrate();
                disopac();
                $aboutT.animate({
                    opacity: 1
                }, 150)
            }
        });
        return false
    } else {
        $aboutT.animate({
            opacity: 0
        }, 150, () => {
            $aboutW.css('display', 'block');
            opac()
            $aboutW.slideUp(300, () => {
                $('.head').css({
                    borderRadius: '0 0 17px 17px'
                });
                $('.head .button').css({
                    borderRadius: '17px 0 17px 0'
                })
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
        let _plus = $(`.inter.plus#${_move.closest('.sliderCalc').attr('id')}`);
        let _minus = $(`.inter.minus#${_move.closest('.sliderCalc').attr('id')}`);
        let _hand = _move.parent();
        _move.position({
            my: 'center',
            at: 'left center',
            of: _level
        });
        _hand.css({
            marginLeft: `${_plus.width() + (_plus.css('border-left-width').replace('px','')) * 2 }px`,
            marginRight: `${_plus.width() + (_plus.css('border-left-width').replace('px','')) * 2 }px`
        })
        _plus.position({
            my: 'left center',
            at: 'right center',
            of: _hand,
            collision: 'none'
        })
        _minus.position({
            my: 'right center',
            at: 'left center',
            of: _hand,
            collision: 'none'
        })
        _move.draggable(dragOptions(_move, _level));
        sliderValue(_move, _slider.value, labelMove);

    });
    calibrateFlags($flag);
    let _off = $offers.find('.offer');
    _off.each(function() {
        let _this = $(this);
        _this.find('.offerLogo').css('width', `${_this.height()}px`)
    })
}



function calibrateLogo() {
    let _w = $(window).width();
    let _t = $('.take');
    if (_w >= 576) {
        $('.logo>img').attr('style', 'height:auto !important');
        if (!_im_changed) {
            _t.find('img').remove();
            _t.append(_im);
            _im_changed = true
        }

    } else {
        $('.logo>img').attr('style', 'height:106px !important');
        if (_im_changed) {
            _t.find('img').remove();
            _t.append(_im_mob);
            _im_changed = false
        }
    }
}

function calibrateFlags(flags) {
    flags.each(function() {
        let _flag = $(this);
        adjustFlag(_flag);
        _flag.position({
            my: 'right top',
            at: 'left top',
            of: _flag.parent().find('.right'),
            collision: 'none'
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

function addOffers() {
    _conditions.forEach((v, k) => {
        let _offerD = $(_offer(k, v));
        $offers.append(_offerD);
        $promoB = $offers.find('.buttom#promocode');
        let _off = $offers.find('.offer');
        _off.each(function() {
            let _this = $(this);
            _this.find('.left').css('width', `${_this.height()}px`);
        })
        $flag = $offers.find('.flag');
    })
}

function onShow() {
    $prop.removeClass('d-none');
}

function onHide() {
    $prop.addClass('d-none');
}

function isEmpty() {
    let _empty = true;
    let _offers = $('.offers .offer');
    for (let i = 0; i < _offers.length; i++) {
        let _d = $(_offers[i]).css('display');
        if (_d != 'none') {
            _empty = false;
            break;
        }
    }
    if (_empty)
        onShow();
    else
        onHide();
}

function proposals() {
    let _prop = $offers.find('.desc').find('b');
    let _tot = 0;
    let _offers = $('.offers .offer');
    for (let i = 0; i < _offers.length; i++) {
        let _d = $(_offers[i]).css('display');
        if (_d != 'none') {
            ++_tot
        }
    }
    _prop.text(_tot)
}

function sortOffers() {
    let a = $('.offer').sort((a, b) => {
        let totA = parseInt($(a).find('.total').text());
        let totB = parseInt($(b).find('.total').text());
        for (let i of $(a).find('.condition'))
            if ($(i).css('display') != 'none')
                totA = parseInt($(i).find('.total').text())
        for (let i of $(b).find('.condition'))
            if ($(i).css('display') != 'none')
                totB = parseInt($(i).find('.total').text())
        return totA - totB
    })
    $('.offer').remove();
    $offers.append(a);
    $checkout = $('.forButton>#checkout');
    $checkout.bind('click', checkout);
    let loc = decodeURI(location.pathname.split('/')[1]);
    let _off = $('.offer');
    for (let o = 0; o < _off.length; o++) {
        let _id = $(_off[o]).attr('id').replace(/\s/g, '-').toLowerCase();
        if (_id == loc) {
            $(_off[o]).insertBefore($($('.offer')[0]));
            break;
        }
    }
    $flag = $offers.find('.flag');
    calibrateFlags($flag);
    if (arguments.length != 0)
        arguments[0]();
}

function calibrateOffers() {
    let _map = {};
    let _mV = _money_slider.value;
    let _tV = _time_slider.value;
    let _ch = $check.hasClass('ch');
    let _prom = $pCheck.hasClass('ch');
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
    for (let _cond in _map) {
        let _of = _map[_cond];
        if (_ch) {
            if (_conditions.get(_cond).hasOwnProperty('extra'))
                if (_conditions.get(_cond)['extra'].hasOwnProperty('promo'))
                    _map[_cond].push('promo');
            _of.forEach((d, i) => {
                if (d == 'second')
                    _of.splice(i, 1)
            })
            if (_prom)
                if (!_of.includes('promo'))
                    _map[_cond] = [];
        } else if (!_ch) {
            _of.forEach((d, i) => {
                if (d == 'first' || d == 'promo')
                    _of.splice(i, 1)
            })
        }
    }

    for (let _off in _map) {
        let _con = _map[_off];
        let _company = $(`[id="${_off}"]`);
        let _p = _map[_off].includes('promo');
        let _promoB = _company.find('.button#promocode');
        let _checkout = _company.find('.button#checkout');
        if (_p) {
            _promoB.removeClass('d-none');
            _checkout.addClass('d-none');
        } else {
            _promoB.addClass('d-none');
            _checkout.removeClass('d-none');
        }
        _company.find('.condition').each(function() {
            let _conN = $(this).attr('id');
            let _amm = $(this).find('.total');
            let _per = $(this).find('.percentage');
            let _keys = _conditions.get(_off)[_conN];
            let _perc = parseFloat((_conditions.get(_off)[_conN].APR / 365 * _tV).toFixed(2));
            let _total = Math.floor(_mV + _mV / 100 * _perc).toString();
            let _loyal = '';
            if (_conN != 'first') {
                _loyal = _conditions.get(_off).hasOwnProperty('extra') ? `<sup>*</sup><br>(До -${_conditions.get(_off)['extra']['loyal']}%)` : ''
            }
            _amm.parent().css('opacity', '0');
            _per.parent().css('opacity', '0');

            _amm.text(_total);
            _per.html(`${_perc} %`.concat(_loyal));
            _amm.parent().css('opacity', '1');
            _per.parent().css('opacity', '1');


        })
        if (_con.length == 0) {
            if (_company.css('display') != "none") {
                _company.css('display', "none");
                isEmpty();
                proposals();
            }
        } else {
            if (_company.css('display') == "none") {
                _company.css('display', "block");
                isEmpty();
                proposals();
            }
            let _c = _company.find('.condition')
            for (let i of _c) {
                let _elem = $(i);
                let _id = _elem.attr('id');
                if (_con.includes(_id)) {
                    if (_elem.css('display') == "none") {
                        _elem.css('display', 'block');
                        isEmpty();
                        proposals();
                    }
                    let _of = _c.closest('.offer').attr('id');
                    let _per = (_conditions.get(_of)[_id].APR / 365).toFixed(2);
                    let _flag = _c.closest('.soul').find('.flag').find('.label').find('span');
                    _flag.text(_per + '%');
                } else if (_elem.css('display') != "none") {
                    _elem.css('display', 'none');
                    isEmpty();
                    proposals();
                }
            }
        }
    }

    calibrateFlags($flag);

    if (!_sorted) {
        if (arguments.length != 0)
            sortOffers(arguments[0])
        else
            sortOffers()
        _sorted = true
    } else
        arguments[0]()
}

function checkout(e) {
    loading();
    let _target = $(event.target);
    let _info = _target.closest('.forButton').prev();
    let _con = _info.find('.condition');
    let _offer = _target.closest('.offer').attr('id').toLowerCase().replace(/\s/g, '-');
    let _loan = "loan-cash";
    if (_con.filter('#ordinary').length != 0 || _con.filter('#first').css('display') != 'none')
        window.open(`${location.origin}/${_offer}/${_loan}-register`, '_self')
    else if (_con.filter('#first').css('display') == 'none')
        window.open(`${location.origin}/${_offer}/${_loan}`, '_self')
}

function unVeil() {
    proposals();
    calibrateLogo();
    calibrate();
    $veil.animate({
        opacity: 0
    }, {
        duration: 100,
        start:()=>{

            calibrateFlags($flag);
        },
        complete: () => {
            $veil.removeClass('d-flex').addClass('d-none');
            $('body').css({
                'overflow-y': 'auto',
                'overflow-x': 'hidden'
            });

        }
    })
}

function loading() {
    let _loa = false;

    $veil = $('.veil');
    let _cl = $veil.hasClass('d-flex');
    $veil.css('opacity', '0.6');
    let _b = () => {
        let ch = false;
        let _bo = $('body');
        let _ov = _bo.css('overflow-y');
        let _v = '';
        if (_ov == 'hidden' && !ch) {
            _v = 'auto';
            ch = true
        } else if (_ov == 'auto' && !ch) {
            _v = 'hidden';
            ch = true
        }
        _bo.css('overflow-y', _v);
    };
    if (_cl && !_loa) {
        _b();
        $veil.addClass('d-none').removeClass('d-flex');
        _loa = true;
    } else if (!_cl && !_loa) {
        $veil.css('top', $(window).scrollTop())
        _b();
        $veil.addClass('d-flex').removeClass('d-none');
        _loa = true;
    }
}

function showUp() {
    if ($up.hasClass('d-none')) {
        $up.removeClass('d-none');
        $up.animate({
            opacity: 1
        }, {
            duration: 100
        })
    }
}

function hideUp() {
    if (!$up.hasClass('d-none')) {
        $up.animate({
            opacity: 0
        }, {
            duration: 100,
            complete: () => {
                $up.addClass('d-none');
            }
        })
    }
}

function scrollToCalc() {
    $('html,body').animate({
        scrollTop: $('.calculator').find('.desc').position().top
    }, 150)
}

function checkFirst() {
    if ($check.hasClass('ch')) {
        $check.removeClass('ch');
        $pCheck.removeClass('ch');
        //promoVis();
    } else {
        $check.addClass('ch');
        //promoVis()
    }
    _sorted = false;
    loading();
    setTimeout(() => {
        calibrateOffers(loading)
    }, 10)
}

function checkPromo() {
    if ($pCheck.hasClass('ch'))
        $pCheck.removeClass('ch');
    else
        $pCheck.addClass('ch');
    calibrateOffers()
}

function promoVis() {
    let _d = false;
    let _op = $promo.css('opacity');
    if (_op == 1) {
        $promo.css('opacity', 0);
        _d = true;
    } else if (_op == 0 && !_d)
        $promo.css('opacity', 1);
}