let $aboutB, $aboutW, $aboutT;
let $sliderM, $sliderT, $plus, $minus;
let $levelM, $moveM, $levelT, $moveT, $backM, $backT;
let $offers, $flag, $changeTimeout;
let $links;
let $checkout;

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
          <div class="left d-flex align-items-center">
            <div class="offerLogo">
              <img class="img-fluid" src="pic/partners/${title.replace(/\s/g,'_').toLowerCase()}.png" alt="${title}">
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
                Оформити
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