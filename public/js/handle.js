$(() => {

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
    $prop = $('.no-prop');
    $veil = $('.veil');
    $up = $('.up');

    $offers = $('.offers');
    $links = $('.links a');
    $plus = $('.plus');
    $minus = $('.minus')

    let _moves = $moveM.add($moveT);
    let _levels = $levelM.add($levelT);

    $(_im).attr('src', 'pic/currency/take.png');
    $(_im_mob).attr('src', 'pic/currency/take-mob.png');

    if ($(window).width() >= 576) {
        $('.take').append(_im);
        _im_changed = true

    } else {
        $('.take').append(_im_mob);
        _im_changed = false
    }

    addOffers();

    $('img').bind('load', () => {
        calibrate(), calibrateLogo(), calibrateFlags($flag), proposals(), unVeil()
    })

    calibrateOffers();

    $aboutB.bind('click', aboutUs);

    $offers.find('.desc').bind('click', () => {
        $('html,body').animate({
            scrollTop: $('.offers').find('.desc').position().top
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

    $(window).bind({
        'resize': () => {
            calibrate(), calibrateLogo(), calibrateFlags($flag)
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