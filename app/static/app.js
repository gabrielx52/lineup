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

        // $(".collapse").collapse()

        $("#left-stats-table-header").text(
            `2017-18 stats vs. ${teamName}`)

        $.ajax({
            type: "POST",
            url: "/getTeamVsTeamData",
            dataType: 'json',
            data: {"teamId": JSON.stringify(teamId)},
            success: function(response) {

                $(".collapse").collapse()
                
                var netsStats = response['nets_stats']
                var oppsStats = response['opp_stats']
                $("#left-tab-gp").text(
                    `${netsStats['GP']}`)
                $("#left-tab-w").text(
                    `${netsStats['W']}`)
                $("#left-tab-l").text(
                    `${netsStats['L']}`)
                $("#left-tab-winpct").text(
                    `${netsStats['W_PCT']}`)
                $("#left-tab-min").text(
                    `${netsStats['MIN']}`)
                $("#left-tab-pts").text(
                    `${netsStats['PTS']}`)
                $("#left-tab-fgm").text(
                    `${netsStats['FGM']}`)
                $("#left-tab-fga").text(
                    `${netsStats['FGA']}`)
                $("#left-tab-fgpct").text(
                    `${netsStats['FG_PCT']}`)
                $("#left-tab-3pm").text(
                    `${netsStats['FG3M']}`)
                $("#left-tab-3pa").text(
                    `${netsStats['FG3A']}`)
                $("#left-tab-3ppct").text(
                    `${netsStats['FG3_PCT']}`)
                $("#left-tab-ftm").text(
                    `${netsStats['FTM']}`)
                $("#left-tab-fta").text(
                    `${netsStats['FTA']}`)
                $("#left-tab-ftpct").text(
                    `${netsStats['FT_PCT']}`)
                $("#left-tab-oreb").text(
                    `${netsStats['OREB']}`)
                $("#left-tab-dreb").text(
                    `${netsStats['DREB']}`)
                $("#left-tab-reb").text(
                    `${netsStats['REB']}`)
                $("#left-tab-ast").text(
                    `${netsStats['AST']}`)
                $("#left-tab-tov").text(
                    `${netsStats['TOV']}`)
                $("#left-tab-stl").text(
                    `${netsStats['STL']}`)
                $("#left-tab-blk").text(
                    `${netsStats['BLK']}`)
                $("#left-tab-blka").text(
                    `${netsStats['BLKA']}`)
                $("#left-tab-pf").text(
                    `${netsStats['PF']}`)



                console.log(netsStats);
            },
            error: function(error) {
                console.log(error);
            }
        });
        
    });

});