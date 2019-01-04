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
    $offers = $('.offers');
    $links = $('.links a');
    $plus = $('.plus');
    $minus = $('.minus')

    let _moves = $moveM.add($moveT);
    let _levels = $levelM.add($levelT);

    addOffers();

    $('img').bind('load', calibrate)

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
        let _w = $(window).width();
        if (_w >= 576)
            $('.logo>img').attr('src', 'pic/logoB.png');
        else
            $('.logo>img').attr('src', 'pic/logo.png');
    });

})