'use strict';


$(document).ready(function() {
    $(".dropdown-toggle").dropdown();

    $(".dropdown-item").click(function() {
        let teamAbbr = $(this).data("team-abbr")
        let teamName = $(this).text()
        let teamId = $(this).data("team-id")

        $("#team2-img").attr({
            "style": "visibility: visible",
            "src": `./../static/logos/${teamAbbr}_logo.svg`
        })

        $("#set-roster-r").removeAttr("disabled")

        $(".collapse").collapse()

        $("#left-stats-table-header").text(
            `2017-18 stats vs. ${teamName}`)

        $.ajax({
            type: "POST",
            url: "/getTeamVsTeamData",
            dataType: 'json',
            data: {"teamId": JSON.stringify(teamId)},
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
        
    });

});