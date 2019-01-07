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

    $offers = $('.offers');
    $links = $('.links a');
    $plus = $('.plus');
    $minus = $('.minus')

    let _moves = $moveM.add($moveT);
    let _levels = $levelM.add($levelT);

    addOffers();

    $('img').bind('load', () => {
        calibrate(), calibrateLogo()
    })

    calibrateOffers();

    $aboutB.bind('click', aboutUs);

    $plus.add($minus).bind('click', plusMinus)

    _moves.each(function() {
        let _move = $(this);
        _move.bind('drag', (e) => {
            let _move = $(e.target).closest('.move');
            sliderValue(_move, labelMove)
        })
    })

    $(window).bind('resize', () => {
        calibrate();
        calibrateLogo()
    });

})