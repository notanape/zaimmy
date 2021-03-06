let $aboutB, $aboutW, $aboutT;
let $sliderM, $sliderT, $plus, $minus;
let $levelM, $moveM, $levelT, $moveT, $backM, $backT;
let $offers, $flag, $changeTimeout;
let $links;
let $checkout;
let $prop;
let $veil, $up;
let $first,$check,$limit,$cap,$down,$list;
let $promo, $pCheck, $promoB;
let _limit = [];
let _whole = 0;
let _sorted = false;

let _im_changed = false;

let $m_b = '20px';
let $ch_col = '#c5a0a1';

let _offer = (title, info) => {
    let _condition = info => {
        let _c = '';
        let _pat = (type) => {
            let _title;
            switch (type) {
                case "ordinary":
                    _title = "Стандарт"
                    break;
                case "first":
                    _title = "Вперше"
                    break;
                case "second":
                    _title = "Стандарт"
                    break;
            }

            return `<div class="condition" id="${type}">
                    <div class="soul d-flex flex-column justify-content-space-between">
                <div class="labelStatus d-flex justify-content-center">
                  <div class="inLabel">${_title}</div>
                </div>
                <div class="labelPerc d-flex justify-content-center flex-grow-1">
                  <div class="inLabel">
                  <span class="percentage"></span>
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
    
    let _types = Object.keys(info);
    let _flag = '';
        if(_types.includes('first'))
            _flag = (info['first'].APR / 365).toFixed(2) + '%'
        else
            _flag = (info['ordinary'].APR / 365).toFixed(2) + '%'
    let _extra = _types.includes('extra') ? info['extra'] : false; 
    
    return `<div class="offer" id="${title}">
            <div class="soul d-flex">
          <div class="left d-flex align-items-center">
            <div class="offerLogo">
              <img class="img-fluid" src="pic/partners/${title.replace(/\s/g,'-').toLowerCase()}.png" alt="${title}" onload="if (--_whole == 0) unVeil();">
            </div>
          </div>
          <div class="right d-flex flex-column">
            <div class="label d-flex justify-content-begin">
              <div class="title"><h1>${title}</h1></div>
            </div>
            <div class="info d-flex justify-content-stretch">
              ${_condition(info)}
            </div>
            <div class="forButton d-flex justify-content-end">
            <div class="button desc d-none" id="promocode">
                Промо-код
                <input hidden id="promo" type="text" value="${!_extra ? '' : _extra.hasOwnProperty('promo') ? _extra.promo : ''}">
              </div>
              <div class="button desc" id="checkout">
                Оформити
              </div>
            </div>
          </div>
          <div class="flag">
            <div class="label"><span>${_flag}</span>
            <div class="leftCorner"></div>
            <div class="rightCorner"></div>
          </div>
        </div>
        </div>
      </div>`
}