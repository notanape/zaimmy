
$(() => {

    _whole = _conditions.size + 2;

    $(_im).attr({
        'src': 'pic/currency/take.png',
        'alt': 'Кредит онлайн',
        'onload': 'if (--_whole == 0) unVeil();'
    });
    $(_im_mob).attr({
        'src': 'pic/currency/take-mob.png',
        'alt': 'Кредит онлайн',
        'onload': 'if (--_whole == 0) unVeil();'
    });

    $aboutB = $('#aboutUs');
    $aboutW = $('.about');
    $aboutT = $('.aboutUs');
    $sliderM = $('#money>.handler');
    $sliderT = $('#time>.handler');
    $levelM = $sliderM.find('.level');
    $moveM = $sliderM.find('.move');
    $levelT = $sliderT.find('.level');
    $moveT = $sliderT.find('.move');
    $backM = $levelM.find('.background');
    $backT = $levelT.find('.background');
    $veil = $('.veil');
    $prop = $('.no-prop');
    $up = $('.up');

    $offers = $('.offers');
    $links = $('.links a');
    $plus = $('.plus');
    $minus = $('.minus')

    $first = $('.additional').find('.first');
    $check = $first.find('#check');
    $promo = $('.additional').find('.promo');
    $pCheck = $promo.find('#check');

    $first.bind('click', checkFirst);
    $promo.bind('click', checkPromo);

    $(window).scrollTop(0);

    $veil.css('top', $(window).scrollTop())

    let _moves = $moveM.add($moveT);
    let _levels = $levelM.add($levelT);
   
    if ($(window).width() >= 576) {
        $('.take').append(_im);
        _im_changed = true

    } else {
        $('.take').append(_im_mob);
        _im_changed = false
    }

    addOffers();

    calibrateOffers();

    $aboutB.bind('click', aboutUs);

    $offers.find('.desc').bind('click', () => {
        $('html,body').animate({
            scrollTop: $('.offers').find('.desc').position().top + $('.offers').find('.desc').height() + parseInt($('.offers').find('.desc').css('padding-top').replace('px', '')) * 2
        }, 150)
    })

    $up.bind('click', scrollToCalc)

    $plus.add($minus).bind('click', plusMinus)

    _moves.each(function() {
        let _move = $(this);
        _move.bind('drag', (e) => {
            let _move = $(e.target).closest('.move');
            sliderValue(_move, labelMove)
        })
    })

    /*stat*/

    $(window).bind({
        'resize': () => {
            calibrate(), calibrateLogo(), calibrateFlags($flag);
        },
        'scroll': () => {
            let _w = $(window).scrollTop();
            let _oT = $offers.position().top;
            if (_w > _oT)
                showUp()
            else
                hideUp()
        }
    });

})