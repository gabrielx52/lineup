$(document).ready(function(){
    $("#left-graph-toggle").click(function() {
        graphSelect("left", leftChart)
    });
    $("#left-stats-toggle").click(function() {
        statsSelect("left")
    });
    $("#left-fg-graph").click(function() {
        makeTheGraph("left", "fg", leftChart)
    })
    $("#left-fg3-graph").click(function() {
        makeTheGraph("left", "fg3", leftChart)
    })

    $("#left-ft-graph").click(function() {
        makeTheGraph("left", "ft", leftChart)
    })


    $("#right-graph-toggle").click(function() {
        graphSelect("right", rightChart)
    });
    $("#right-stats-toggle").click(function() {
        statsSelect("right")
    });
    $("#right-fg-graph").click(function() {
        makeTheGraph("right", "fg", rightChart)
    })
    $("#right-fg3-graph").click(function() {
        makeTheGraph("right", "fg3", rightChart)
    })

    $("#right-ft-graph").click(function() {
        makeTheGraph("right", "ft", rightChart)
    })

});

$("#left-team-dash").on("click", "a.solo-stats", (function(event) {
    event.preventDefault()
    getPlayerStatsAjax($(this).data("player-id"), function(data) {
       
        $(".vert-card").removeClass("selected-player")
        $(event["target"]).parent().addClass("selected-player")
        $("#left-collapse-player-stats").collapse("show")

        makeThePlayerTable("left", data["career"][0])
        // console.log(data["career"][0])
    })
}))

$("#right-team-dash").on("click", "a.solo-stats", (function(event) {
    event.preventDefault()
    getPlayerStatsAjax($(this).data("player-id"), function(data) {
        $(".vert-card").removeClass("selected-playerR")
        $(event["target"]).parent().addClass("selected-playerR")
        $("#right-collapse-player-stats").collapse("show")

        makeThePlayerTable("right", data["career"][0])
        // console.log(data["career"][0])
    })

}))


let average = (array) => array.reduce((a, b) => a + b) / array.length;

let graphFields = {
    "left": {
     "fgLineupIDs": [],
     "ftLineupIDs": [],
     "fg3LineupIDs": [],

     "fgAttemptBorderColors": [],
     "fgAttemptFillColors": [],
     "fgAttempts": [],
     "fgMadeBorderColors": [],
     "fgMadeFillColors": [],
     "fgMade": [],
     "fgPercent": [],

     "ftAttemptBorderColors": [],
     "ftAttemptFillColors": [],
     "ftAttempts": [],
     "ftMadeBorderColors": [],
     "ftMadeFillColors": [],
     "ftMade": [],
     "ftPercent": [],

     "fg3AttemptBorderColors": [],
     "fg3AttemptFillColors": [],
     "fg3Attempts": [],
     "fg3MadeBorderColors": [],
     "fg3MadeFillColors": [],
     "fg3Made": [],
     "fg3Percent": []
    },
     "right": {
     "fgLineupIDs": [],
     "ftLineupIDs": [],
     "fg3LineupIDs": [],

     "fgAttemptBorderColors": [],
     "fgAttemptFillColors": [],
     "fgAttempts": [],
     "fgMadeBorderColors": [],
     "fgMadeFillColors": [],
     "fgMade": [],
     "fgPercent": [],

     "ftAttemptBorderColors": [],
     "ftAttemptFillColors": [],
     "ftAttempts": [],
     "ftMadeBorderColors": [],
     "ftMadeFillColors": [],
     "ftMade": [],
     "ftPercent": [],

     "fg3AttemptBorderColors": [],
     "fg3AttemptFillColors": [],
     "fg3Attempts": [],
     "fg3MadeBorderColors": [],
     "fg3MadeFillColors": [],
     "fg3Made": [],
     "fg3Percent": []
 }

}


function lineupVsTeamStatsAjax(teamID) {
// Get team vs team lineup data, called after team stats load.
    $.ajax({
        type: "POST",
        url: `/getLineupVsTeamData`,
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


function checkForCurrentLineupStats(teamLineup, teamID, side) {
// Check if current lineup has past stats.
    let lineups = JSON.parse(localStorage["lineups"])
    let allTeamLineups = lineups[teamID]
    let lineupKey = teamLineup["GROUP_KEY"]
    if(allTeamLineups[lineupKey]) {
        createDatasets(allTeamLineups, lineupKey, side)
        console.log(allTeamLineups[lineupKey])
    } else {
        createDatasets(allTeamLineups, lineupKey, side)
        console.log(`No data on selected lineup vs selected team.`)
    }
        
};



var scalingFactor = function(data) {
    return Math.round(data * 100);
};
var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};

// var configl = {
//     type: 'doughnut',
//     data: {
//         datasets: [{
//             label: "FGs",
//             data: [
//                 scalingFactor(1 - 0.436),
//                 scalingFactor(0.436),
//             ],
//                 backgroundColor: [
//                 "#FFEBAB",
//                 "#FFC300",
//             ],
//         }, {
//             label: "FG3s",
//             data: [
//                 scalingFactor(1 - 0.362),
//                 scalingFactor(0.362),
//             ],
//                 backgroundColor: [
//                 "#FEB7A8",
//                 "#FF5733",
//             ],
//         }, {
//             label: "FTs",
//             data: [
//                 scalingFactor(1 - 0.741),
//                 scalingFactor(0.741),
//             ],
//                 backgroundColor: [
//                 "#C898A6",
//                 "#C70039",
//             ],
//         }],
//         labels: [
//             "% Missed",
//             "% Made",
//         ]
//     },
//     options: {
//         responsive: true
//     }
// };
var ctxLP = document.getElementById("playerChart-left").getContext("2d");
var doughnutL = new Chart(ctxLP, {
    type: 'doughnut',
    data: {
        datasets: [{
            label: "FGs",
            data: [
                scalingFactor(1 - 0.436),
                scalingFactor(0.436),
            ],
                backgroundColor: [
                "#FFEBAB",
                "#FFC300",
            ],
        }, {
            label: "FG3s",
            data: [
                scalingFactor(1 - 0.362),
                scalingFactor(0.362),
            ],
                backgroundColor: [
                "#FEB7A8",
                "#FF5733",
            ],
        }, {
            label: "FTs",
            data: [
                scalingFactor(1 - 0.741),
                scalingFactor(0.741),
            ],
                backgroundColor: [
                "#C898A6",
                "#C70039",
            ],
        }],
        labels: [
            "% Missed",
            "% Made",
        ]
    },
    options: {
        responsive: true
    }
});


var ctxRP = document.getElementById("playerChart-right").getContext("2d");
var doughnutL = new Chart(ctxRP, {
    type: 'doughnut',
    data: {
        datasets: [{
            label: "FGs",
            data: [
                scalingFactor(1 - 0.436),
                scalingFactor(0.436),
            ],
                backgroundColor: [
                "#9AFFD0",
                "#00FF87",
            ],
        }, {
            label: "FG3s",
            data: [
                scalingFactor(1 - 0.362),
                scalingFactor(0.362),
            ],
                backgroundColor: [
                "#AAEDFF",
                "#33D4FF",
            ],
        }, {
            label: "FTs",
            data: [
                scalingFactor(1 - 0.741),
                scalingFactor(0.741),
            ],
                backgroundColor: [
                "#A2C8FF",
                "#0068FF",
            ],
        }],
        labels: [
            "% Missed",
            "% Made",
        ]
    },
    options: {
        responsive: true
    }
});




let ctxL = $("#myChart-left");
let leftChart = new Chart(ctxL, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'here',
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
            display: false,
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
        },
        legend: {
            
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItem, data) {
                    return lineupNames(data['labels'][tooltipItem[0]['index']], "nets_roster")
                    return data['labels'][tooltipItem[0]['index']]
                },
                beforeLabel: function(tooltipItem, data){
                  var dataset2 = data['datasets'][1];
                  var attempts = dataset2['data'][tooltipItem['index']]
                  return attempts + ' attempt(s)'
                },
                label: function(tooltipItem, data) {
                  var dataset1 = data['datasets'][0];
                  var made = dataset1['data'][tooltipItem['index']]
                  return  + made + ' made'

                },
                afterLabel: function(tooltipItem, data) {
                  var dataset1 = data['datasets'][0];
                  var dataset2 = data['datasets'][1];
                  var percent = Math.round((dataset1['data'][tooltipItem['index']] / dataset2['data'][tooltipItem['index']]) * 100)
                  return percent + '% ';
                }
            },
            backgroundColor: '#EFEFEF',
            titleFontSize: 12,
            titleFontColor: '#0066ff',
            bodyFontColor: '#000',
            bodyFontSize: 10,
            displayColors: false
            }
        }
    });


let ctxR = $("#myChart-right");
let rightChart = new Chart(ctxR, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'here',
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
            display: false,
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
        },
        legend: {
            
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItem, data) {
                    return lineupNames(data['labels'][tooltipItem[0]['index']], "opp_roster")
                    return data['labels'][tooltipItem[0]['index']]
                },
                beforeLabel: function(tooltipItem, data){
                  var dataset2 = data['datasets'][1];
                  var attempts = dataset2['data'][tooltipItem['index']]
                  return attempts + ' attempt(s)'
                },
                label: function(tooltipItem, data) {
                  var dataset1 = data['datasets'][0];
                  var made = dataset1['data'][tooltipItem['index']]
                  return  + made + ' made'

                },
                afterLabel: function(tooltipItem, data) {
                  var dataset1 = data['datasets'][0];
                  var dataset2 = data['datasets'][1];
                  var percent = Math.round((dataset1['data'][tooltipItem['index']] / dataset2['data'][tooltipItem['index']]) * 100)
                  return percent + '% ';
                }
            },
            backgroundColor: '#EFEFEF',
            titleFontSize: 12,
            titleFontColor: '#0066ff',
            bodyFontColor: '#000',
            bodyFontSize: 10,
            displayColors: false
            }
        }
    });


function lineupNames(lineupIDs, roster) {
    let theRoster = JSON.parse(localStorage[roster])
    let nameArray = []
    for(var id in lineupIDs) {
        for(var playerObj in theRoster) {
            if(lineupIDs[id] == theRoster[playerObj]["PLAYER_ID"]) {
                nameArray.push(theRoster[playerObj]["PLAYER"])
            }
        }
    }
    return nameArray
}


function createDatasets(lineups, lineupKey, side) {
    // Sorting the JSON to find the indx of the match
    // Then creating the datasets and colors for the graph to render
    $.each(graphFields[side],function(key, value) {graphFields[side][key] = []})
    for(var lineup in lineups){
        if(lineup == lineupKey) {
            if(lineups[lineup]["FGA"] != 0){
            graphFields[side]["fgLineupIDs"].push(lineups[lineup]["GROUP_ID"])
            graphFields[side]["fgAttemptFillColors"].push("rgba(255, 159, 64, 1)")
            graphFields[side]["fgAttemptBorderColors"].push("rgba(255, 159, 64, 1)")
            graphFields[side]["fgMadeFillColors"].push("rgba(255, 99, 132, 1)")
            graphFields[side]["fgMadeBorderColors"].push("rgba(255, 99, 132, 1)")
            graphFields[side]["fgAttempts"].push(lineups[lineup]["FGA"])
            graphFields[side]["fgMade"].push(lineups[lineup]["FGM"])
            graphFields[side]["fgPercent"].push(lineups[lineup]["FG_PCT"])
            } 
            if(lineups[lineup]["FTA"] != 0){
            graphFields[side]["ftLineupIDs"].push(lineups[lineup]["GROUP_ID"])
            graphFields[side]["ftAttemptFillColors"].push("rgba(255, 159, 64, 1)")
            graphFields[side]["ftAttemptBorderColors"].push("rgba(255, 159, 64, 1)")
            graphFields[side]["ftMadeFillColors"].push("rgba(255, 99, 132, 1)")
            graphFields[side]["ftMadeBorderColors"].push("rgba(255, 99, 132, 1)")
            graphFields[side]["ftAttempts"].push(lineups[lineup]["FTA"])
            graphFields[side]["ftMade"].push(lineups[lineup]["FTM"])
            graphFields[side]["ftPercent"].push(lineups[lineup]["FT_PCT"])
            }  
            if(lineups[lineup]["FT3A"] != 0){  
            graphFields[side]["fg3LineupIDs"].push(lineups[lineup]["GROUP_ID"]) 
            graphFields[side]["fg3AttemptFillColors"].push("rgba(255, 159, 64, 1)")
            graphFields[side]["fg3AttemptBorderColors"].push("rgba(255, 159, 64, 1)")
            graphFields[side]["fg3MadeFillColors"].push("rgba(255, 99, 132, 1)")
            graphFields[side]["fg3MadeBorderColors"].push("rgba(255, 99, 132, 1)")
            graphFields[side]["fg3Attempts"].push(lineups[lineup]["FG3A"])
            graphFields[side]["fg3Made"].push(lineups[lineup]["FG3M"])
            graphFields[side]["fg3Percent"].push(lineups[lineup]["FG3_PCT"])
            }
        } else {
            if(lineups[lineup]["FGA"] != 0){
            graphFields[side]["fgLineupIDs"].push(lineups[lineup]["GROUP_ID"])
            graphFields[side]["fgAttemptFillColors"].push("rgba(192, 192, 192, 1)")
            graphFields[side]["fgAttemptBorderColors"].push("rgba(192, 192, 192, 1)")
            graphFields[side]["fgMadeFillColors"].push("rgba(0, 0, 0, 1)")
            graphFields[side]["fgMadeBorderColors"].push("rgba(0, 0, 0, 1)")
            graphFields[side]["fgAttempts"].push(lineups[lineup]["FGA"])
            graphFields[side]["fgMade"].push(lineups[lineup]["FGM"])
            graphFields[side]["fgPercent"].push(lineups[lineup]["FG_PCT"])
            }
            if(lineups[lineup]["FTA"] != 0){
            graphFields[side]["ftLineupIDs"].push(lineups[lineup]["GROUP_ID"])
            graphFields[side]["ftAttemptFillColors"].push("rgba(192, 192, 192, 1)")
            graphFields[side]["ftAttemptBorderColors"].push("rgba(192, 192, 192, 1)")
            graphFields[side]["ftMadeFillColors"].push("rgba(0, 0, 0, 1)")
            graphFields[side]["ftMadeBorderColors"].push("rgba(0, 0, 0, 1)")
            graphFields[side]["ftAttempts"].push(lineups[lineup]["FTA"])
            graphFields[side]["ftMade"].push(lineups[lineup]["FTM"])
            graphFields[side]["ftPercent"].push(lineups[lineup]["FT_PCT"])
            }
            if(lineups[lineup]["FG3A"] != 0){
            graphFields[side]["fg3LineupIDs"].push(lineups[lineup]["GROUP_ID"])
            graphFields[side]["fg3AttemptFillColors"].push("rgba(192, 192, 192, 1)")
            graphFields[side]["fg3AttemptBorderColors"].push("rgba(192, 192, 192, 1)")
            graphFields[side]["fg3MadeFillColors"].push("rgba(0, 0, 0, 1)")
            graphFields[side]["fg3MadeBorderColors"].push("rgba(0, 0, 0, 1)")
            graphFields[side]["fg3Attempts"].push(lineups[lineup]["FG3A"])
            graphFields[side]["fg3Made"].push(lineups[lineup]["FG3M"])
            graphFields[side]["fg3Percent"].push(lineups[lineup]["FG3_PCT"])
            }
        } 
    }
}


function removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets.forEach((dataset) => {
        dataset.data =[];
    });
    chart.update();
}


function makeTheGraph(side, stat, chart) {
    removeData(chart)
    $(`#${side}-ft-graph`).removeAttr("disabled")
    $(`#${side}-fg-graph`).removeAttr("disabled")
    $(`#${side}-fg3-graph`).removeAttr("disabled")
    $(`#${side}-${stat}-graph`).attr("disabled", "disabled");        
    chart.data.labels = graphFields[side][ stat + "LineupIDs"]
    chart.data.datasets[0].label =  stat.toUpperCase() + " made"
    chart.data.datasets[0].data = graphFields[side][ stat + "Made"]
    chart.data.datasets[0].backgroundColor = graphFields[side][ stat + "MadeFillColors"]
    chart.data.datasets[0].borderColor = graphFields[side][ stat + "MadeBorderColors"]
    chart.data.datasets[1].label =  stat.toUpperCase() + " attempts"
    chart.data.datasets[1].data = graphFields[side][ stat + "Attempts"]
    chart.data.datasets[1].backgroundColor = graphFields[side][ stat + "AttemptFillColors"]
    chart.data.datasets[1].borderColor = graphFields[side][ stat + "AttemptBorderColors"]
    chart.options.annotation.annotations[0].value = average(graphFields[side][ stat + "Attempts"])
    chart.options.annotation.annotations[1].value = average(graphFields[side][ stat + "Made"])
    chart.update()

}


function makeThePlayerTable(side, stats) {
    $(`#${side}-player-gp`).text(`${stats["GP"]}`)
    $(`#${side}-player-min`).text(`${stats["MIN"].toFixed(1)}`)
    $(`#${side}-player-pts`).text(`${stats["PTS"].toFixed(1)}`)
    $(`#${side}-player-fgm`).text(`${stats["FGM"]}`)
    $(`#${side}-player-fga`).text(`${stats["FGA"]}`)
    $(`#${side}-player-fgpct`).text(`${(stats["FG_PCT"] * 100).toFixed(1)}`)
    $(`#${side}-player-3pm`).text(`${stats["FG3M"]}`)
    $(`#${side}-player-3pa`).text(`${stats["FG3A"]}`)
    $(`#${side}-player-3ppct`).text(`${(stats["FG3_PCT"] * 100).toFixed(1)}`)
    $(`#${side}-player-ftpm`).text(`${stats["FTM"]}`)
    $(`#${side}-player-ftpa`).text(`${stats["FTA"]}`)
    $(`#${side}-player-ftpct`).text(`${(stats["FT_PCT"] * 100).toFixed(1)}`)
    $(`#${side}-player-oreb`).text(`${stats["OREB"]}`)
    $(`#${side}-player-dreb`).text(`${stats["DREB"]}`)
    $(`#${side}-player-reb`).text(`${stats["REB"]}`)
    $(`#${side}-player-ast`).text(`${stats["AST"]}`)
    $(`#${side}-player-tov`).text(`${stats["TOV"]}`)
    $(`#${side}-player-stl`).text(`${stats["STL"]}`)
    $(`#${side}-player-blk`).text(`${stats["BLK"]}`)
    $(`#${side}-player-pf`).text(`${stats["PF"]}`)
}

function makeThePlayerGraph(side, stat, chart) {
    removeData(chart)
  
    chart.data.labels = graphFields[side][ stat + "LineupIDs"]
    chart.data.datasets[0].label =  stat.toUpperCase() + " made"
    chart.data.datasets[0].data = graphFields[side][ stat + "Made"]
    chart.data.datasets[0].backgroundColor = graphFields[side][ stat + "MadeFillColors"]
    chart.data.datasets[0].borderColor = graphFields[side][ stat + "MadeBorderColors"]
    chart.data.datasets[1].label =  stat.toUpperCase() + " attempts"
    chart.data.datasets[1].data = graphFields[side][ stat + "Attempts"]
    chart.data.datasets[1].backgroundColor = graphFields[side][ stat + "AttemptFillColors"]
    chart.data.datasets[1].borderColor = graphFields[side][ stat + "AttemptBorderColors"]
    chart.options.annotation.annotations[0].value = average(graphFields[side][ stat + "Attempts"])
    chart.options.annotation.annotations[1].value = average(graphFields[side][ stat + "Made"])
    chart.update()

}



function graphSelect(side, chart) { 
    $(`#${side}-collapse-graph`).collapse("toggle");
    $(`#${side}-collapse-stats`).collapse("toggle");

    $(`#${side}-graph-toggle`).attr("disabled", "disabled");        
    $(`#${side}-stats-toggle`).removeAttr("disabled")
    makeTheGraph(`${side}`, "fg", chart)
}


function statsSelect(side){
    $(`#${side}-collapse-stats`).collapse("toggle");
    $(`#${side}-collapse-graph`).collapse("toggle");

    $(`#${side}-stats-toggle`).attr("disabled", "disabled");        
    $(`#${side}-graph-toggle`).removeAttr("disabled")
}


function getPlayerStatsAjax(playerID, callback) {
// Get players stats via ajax call
    $.ajax({
        type: "POST",
        url: "/playerStats",
        dataType: "json",
        data: {"playerID": JSON.stringify(playerID)},
        success: function(response) {
            let playerStats = response["player_stats"]
            callback(playerStats)
        },
        error: function(error) {
            console.log(error)
        }
    })  
}