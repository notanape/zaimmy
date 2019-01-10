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

    $first = $('.additional').find('.first');
    $check = $first.find('#check');
    $limit = $('.additional').find('.limit');
    $cap = $limit.find('#caption');
    $down = $limit.find('#down');
    $list = $('.additional').find('.list');
    $ul = $('.additional').find('ul');    

    $first.bind('click', checkFirst);

    $limit.bind('click', () => {
        listShow()
    });
    
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
        calibrate(), calibrateLogo(), calibrateFlags($flag), proposals(), unVeil();
        $list.css('width', $limit.width() + 16)
    })

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

    $(window).bind({
        'resize': () => {
            calibrate(), calibrateLogo(), calibrateFlags($flag), positionList();
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