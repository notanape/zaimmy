let _im = new Image();
let _im_mob = new Image();

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
    value: 3000
}

let _time_slider = {
    left: 0,
    value: 14
}

let _conditions = new Map([
    ['Alexcredit', {
        first: {
            minAmount: 100,
            maxAmount: 3000,
            minTime: 5,
            maxTime: 30,
            APR:3.65
        },
        second: {
            minAmount: 100,
            maxAmount: 10000,
            minTime: 5,
            maxTime: 30,
            APR:620.5
        },
        extra:{
            loyal:40
        }
    }],
    ['Dinero', {
        first: {
            minAmount: 300,
            maxAmount: 10000,
            minTime: 7,
            maxTime: 30,
            APR:3.65
        },
        second: {
            minAmount: 300,
            maxAmount: 15000,
            minTime: 7,
            maxTime: 30,
            APR:176.4
        }
    }],
    ['Moneyveo', {
        first: {
            minAmount: 100,
            maxAmount: 5000,
            minTime: 1,
            maxTime: 30,
            APR:3.65
        },
        second: {
            minAmount: 300,
            maxAmount: 15000,
            minTime: 1,
            maxTime: 30,
            APR:620.5
        }
    }],
    ['КредитКаса', {
        first: {
            minAmount: 400,
            maxAmount: 10000,
            minTime: 1,
            maxTime: 27,
            APR:3.65
        },
        second: {
            minAmount: 300,
            maxAmount: 10000,
            minTime: 1,
            maxTime: 27,
            APR:730
        }
    }],
    ['Быстрозайм', {
        first: {
            minAmount: 500,
            maxAmount: 2000,
            minTime: 7,
            maxTime: 30,
            APR:3.65
        },
        second: {
            minAmount: 500,
            maxAmount: 10000,
            minTime: 7,
            maxTime: 65,
            APR:511
        }
    }],
    ['Ваша Готівочка', {
        first: {
            minAmount: 200,
            maxAmount: 7000,
            minTime: 1,
            maxTime: 16,
            APR:3.65
        },
        second: {
            minAmount: 200,
            maxAmount: 7000,
            minTime: 1,
            maxTime: 65,
            APR:730
        }
    }],
    ['MyCredit', {
        first: {
            minAmount: 100,
            maxAmount: 4000,
            minTime: 1,
            maxTime: 30,
            APR:3.65
        },
        second: {
            minAmount: 100,
            maxAmount: 10000,
            minTime: 1,
            maxTime: 30,
            APR:584
        },
        extra:{
            loyal:20
        }
    }],
    ['CreditPlus', {
        first: {
            minAmount: 500,
            maxAmount: 4000,
            minTime: 3,
            maxTime: 30,
            APR:3.65
        },
        second: {
            minAmount: 500,
            maxAmount: 10000,
            minTime: 3,
            maxTime: 30,
            APR:657
        },
        extra:{
            loyal:25
        }
    }],
    ['SOSCredit', {
        first: {
            minAmount: 500,
            maxAmount: 3000,
            minTime: 1,
            maxTime: 15,
            APR:3.65
        },
        second: {
            minAmount: 500,
            maxAmount: 15000,
            minTime: 1,
            maxTime: 30,
            APR:657
        },
        extra:{
            loyal:50
        }
    }],
    ['TopCredit', {
        ordinary: {
            minAmount: 100,
            maxAmount: 15000,
            minTime: 1,
            maxTime: 65,
            APR:693.5
        }
    }]
]);