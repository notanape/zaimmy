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

    let _moves = $moveM.add($moveT);
    let _levels = $levelM.add($levelT);

    addOffers();

    $('img').each(function() {
        $(this).on('load', () => {
            calibrate()
        })
    })

    //calibrate();

    calibrateOffers();

    $aboutB.bind('click', aboutUs);

    _moves.each(function() {
        let _move = $(this);
        _move.bind('drag', (e) => {
            let _move = $(e.target).closest('.move');
            sliderValue(_move, labelMove)
        })
    })

    _levels.each(function() {
        let _level = $(this);
        _level.bind('click', (e) => {
            e.stopImmediatePropagation();
            let _move = _level.next();
            let _left = _level.position().left + e.offsetX - _move.width() / 2;
            _move.css('left', `${_left}px`);
            sliderValue(_move, labelMove)
        })
    })

    $(window).bind('resize', calibrate);

})