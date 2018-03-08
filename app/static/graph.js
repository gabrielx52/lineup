$(document).ready(function(){
    $("#left-graph-toggle").click(function() {
        $("#left-collapse-graph").collapse("toggle");
    });
    $("#left-stats-toggle").click(function() {
        $("#left-collapse-stats").collapse("toggle");
    });
});

let average = (array) => array.reduce((a, b) => a + b) / array.length;

let fgAttemptBorderColors = []
let fgAttemptFillColors = []
let fgAttempts = []
let fgMadeBorderColors = []
let fgMadeFillColors = []
let fgMade = []
let fgPercent = []

let ftAttemptBorderColors = []
let ftAttemptFillColors = []
let ftAttempts = []
let ftMadeBorderColors = []
let ftMadeFillColors = []
let ftMade = []
let ftPercent = []

let fg3AttemptBorderColors = []
let fg3AttemptFillColors = []
let fg3Attempts = []
let fg3MadeBorderColors = []
let fg3MadeFillColors = []
let fg3Made = []
let fg3Percent = []

function lineupVsTeamStatsAjax(teamID) {
// Get team vs team lineup data, called after team stats load.
    $.ajax({
        type: "POST",
        url: "/getLineupVsTeamData",
        dataType: 'json',
        data: {"teamID": JSON.stringify(teamID)},
        success: function(response) {
            let lineups = response["lineups"]
            console.log(lineups)
            localStorage.setItem("lineups", JSON.stringify(lineups));
        },
        error: function(error) {
            console.log(error)
        }
    })
};


function checkForCurrentLineupStats(teamLineup, teamID) {
// Check if current lineup has past stats.
    let lineups = JSON.parse(localStorage["lineups"])
    let allTeamLineups = lineups[teamID]
    let lineupKey = teamLineup["GROUP_KEY"]
    if(allTeamLineups[lineupKey]) {
        createDatasets(allTeamLineups, lineupKey)
        console.log(allTeamLineups[lineupKey])
    } else {
        console.log(`No data on selected lineup vs selected team.`)
    }
        
};





let ctx = $("#myChart-left");
let leftChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 2
          },
          {
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 2
          },
        ]
    },
    options: {
        scales: {
          yAxes: [{
            stacked: false,
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }]

        },
      annotation: {
            annotations: [{
                drawTime: 'afterDraw',
                type: 'line',
                borderDash: [8, 4],
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: null,
                borderColor: '#ffc107',
                borderWidth: 2,
                label: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    enabled: true,
                    content: 'Avg attempts',
                    position: "right",
                    fontColor: "rgb(0,0,0)",
                    xPadding: null,
                }
            },
            {
                drawTime: 'afterDraw',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: null,
                borderColor: '#ffc107',
                borderWidth: 2,
                label: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    enabled: true,
                    content: 'Avg made',
                    position: "right",
                    fontColor: "rgb(0,0,0)",
                    xPadding: null,
                }
            }]
        }
      }
    });


function createDatasets(lineups, lineupKey) {
    // Sorting the JSON to find the indx of the match
    // Then creating the datasets and colors for the graph to render
    fgAttemptBorderColors = []
    fgAttemptFillColors = []
    fgAttempts = []
    fgMadeBorderColors = []
    fgMadeFillColors = []
    fgMade = []
    fgPercent = []

    ftAttemptBorderColors = []
    ftAttemptFillColors = []
    ftAttempts = []
    ftMadeBorderColors = []
    ftMadeFillColors = []
    ftMade = []
    ftPercent = []

    fg3AttemptBorderColors = []
    fg3AttemptFillColors = []
    fg3Attempts = []
    fg3MadeBorderColors = []
    fg3MadeFillColors = []
    fg3Made = []
    fg3Percent = []
    for(var lineup in lineups){
        if(lineup == lineupKey) {
            if(lineups[lineup]["FGA"] != 0){
            fgAttemptFillColors.push("rgba(255, 159, 64, 0.2)")
            fgAttemptBorderColors.push("rgba(255, 159, 64, 1)")
            fgMadeFillColors.push("rgba(255, 99, 132, 0.2)")
            fgMadeBorderColors.push("rgba(255, 99, 132, 1)")
            fgAttempts.push(lineups[lineup]["FGA"])
            fgMade.push(lineups[lineup]["FGM"])
            fgPercent.push(lineups[lineup]["FG_PCT"])
            } 
            if(lineups[lineup]["FTA"] != 0){
            ftAttemptFillColors.push("rgba(255, 159, 64, 0.2)")
            ftAttemptBorderColors.push("rgba(255, 159, 64, 1)")
            ftMadeFillColors.push("rgba(255, 99, 132, 0.2)")
            ftMadeBorderColors.push("rgba(255, 99, 132, 1)")
            ftAttempts.push(lineups[lineup]["FTA"])
            ftMade.push(lineups[lineup]["FTM"])
            ftPercent.push(lineups[lineup]["FT_PCT"])
            }  
            if(lineups[lineup]["FT3A"] != 0){   
            fg3AttemptFillColors.push("rgba(255, 159, 64, 0.2)")
            fg3AttemptBorderColors.push("rgba(255, 159, 64, 1)")
            fg3MadeFillColors.push("rgba(255, 99, 132, 0.2)")
            fg3MadeBorderColors.push("rgba(255, 99, 132, 1)")
            fg3Attempts.push(lineups[lineup]["FG3A"])
            fg3Made.push(lineups[lineup]["FG3M"])
            fg3Percent.push(lineups[lineup]["FG3_PCT"])
            }
        } else {
            if(lineups[lineup]["FGA"] != 0){
            fgAttemptFillColors.push("rgba(192, 192, 192, 0.2)")
            fgAttemptBorderColors.push("rgba(192, 192, 192, 1)")
            fgMadeFillColors.push("rgba(0, 0, 0, 0.2)")
            fgMadeBorderColors.push("rgba(0, 0, 0, 1)")
            fgAttempts.push(lineups[lineup]["FGA"])
            fgMade.push(lineups[lineup]["FGM"])
            fgPercent.push(lineups[lineup]["FG_PCT"])
            }
            if(lineups[lineup]["FTA"] != 0){
            ftAttemptFillColors.push("rgba(192, 192, 192, 0.2)")
            ftAttemptBorderColors.push("rgba(192, 192, 192, 1)")
            ftMadeFillColors.push("rgba(0, 0, 0, 0.2)")
            ftMadeBorderColors.push("rgba(0, 0, 0, 1)")
            ftAttempts.push(lineups[lineup]["FTA"])
            ftMade.push(lineups[lineup]["FTM"])
            ftPercent.push(lineups[lineup]["FT_PCT"])
            }
            if(lineups[lineup]["FG3A"] != 0){
            fg3AttemptFillColors.push("rgba(192, 192, 192, 0.2)")
            fg3AttemptBorderColors.push("rgba(192, 192, 192, 1)")
            fg3MadeFillColors.push("rgba(0, 0, 0, 0.2)")
            fg3MadeBorderColors.push("rgba(0, 0, 0, 1)")
            fg3Attempts.push(lineups[lineup]["FG3A"])
            fg3Made.push(lineups[lineup]["FG3M"])
            fg3Percent.push(lineups[lineup]["FG3_PCT"])
            }
        } 
    }
}


function makeTheFTGraph() {
    removeData(leftChart)
    leftChart.data.labels = Array.apply(null, { length: ftMade.length })
    leftChart.data.datasets[0].label = "FT made"
    leftChart.data.datasets[0].data = ftMade
    leftChart.data.datasets[0].backgroundColor = ftMadeFillColors
    leftChart.data.datasets[0].borderColor = ftMadeBorderColors
    leftChart.data.datasets[1].label = "FT attempts"
    leftChart.data.datasets[1].data = ftAttempts
    leftChart.data.datasets[1].backgroundColor = ftAttemptFillColors
    leftChart.data.datasets[1].borderColor = ftAttemptBorderColors
    leftChart.options.annotation.annotations[0].value = average(ftAttempts)
    leftChart.options.annotation.annotations[1].value = average(ftMade)
    leftChart.update()

}

function makeTheFGGraph() {
    removeData(leftChart)
    leftChart.data.labels = Array.apply(null, { length: fgMade.length })
    leftChart.data.datasets[0].label = "FG made"
    leftChart.data.datasets[0].data = fgMade
    leftChart.data.datasets[0].backgroundColor = fgMadeFillColors
    leftChart.data.datasets[0].borderColor = fgMadeBorderColors
    leftChart.data.datasets[1].label = "FG attempts"
    leftChart.data.datasets[1].data = fgAttempts
    leftChart.data.datasets[1].backgroundColor = fgAttemptFillColors
    leftChart.data.datasets[1].borderColor = fgAttemptBorderColors
    leftChart.options.annotation.annotations[0].value = average(fgAttempts)
    leftChart.options.annotation.annotations[1].value = average(fgMade)
    leftChart.update()

}


function makeTheFG3Graph() {
    removeData(leftChart)
    leftChart.data.labels = Array.apply(null, { length: fg3Made.length })
    leftChart.data.datasets[0].label = "FG3 made"
    leftChart.data.datasets[0].data = fg3Made
    leftChart.data.datasets[0].backgroundColor = fg3MadeFillColors
    leftChart.data.datasets[0].borderColor = fg3MadeBorderColors
    leftChart.data.datasets[1].label = "FG3 attempts"
    leftChart.data.datasets[1].data = fg3Attempts
    leftChart.data.datasets[1].backgroundColor = fg3AttemptFillColors
    leftChart.data.datasets[1].borderColor = fg3AttemptBorderColors
    leftChart.options.annotation.annotations[0].value = average(fg3Attempts)
    leftChart.options.annotation.annotations[1].value = average(fg3Made)
    leftChart.update()

}


function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}