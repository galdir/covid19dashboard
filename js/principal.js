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

function getMediaMovel(dados,bins){
    var mm=[];
    
    for (i = bins; i < dados.length; i++) {
        sum=0;
        for(k=i-bins;k<i;k++){
            sum+=dados[k];
        }
        mm[i]=sum/bins;

    }

    return mm;

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
casesPE = getDataByState(casesBrStates, "PE");
casesPB = getDataByState(casesBrStates, "PB");
casesAM = getDataByState(casesBrStates, "AM");
casesRS = getDataByState(casesBrStates, "RS");
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

mmCasesRate=getMediaMovel(getCasesRate(casesBa),5)
var trace1 = {
    x: getDates(casesBa),
    y: getCasesRate(casesBa),
    type: 'bar',
    name: 'Crescimento por dia (%)'
};

var trace2 = {
    x: getDates(casesBa),
    y: mmCasesRate,
    type: 'scatter',
    name: 'Media Movel de 5 dias'
};

var data = [trace1,trace2];
var layout = {
    title: 'Taxa de Crescimento por Dia: BA',
    showlegend: true,
    legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      },
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


mmDeathsRate=getMediaMovel(getDeathRates(casesBa),5)
var trace1 = {
    x: getDates(casesBa),
    y: getDeathRates(casesBa),
    type: 'bar',
    name: "Crescimento por dia (%)"
};
var trace2 = {
    x: getDates(casesBa),
    y: mmDeathsRate,
    type: 'scatter',
    name: 'Media Movel de 5 dias'
};

var data = [trace1,trace2];
var layout = {
    title: 'Taxa de Crescimento de Mortes por Dia: BA',
    showlegend: true,
    legend: {
        x: 1,
        xanchor: 'right',
        y: 1
      },
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

var trace1 = {
    x: getDates(casesBa),
    y: getCasesRate(casesBa),
    type: 'bar',
    name: 'BA'
};


var trace2 = {
    x: getDates(casesSP),
    y: getCasesRate(casesSP),
    type: 'bar',
    name: 'SP'
};
var trace3 = {
    x: getDates(casesRJ),
    y: getCasesRate(casesRJ),
    type: 'bar',
    name: 'RJ'
};
var trace4 = {
    x: getDates(casesMG),
    y: getCasesRate(casesMG),
    type: 'bar',
    name: 'MG'
};

//qtdDatas=getDates(casesBa).length;


var data = [trace1, trace2, trace3, trace4];
var layout = {
    title: 'Taxa de Crescimento Novos Casos por Dia ',
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



var trace1 = {
    x: getDates(casesBa),
    y: getMediaMovel(getDeathRates(casesBa),5),
    type: 'scatter',
    name: 'BA'
};

var trace2 = {
    x: getDates(casesSP),
    y: getMediaMovel(getDeathRates(casesSP),5),
    type: 'scatter',
    name: 'SP'
};
var trace3 = {
    x: getDates(casesRJ),
    y: getMediaMovel(getDeathRates(casesRJ),5),
    type: 'scatter',
    name: 'RJ'
};
var trace4 = {
    x: getDates(casesMG),
    y: getMediaMovel(getDeathRates(casesMG),5),
    type: 'scatter',
    name: 'MG'
};

casesRO = getDataByState(casesBrStates, "RO");
casesRR = getDataByState(casesBrStates, "RR");
casesAP = getDataByState(casesBrStates, "AP");
casesDF = getDataByState(casesBrStates, "DF");

var trace5 = {
    x: getDates(casesPE),
    y: getMediaMovel(getDeathRates(casesPE),5),
    type: 'scatter',
    name: 'PE'
};
var trace6 = {
    x: getDates(casesPB),
    y: getMediaMovel(getDeathRates(casesPB),5),
    type: 'scatter',
    name: 'PB'
};
var trace7 = {
    x: getDates(casesAM),
    y: getMediaMovel(getDeathRates(casesAM),5),
    type: 'scatter',
    name: 'AM'
};
var trace8 = {
    x: getDates(casesRS),
    y: getMediaMovel(getDeathRates(casesRS),5),
    type: 'scatter',
    name: 'RS'
};
var trace9 = {
    x: getDates(casesRO),
    y: getMediaMovel(getDeathRates(casesRO),5),
    type: 'scatter',
    name: 'RO'
};
var trace10 = {
    x: getDates(casesRR),
    y: getMediaMovel(getDeathRates(casesRR),5),
    type: 'scatter',
    name: 'RR'
};
var trace11 = {
    x: getDates(casesAP),
    y: getMediaMovel(getDeathRates(casesAP),5),
    type: 'scatter',
    name: 'AP'
};
var trace12 = {
    x: getDates(casesDF),
    y: getMediaMovel(getDeathRates(casesDF),5),
    type: 'scatter',
    name: 'DF'
};



var data = [trace1, trace2, trace3, trace4,trace5,trace6,trace7,trace8,trace9,trace10,trace11,trace12];
var layout = {
    title: 'Media Movel de 5 dias da Taxa de crescimento de Novos Casos',
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

Plotly.newPlot('casesMMRateStateCompare', data, layout, {
    scrollZoom: true
});

