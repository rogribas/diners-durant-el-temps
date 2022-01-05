class Movement {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }
}

class Earning extends Movement {
    constructor(id, color, init, rate, incr, ifreq, start, end) {
        super(id, color);
        this.init = init;
        this.rate = rate;
        this.incr = incr;
        this.ifreq = ifreq;
        this.start = start;
        this.end = end;
    }
}

class Spending extends Movement {
    constructor(id, color, init, rate, incr, ifreq, start, end) {
        super(id, color);
        this.init = init;
        this.rate = rate;
        this.incr = incr;
        this.ifreq = ifreq;
        this.start = start;
        this.end = end;
    }
}

class Mortgage extends Movement{
    constructor(id, color, init, total, rate, tax, start, years) {
        super(id, color);
        this.init = init;
        this.total = total;
        this.rate = rate;
        this.tax = tax;
        this.start = start;
        this.years = years;
    }
}

function array2dict(array) {
    var d = {};
    for (var i = 0; i < array.length; i++){
        d[array[i]['name']] = array[i]['value'];
    }
    return d;
}

function form2form(formA, formB) {
    $(':input[name]', formA).each(function() {
        $('[name=' + $(this).attr('name') +']', formB).val($(this).val());
    })
}

function dict2form(dict, formB) {
    for (var name in dict) {
        var value = dict[name];
        $('[name=' + name +']', formB).val(value);
    }
}


const labels = [
    '28 - 2022',
    '29 - 2023',
    '30 - 2024',
    '31 - 2025',
    '32 - 2026',
    '33 - 2027',
    '34 - 2028',
    '35 - 2029',
    '36 - 2030',
    '37 - 2031',
    '38 - 2032',
    '39 - 2033',
    '40 - 2034',
    '41 - 2035',
    '42 - 2036',
    '43 - 2037',
    '44 - 2038',
    '45 - 2039',
    '46 - 2040',
    '47 - 2041',
    '48 - 2042',
    '49 - 2043',
    '50 - 2044',
    '51 - 2045',
    '52 - 2046',
    '53 - 2047',
    '54 - 2048',
    '55 - 2049',
    '56 - 2050',
    '57 - 2051',
    '58 - 2052',
    '59 - 2053',
    '60 - 2054',
    '61 - 2055',
    '62 - 2056',
    '63 - 2057',
    '64 - 2058',
    '65 - 2059',
    '66 - 2060',
    '67 - 2061',
    '68 - 2062',
    '69 - 2063',
    '70 - 2064',
    '71 - 2065',
    '72 - 2066',
    '73 - 2067',
    '74 - 2068',
    '75 - 2069',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Total',
        backgroundColor: '#ffd13e',
        borderColor: '#ffd13e',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0],
        }]
};

const config = {
    type: 'line',
    data: data,
    options: {
        scales: {
            y: {
                grid: {
                    drawBorder: false,
                    color: function(context) {
                        console.log(context.tick.value);
                        if (context.tick.value > 0) {
                            return "#aea";
                        } else if (context.tick.value < 0) {
                            return "#eaa";
                        }
            
                        return '#777';
                    },
                },
            }
        }
    }
    
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

// const myChart = new Chart(document.getElementById('myChart'),
//         config).LineWithLine(data, {
//     datasetFill : false,
//     lineAtIndex: 0
// });

// Chart.types.Line.extend({
//     name: "LineWithLine",
//     initialize: function () {
//         Chart.types.Line.prototype.initialize.apply(this, arguments);
//     },
//     draw: function () {
//         Chart.types.Line.prototype.draw.apply(this, arguments);

//         var point = this.datasets[0].points[this.options.lineAtIndex]
//         var scale = this.scale
//         // draw line
//         this.chart.ctx.beginPath();
//         this.chart.ctx.moveTo(scale.startPoint+12, point.y);
//         this.chart.ctx.strokeStyle = '#ff0000';
//         this.chart.ctx.lineTo(this.chart.width, point.y);
//         this.chart.ctx.stroke();
//     }
// });

function updateChart() {
    removeChart('Total');
    var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < myChart.data.datasets.length; i++) {
        for (var j = 0; j < myChart.data.datasets[i]['data'].length; j++) {
            data[j] += myChart.data.datasets[i]['data'][j];
        }
    }

    const newDataset = {
        label: 'Total',
        backgroundColor: '#ffd13e',
        borderColor: '#ffd13e',
        data: data,
    };
    myChart.data.datasets.push(newDataset);
    myChart.update();

}

function addObj2Chart(obj) {
    var data = [];
    var init = 0;
    if (obj.init) init = parseInt(obj.init);
    if (obj instanceof Earning) {
        for (var i = 0; i < 48; i++) {
            if (parseInt(obj.start) > 2022 + i - 1) {
                if (parseInt(obj.start) == 2022 + i) {
                    data.push(init);
                    continue;
                }
                data.push(0);
                continue;
            }
            var lastYear = data[data.length - 1];

            if (parseInt(obj.end) < 2022 + i) {
                data.push(lastYear);
                continue;
            }
            
            var point = lastYear;
            if (obj.rate) {
                point += lastYear * parseFloat(obj.rate); 
            }
            if (obj.incr) {
                point += parseFloat(obj.incr) * parseFloat(obj.ifreq);
            }
            data.push(point);
        }
    }
    if (obj instanceof Spending) {
        init = -init;
        for (var i = 0; i < 48; i++) {
            if (parseInt(obj.start) > 2022 + i - 1) {
                if (parseInt(obj.start) == 2022 + i) {
                    data.push(init);
                    continue;
                }
                data.push(0);
                continue;
            }
            var lastYear = data[data.length - 1];

            if (parseInt(obj.end) < 2022 + i) {
                data.push(lastYear);
                continue;
            }
            
            var point = lastYear;
            if (obj.rate) {
                point += lastYear * parseFloat(obj.rate); 
            }
            if (obj.incr) {
                point -= parseFloat(obj.incr) * parseFloat(obj.ifreq);
            }
            data.push(point);
        }
    }
    if (obj instanceof Mortgage) {
        init = -init;
        for (var i = 0; i < 48; i++) {
            
            if (parseInt(obj.start) > 2022 + i - 1) {
                if (parseInt(obj.start) == 2022 + i) {
                    data.push(init);
                    continue;
                }
                data.push(0);
                continue;
            }
            var lastYear = data[data.length - 1];

            var years = 1;
            if (obj.years) years = parseInt(obj.years);

            if (parseInt(obj.start) + years < 2022 + i) {
                data.push(lastYear);
                continue;
            }
            
            var point = lastYear;
            var tax = 0;
            if (obj.tax) tax = parseFloat(obj.tax);
            var rate = 0;
            if (obj.rate) rate = parseFloat(obj.rate);
            
            var toAdd = (
                (parseFloat(obj.total) * (1 + tax)
                             + init) * (1 + rate)
                ) / years;
            
            point = point - toAdd;
            data.push(point);
        }
    }
    const newDataset = {
        label:  obj.id,
        backgroundColor: obj.color,
        borderColor: obj.color,
        data: data,
    };
    myChart.data.datasets.push(newDataset);
    updateChart();
}


function removeChart(objId) {
    var index = -1;
    for (var i = 0; i < myChart.data.datasets.length; i++) {
        if (myChart.data.datasets[i]['label'] == objId) {
            index = i;
        }
    }
    if (index >= 0) {
        myChart.data.datasets.splice(index, 1);
    }
}

var movements = {
    'earning': {},
    'spending': {},
    'mortgage': {},
};

function updateParamsURL() {
    var paramsArray = [];
    for (var type in movements) {
        var preType = type[0];
        for (var id in movements[type]) {
            for (var field in movements[type][id]) {
                paramsArray.push(preType + '__' + id + '__' + field + '=' + movements[type][id][field])
            }
        }
    }
    var strParams = "?" + paramsArray.join('&');
    var url = location.protocol + '//' + location.host + location.pathname;
    url += strParams;
    window.history.pushState(null, null, url);
}

function getUrlParams() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');                        
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function loadFromURL() {
    var params = getUrlParams();
    var dictParams = {};
    for (var p in params) {
        var t = p.split('__')[0];
        var id = p.split('__')[1];
        var field = p.split('__')[2];
        var value = params[p];
        if (dictParams[t]) {
            if (dictParams[t][id]) {
                dictParams[t][id][field] = value;
            }
            else {
                dictParams[t][id] = {}
                dictParams[t][id][field] = value
            }
        }
        else {
            dictParams[t] = {}
            dictParams[t][id] = {}
            dictParams[t][id][field] = value;
        }
    }
    for (var tp in dictParams) {
        for (var id in dictParams[tp]) {
            var t = '';
            if (tp == 'e') {
                var obj = new Earning(
                    dictParams[tp][id]["id"],
                    dictParams[tp][id]["color"],
                    parseFloat(dictParams[tp][id]["init"]) || 0,
                    parseFloat(dictParams[tp][id]["rate"]) || 0,
                    parseFloat(dictParams[tp][id]["incr"]) || 0,
                    parseFloat(dictParams[tp][id]["ifreq"]) || 0,
                    parseInt(dictParams[tp][id]["start"]),
                    parseInt(dictParams[tp][id]["end"]),
                )
                movements['earning'][id] = obj;
                var t = 'earning';
            }
            if (tp == 's') {
                var obj = new Spending(
                    dictParams[tp][id]["id"],
                    dictParams[tp][id]["color"],
                    parseFloat(dictParams[tp][id]["init"]) || 0,
                    parseFloat(dictParams[tp][id]["rate"]) || 0,
                    parseFloat(dictParams[tp][id]["incr"]) || 0,
                    parseFloat(dictParams[tp][id]["ifreq"]) || 0,
                    parseInt(dictParams[tp][id]["start"]),
                    parseInt(dictParams[tp][id]["end"]),
                )
                movements['spending'][id] = obj;
                var t = 'spending';
            }
            if (tp == 'm') {
                var obj = new Mortgage(
                    dictParams[tp][id]["id"],
                    dictParams[tp][id]["color"],
                    parseFloat(dictParams[tp][id]["init"]) || 0,
                    parseFloat(dictParams[tp][id]["total"]) || 0,
                    parseFloat(dictParams[tp][id]["rate"]) || 0,
                    parseFloat(dictParams[tp][id]["tax"]) || 0,
                    parseInt(dictParams[tp][id]["start"]),
                    parseInt(dictParams[tp][id]["years"]) || 0,
                )
                movements['mortgage'][id] = obj;
                var t = 'mortgage';
            }
            $('<div class="element">' + '<form id="form-' + id + '">' +
                $('#form-' + t).html() +
                    '</form>' +
                    '<div class="btn-create-container">' +
                        '<button class="btn-rm" type="' + t + '" obj="' + id + '">Remove</button>' +
                        '<button class="btn-up" type="' + t + '" obj="' + id + '" hidden>Update</button>' +
                    '</div>' +
                '</div>'
            ).appendTo(".movements ." + t + "-container");
            $('#form-' + id + ' :input[name="id"]').prop("disabled", true);
            $('#form-' + id).parent().css('background-color', obj.color);
            dict2form(dictParams[tp][id], $('.movements').find('#form-' + id));
            var newjscolor = $('#form-' + id).find(".input-color")[0];
            new jscolor(newjscolor);
            newjscolor.jscolor.fromString(obj.color);
            addObj2Chart(obj);
        }   
    }
}


$(document).ready(function() {
    loadFromURL();

    var usedIds = new Set();

    $(".btn-create").click(function() {
        var t = $(this).attr("type");
        var serialArray = $('#form-' + t).serializeArray();
        var iDict = array2dict(serialArray);
        if (iDict['id'] == '') {
            alert("You must add an ID");
            return;
        }
        if (usedIds.has(iDict['id'])) {
            alert("Already used id, please use another one");
            return;
        }
        usedIds.add(iDict['id']);
        if (t == "earning") {
            var iObj = new Earning(iDict['id'], iDict['color'],
                iDict['init'], iDict['rate'], iDict['incr'],
                iDict['ifreq'], iDict['start'], iDict['end'],
            );
        }
        if (t == "spending") {
            var iObj = new Spending(iDict['id'], iDict['color'],
                iDict['init'], iDict['rate'], iDict['incr'],
                iDict['ifreq'], iDict['start'], iDict['end'],
            );
        }
        if (t == "mortgage") {
            var iObj = new Mortgage(iDict['id'], iDict['color'],
                iDict['init'], iDict['total'], iDict['rate'],
                iDict['tax'], iDict['start'], iDict['years'],
            );
        }
        movements[t][iObj.id] = iObj;
        $('<div class="element">' + '<form id="form-' + iObj.id + '">' +
            $('#form-' + t).html() +
                '</form>' +
                '<div class="btn-create-container">' +
                    '<button class="btn-rm" type="' + t + '" obj="' + iObj.id + '">Remove</button>' +
                    '<button class="btn-up" type="' + t + '" obj="' + iObj.id + '" hidden>Update</button>' +
                '</div>' +
            '</div>'
        ).appendTo(".movements ." + t + "-container");
        form2form($('#form-' + t), $('.movements').find('#form-' + iDict['id']));
        $('#form-' + iDict['id'] + ' :input[name="id"]').prop("disabled", true);
        $('#form-' + iDict['id']).parent().css('background-color',  iObj.color);
        $('#form-' + t).trigger("reset");

        updateParamsURL();
        addObj2Chart(iObj);
    });

    $(".movements").on("click", ".btn-rm", function() {
        var objId = $(this).attr("obj");
        var t = $(this).attr("type");
        $(this).closest(".element").remove();
        var obj = movements[t][objId];
        removeChart(obj.id);
        delete movements[t][objId];
        usedIds.delete(objId);
        updateParamsURL();
        updateChart();
    });
    $(".movements").on("change input", "form :input", function() {
        $(this).closest(".element").find(".btn-up").show();
    });

    $(".movements").on("click", ".btn-up", function() {
        var t = $(this).attr("type");
        var objId = $(this).attr("obj");
        $('#form-' + objId + ' :input[name="id"]').prop("disabled", false);
        var iSerial = $('#form-' + objId).serialize();
        var iDict = array2dict($('#form-' + objId).serializeArray());
        $('#form-' + objId + ' :input[name="id"]').prop("disabled", true);
        if (t == "earning") {
            var iObj = new Earning(iDict['id'], iDict['color'],
                iDict['init'], iDict['rate'], iDict['incr'],
                iDict['ifreq'], iDict['start'], iDict['end'],
            );
        }
        if (t == "spending") {
            var iObj = new Spending(iDict['id'], iDict['color'],
                iDict['init'], iDict['rate'], iDict['incr'],
                iDict['ifreq'], iDict['start'], iDict['end'],
            );
        }
        if (t == "mortgage") {
            var iObj = new Mortgage(iDict['id'], iDict['color'],
                iDict['init'], iDict['total'], iDict['rate'],
                iDict['tax'], iDict['start'], iDict['years'],
            );
        }
        movements[t][iObj.id] = iObj;
        $('#form-' + iDict['id']).parent().css('background-color',  iObj.color);
        $('#form-' + iDict['id']).parent().find(".btn-up").hide();
        removeChart(iObj.id);
        updateParamsURL();
        addObj2Chart(iObj);
    });
});
