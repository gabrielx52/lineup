$(document).ready(function(){
    $("#left-graph-toggle").click(function() {
        $("#left-collapse-graph").collapse("toggle");
    });
    $("#left-stats-toggle").click(function() {
        $("#left-collapse-stats").collapse("toggle");
    });
});


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
          }
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

        }
      }
    });


function createDatasets(lineups, lineupKey) {
    // Sorting the JSON to find the indx of the match
    // Then creating the datasets and colors for the graph to render
    let attemptBorderColors = []
    let attemptFillColors = []
    let attempts = []
    let madeBorderColors = []
    let madeFillColors = []
    let made = []
    let percent = []
    for(var lineup in lineups){
        if(lineup == lineupKey) {
            attemptFillColors.push("rgba(255, 159, 64, 0.2)")
            attemptBorderColors.push("rgba(255, 159, 64, 1)")
            madeFillColors.push("rgba(255, 99, 132, 0.2)")
            madeBorderColors.push("rgba(255, 99, 132, 1)")
            attempts.push(lineups[lineup]["FGA"])
            made.push(lineups[lineup]["FGM"])
            percent.push(lineups[lineup]["FG_PCT"])
            console.log("We've got a match.")
        } else {
            attemptFillColors.push("rgba(192, 192, 192, 0.2)")
            attemptBorderColors.push("rgba(192, 192, 192, 1)")
            madeFillColors.push("rgba(0, 0, 0, 0.2)")
            madeBorderColors.push("rgba(0, 0, 0, 1)")
            attempts.push(lineups[lineup]["FGA"])
            made.push(lineups[lineup]["FGM"])
            percent.push(lineups[lineup]["FG_PCT"])
            console.log(lineup)
            console.log("Not a match.")
        } 
    }
    console.log(attemptBorderColors)

    // This is wrong
    console.log(made)


}


function makeTheFTGraph() {
    removeData(leftChart)
    leftChart.data.labels = [...Array(5).keys()]
    leftChart.data.datasets[0].label = "Here now"
    leftChart.data.datasets[0].data = [1, 2, 3, 4, 5]
    leftChart.data.datasets[1].label = "Gone now"
    leftChart.data.datasets[1].data = [6, 7, 8, 9, 10]
    leftChart.update()

}


function makeTheFGGraph() {
    removeData(leftChart)
    leftChart.data.labels = [...Array(5).keys()]
    leftChart.data.datasets[0].label = "Here now"
    leftChart.data.datasets[0].data = [1, 1, 1, 1, 1]
    leftChart.data.datasets[1].label = "Gone now"
    leftChart.data.datasets[1].data = [2, 2, 2, 2, 2]
    leftChart.update()

}


function makeTheFG3Graph() {
    removeData(leftChart)
    leftChart.data.labels = [...Array(5).keys()]
    leftChart.data.datasets[0].label = "Here now"
    leftChart.data.datasets[0].data = [1, 1, 1, 1, 1]
    leftChart.data.datasets[1].label = "Gone now"
    leftChart.data.datasets[1].data = [2, 2, 2, 2, 2]
    leftChart.update()

}


function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}