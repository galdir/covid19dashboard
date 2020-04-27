//date,country,state,city,newDeaths,deaths,newCases,totalCases,deathsMS,totalCasesMS
var alltext = [];
var file = "https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-states.csv";
console.log(file)
var rawFile = new XMLHttpRequest();
rawFile.open("GET", file, false);
rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
        if (rawFile.status === 200 || rawFile.status === 0) {
            allText = rawFile.responseText;
            //console.log(allText);
        }
    }
}
rawFile.send(null);



function csvJSON(csv) {

    var lines = csv.split("\n");
    var result = [];

    var headers = lines[0].split(",");
    console.log(headers);
    console.log(lines.length);

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        //console.log(obj)

        result.push(obj);

    }

    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
}

//var teste = csvJSON("cases-brazil-states.csv")
//console.log(teste);

//var casesBrStates = <?php echo json_encode($casesBrStates) ?>;
//var casesBrStates = json_encode(allText);
var casesBrStates = csvJSON(allText);
//console.log(casesBrStates);

function getDataByState(casesBr, stateStr) {
    var casesState = [];
    cont = 0;
    for (l in casesBr) {
        //console.log(l)

        if (casesBr[l].state == stateStr) {
            cont++
            casesState.push(casesBr[l]);

        }

    }
    return casesState;
}

function getDates(cases) {
    var dates = [];
    cont = 0;
    for (l in cases) {
        dates[l] = cases[l].date
    }
    return dates;

}

function getNewDeaths(cases) {
    var newDeaths = [];
    cont = 0;
    for (l in cases) {
        newDeaths[l] = cases[l].newDeaths
    }
    return newDeaths;

}

function getDeaths(cases) {
    var deaths = [];
    cont = 0;
    for (l in cases) {
        deaths[l] = cases[l].deaths
    }
    return deaths;

}

function getCases(cases) {
    var casestot = [];
    cont = 0;
    for (l in cases) {
        casestot[l] = cases[l].totalCases;
    }
    return casestot;

}

function getDataCol(cases, c) {
    var dados = [];
    cont = 0;
    for (l in cases) {
        dados[l] = cases[l][c]
    }
    return dados;
}

function getDeathRates(cases) {
    var deaths = getDeaths(cases);
    deathRate = [];
    cont = 0;
    for (i = 2; i < deaths.length; i++) {
        deathRate[i] = ((deaths[i] / deaths[i - 1]) - 1) * 100;
    }

    return deathRate;

}


function getCasesRate(cases) {
    var casestot = getCases(cases);
    casesRate = [];
    cont = 0;
    for (i = 2; i < casestot.length; i++) {
        casesRate[i] = ((casestot[i] / casestot[i - 1]) - 1) * 100;
    }

    return casesRate;

}

//casesBrStates.forEach(getDataByState);
//casesBA = casesBrStates;

/*
TESTER = document.getElementById('tester');
Plotly.newPlot(TESTER, [{
    x: [1, 2, 3, 4, 5],
    y: [1, 2, 4, 8, 16]
}], {
    margin: {
        t: 0
    }
});
*/


var today = new Date();
var todaydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
var mespassado = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate();

casesBa = getDataByState(casesBrStates, "BA");
casesSP = getDataByState(casesBrStates, "SP");
casesRJ = getDataByState(casesBrStates, "RJ");
casesMG = getDataByState(casesBrStates, "MG");
//console.log(casesBa)



//divCasesState = document.getElementById('casesState');

//console.log(getDeaths(casesBa))


maxCases=casesBa[casesBa.length-1].totalCases;
/*
var trace1 = {
    x: getDates(casesBa),
    y: getCases(casesBa),
    type: 'scatter'
};

var trace2 = {
    x: getDates(casesBa),
    y: getCasesRate(casesBa),
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'bar',
};

var data = [trace1,trace2];
var layout = {
    title: 'Casos: BA',
    showlegend: false,
    grid: {rows: 1, columns: 2, pattern: 'independent'},
    xaxis: {
        title: 'Data',
        //range: [qtdDatas-30, qtdDatas]  // to set the xaxis range to 0 to 1
        
    },
    yaxis: {
        title: 'Casos',
        range:[0,maxCases]
    },
    xaxis2: {
        title: 'Data',
        range: [mespassado, todaydate]
        //range: [qtdDatas-30, qtdDatas]  // to set the xaxis range to 0 to 1
    },
    yaxis2: {
        title: 'Crescimento ao dia (%)',
        range: [0, 50]
    }
};

Plotly.newPlot('casesState', data, layout);
*/
var trace1 = {
    x: getDates(casesBa),
    y: getCases(casesBa),
    type: 'scatter'
};

var data = [trace1];
var layout = {
    title: 'Casos Totais: BA',
    showlegend: false,
    xaxis: {
        title: 'Data',        
    },
    yaxis: {
        title: 'Casos',
        range:[0,maxCases]
    },
};

Plotly.newPlot('casesTotState', data, layout);

var trace1 = {
    x: getDates(casesBa),
    y: getCasesRate(casesBa),
    type: 'bar'
};

var data = [trace1];
var layout = {
    title: 'Taxa de Crescimento por Dia: BA',
    showlegend: false,
    xaxis: {
        title: 'Data',    
        range: [mespassado, todaydate]    
    },
    yaxis: {
        title: 'Taxa (%)',
        range: [0, 50]
    },
};

Plotly.newPlot('casesRateState', data, layout);


divDeathsState = document.getElementById('deathsState');

//console.log(getDeaths(casesBa))
maxDeaths=casesBa[casesBa.length-1].deaths;
/*
var trace1 = {
    x: getDates(casesBa),
    y: getDeaths(casesBa),
    type: 'scatter'
};
var trace2 = {
    x: getDates(casesBa),
    y: getDeathRates(casesBa),
    type: 'bar',
    xaxis: 'x2',
    yaxis: 'y2',
};

var data = [trace1,trace2];
var layout = {
    title: 'Mortes: BA',
    showlegend: false,
    grid: {rows: 1, columns: 2, pattern: 'independent'},
    xaxis: {
        title: 'Data',    
    },
    yaxis: {
        title: 'Mortes',
        range:[0,maxDeaths]
    },
    xaxis2: {
        title: 'Data',
        range: [mespassado, todaydate]
    },
    yaxis2: {
        title: 'Taxa de crescimento por dia (%)',
        range: [0, 50]
    }
};

Plotly.newPlot(divDeathsState, data, layout, {
    scrollZoom: true
});
*/

var trace1 = {
    x: getDates(casesBa),
    y: getDeaths(casesBa),
    type: 'scatter'
};

var data = [trace1];
var layout = {
    title: 'Mortes Totais: BA',
    showlegend: false,
    xaxis: {
        title: 'Data',    
    },
    yaxis: {
        title: 'Mortes',
        range:[0,maxDeaths]
    },
};

Plotly.newPlot(deathsTotState, data, layout, {
    scrollZoom: true
});

var trace1 = {
    x: getDates(casesBa),
    y: getDeathRates(casesBa),
    type: 'bar'
};

var data = [trace1];
var layout = {
    title: 'Taxa de Crescimento de Mortes por Dia: BA',
    showlegend: false,
    xaxis: {
        title: 'Data',    
        range: [mespassado, todaydate]
    },
    yaxis: {
        title: 'Taxa (%)',
        range: [0, 50]
    },
};

Plotly.newPlot(deathsRateState, data, layout, {
    scrollZoom: true
});



//casesRateStateCompare
//divCasesRateStateCompare = document.getElementById('casesRateStateCompare');

//console.log(getDeaths(casesBa))

var ba = {
    x: getDates(casesBa),
    y: getCasesRate(casesBa),
    type: 'line',
    name: 'BA'
};


var sp = {
    x: getDates(casesSP),
    y: getCasesRate(casesSP),
    type: 'line',
    name: 'SP'
};
var rj = {
    x: getDates(casesRJ),
    y: getCasesRate(casesRJ),
    type: 'line',
    name: 'RJ'
};
var mg = {
    x: getDates(casesMG),
    y: getCasesRate(casesMG),
    type: 'line',
    name: 'MG'
};

//qtdDatas=getDates(casesBa).length;


var data = [ba, sp, rj, mg];
var layout = {
    title: 'Taxa de crescimento por dia em alguns estados',
    showlegend: true,
    xaxis: {
        title: 'Data',
        range: [mespassado, todaydate]
        //range: [qtdDatas-30, qtdDatas]  // to set the xaxis range to 0 to 1
    },
    yaxis: {
        title: 'Taxa (%)',
        range: [0, 50]
    }
};

Plotly.newPlot('casesRateStateCompare', data, layout, {
    scrollZoom: true
});

/*
Plotly.newPlot(divCasesState, [{
    x: getDates(casesBa),
    y: getDataCol(casesBa, 5)
}], {
    title: 'Total Deaths: BA',
    margin: {
        t: 0
    }
});
*/