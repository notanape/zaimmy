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
    }],
    ['Moneyveo', {
        first: {
            minAmount: 100,
            maxAmount: 4000,
            minTime: 1,
            maxTime: 30,
            time_multiplier: 0.01,
            amount_multiplier: 0.01
        },
        second: {
            minAmount: 100,
            maxAmount: 15000,
            minTime: 1,
            maxTime: 30,
            time_multiplier: 0.01,
            amount_multiplier: 0.01
        }
    }]
]);