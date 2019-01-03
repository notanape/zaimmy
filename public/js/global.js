let $aboutB, $aboutW, $aboutT;
let $sliderM, $sliderT;
let $levelM, $moveM, $levelT, $moveT;
let $offers, $flag, $changeTimeout;
let $links;

let _links_font = {
    min: 0.6,
    max: 1
}

let _money_info = {
    min: 100,
    max: 15000,
    step: 100
}

let _time_info = {
    min: 1,
    max: 65,
    step: 1
}

let _money_slider = {
    left: 0,
    value: 5000
}

let _time_slider = {
    left: 0,
    value: 14
}

let _conditions = new Map([
    ['Demo partnerN1', {
        ordinary: {
            minAmount: 300,
            maxAmount: 10000,
            minTime: 7,
            maxTime: 14,
            percentage: 1.9,
            time_multiplier: 0.28,
            amount_multiplier: 0.01
        }
    }],
    ['Demo partnerN2', {
        first: {
            minAmount: 100,
            maxAmount: 4000,
            minTime: 5,
            maxTime: 60,
            percentage: 0.01
        },
        second: {
            minAmount: 100,
            maxAmount: 13000,
            minTime: 5,
            maxTime: 60,
            percentage: 3.2
        }
    }]
]);

let _offer = (title, info) => {
    let _condition = info => {
        let _c = '';
        let _pat = (type) => {
            let _title;
            switch (type) {
                case "ordinary":
                    _title = "Постійні умови"
                    break;
                case "first":
                    _title = "Вперше"
                    break;
                case "second":
                    _title = "Повторно"
                    break;
            }           

            return `<div class="condition" id="${type}">
                    <div class="soul d-flex flex-column">
                <div class="labelStatus d-flex justify-content-center">
                  <div class="inLabel">${_title}</div>
                </div>
                <div class="labelPerc d-flex justify-content-center">
                  <div class="inLabel">
                  <span class="percentage"></span> %
                  </div>
                </div>
                <div class="labelAmount d-flex justify-content-center">
                  <div class="inLabel">
                    <span class="total">0</span> грн
                  </div>
                </div>
                </div>
              </div>`
        }
        let _keys = Object.keys(info);
        for (let k of _keys)
            _c += _pat(k)
        return _c
    }
    let _flag = 0;
    let _types = Object.keys(info);

    for (let i of _types) {
        if (i == "ordinary" || i == "first") {
            if (info[i].hasOwnProperty('time_multiplier'))
                _flag = info[i]["time_multiplier"]
            if (info[i].hasOwnProperty('amount_multiplier'))
                _flag += info[i]["amount_multiplier"]
            else if (!info[i].hasOwnProperty('time_multiplier') && !info[i].hasOwnProperty('amount_multiplier'))
                _flag = info[i].percentage
        }
    }
    return `<div class="offer" id="${title}">
            <div class="soul d-flex">
          <div class="left">
            <div class="offerLogo">
              <img src="pic/partners/${title.replace(/\s/g,'_')}.png" alt="${title}">
            </div>
          </div>
          <div class="right d-flex flex-column">
            <div class="label d-flex justify-content-begin">
              <div class="title">${title}</div>
            </div>
            <div class="info d-flex justify-content-stretch">
              ${_condition(info)}
            </div>
            <div class="forButton d-flex justify-content-end">
              <div class="button" id="checkout">
                Checkout
              </div>
            </div>
          </div>
          <div class="flag">
            <div class="label"><span>${_flag.toFixed(2)}%</span>
            <div class="leftCorner"></div>
            <div class="rightCorner"></div>
          </div>
        </div>
        </div>
      </div>`
}