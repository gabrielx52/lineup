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
            localStorage.setItem("lineups", JSON.stringify(lineups));
            console.log(lineups)

        },
        error: function(error) {
            console.log(error)
        }
    })
};


function checkForCurrentLineupStats(teamLineup) {
// Check if current lineup has past stats.
    


}