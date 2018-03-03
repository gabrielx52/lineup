"use strict";


$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
    $(".dropdown-toggle").click(function() {
        $("#right-lineup-collapse").collapse("hide");
    });

    $(".dropdown-item").click(function() {
        let teamAbbr = $(this).data("team-abbr")
        let teamName = $(this).text()
        let teamId = $(this).data("team-id")

        $("#team2-img").attr({
            "style": "visibility: visible",
            "src": `./../static/logos/${teamAbbr}_logo.svg`
        });

        $("#set-roster-r").removeAttr("disabled")
                          .css({"color": "white"});

        $("#nets-roster-btn").removeAttr("disabled")
                             .css({"color": "white"});
        

        $("#left-stats-table-header").text(
            `2017-18 stats vs. ${teamName}`);


        $.ajax({
            type: "POST",
            url: "/getTeamVsTeamData",
            dataType: 'json',
            data: {"teamId": JSON.stringify(teamId)},
            success: function(response) {
                let netsStats = response['nets_stats']
                let netsRoster = response['nets_roster']

                let oppsStats = response['opp_stats']
                let oppRoster = response['opp_roster']
                
                console.log(oppsStats)

                localStorage.setItem("nets_stats", JSON.stringify(netsStats));
                localStorage.setItem("opp_stats", JSON.stringify(oppsStats));
                localStorage.setItem("nets_roster", JSON.stringify(netsRoster));
                localStorage.setItem("opp_roster", JSON.stringify(oppRoster));
                
                $(".collapse-stats").collapse()
                
                $("#left-tab-gp").text(
                    `${netsStats['GP']}`)
                $("#left-tab-w").text(
                    `${netsStats['W']}`)
                $("#left-tab-l").text(
                    `${netsStats['L']}`)
                $("#left-tab-winpct").text(
                    `${netsStats['W_PCT'].toFixed(3)}`)
                $("#left-tab-min").text(
                    `${netsStats['MIN'].toFixed(1)}`)
                $("#left-tab-pts").text(
                    `${netsStats['PTS'].toFixed(1)}`)
                $("#left-tab-fgm").text(
                    `${netsStats['FGM'].toFixed(1)}`)
                $("#left-tab-fga").text(
                    `${netsStats['FGA'].toFixed(1)}`)
                $("#left-tab-fgpct").text(
                    `${(netsStats['FG_PCT'] * 100).toFixed(1)}`)
                $("#left-tab-3pm").text(
                    `${netsStats['FG3M'].toFixed(1)}`)
                $("#left-tab-3pa").text(
                    `${netsStats['FG3A'].toFixed(1)}`)
                $("#left-tab-3ppct").text(
                    `${(netsStats['FG3_PCT'] * 100).toFixed(1)}`)
                $("#left-tab-ftm").text(
                    `${netsStats['FTM'].toFixed(1)}`)
                $("#left-tab-fta").text(
                    `${netsStats['FTA'].toFixed(1)}`)
                $("#left-tab-ftpct").text(
                    `${(netsStats['FT_PCT'] * 100).toFixed(1)}`)
                $("#left-tab-oreb").text(
                    `${netsStats['OREB'].toFixed(1)}`)
                $("#left-tab-dreb").text(
                    `${netsStats['DREB'].toFixed(1)}`)
                $("#left-tab-reb").text(
                    `${netsStats['REB'].toFixed(1)}`)
                $("#left-tab-ast").text(
                    `${netsStats['AST'].toFixed(1)}`)
                $("#left-tab-tov").text(
                    `${netsStats['TOV'].toFixed(1)}`)
                $("#left-tab-stl").text(
                    `${netsStats['STL'].toFixed(1)}`)
                $("#left-tab-blk").text(
                    `${netsStats['BLK'].toFixed(1)}`)
                $("#left-tab-blka").text(
                    `${netsStats['BLKA'].toFixed(1)}`)
                $("#left-tab-pf").text(
                    `${netsStats['PF'].toFixed(1)}`)


                $("#right-tab-gp").text(
                    `${oppsStats['GP']}`)
                $("#right-tab-w").text(
                    `${oppsStats['W']}`)
                $("#right-tab-l").text(
                    `${oppsStats['L']}`)
                $("#right-tab-winpct").text(
                    `${oppsStats['W_PCT'].toFixed(3)}`)
                $("#right-tab-min").text(
                    `${oppsStats['MIN'].toFixed(1)}`)
                $("#right-tab-pts").text(
                    `${oppsStats['PTS'].toFixed(1)}`)
                $("#right-tab-fgm").text(
                    `${oppsStats['FGM'].toFixed(1)}`)
                $("#right-tab-fga").text(
                    `${oppsStats['FGA'].toFixed(1)}`)
                $("#right-tab-fgpct").text(
                    `${(oppsStats['FG_PCT'] * 100).toFixed(1)}`)
                $("#right-tab-3pm").text(
                    `${oppsStats['FG3M'].toFixed(1)}`)
                $("#right-tab-3pa").text(
                    `${oppsStats['FG3A'].toFixed(1)}`)
                $("#right-tab-3ppct").text(
                    `${(oppsStats['FG3_PCT'] * 100).toFixed(1)}`)
                $("#right-tab-ftm").text(
                    `${oppsStats['FTM'].toFixed(1)}`)
                $("#right-tab-fta").text(
                    `${oppsStats['FTA'].toFixed(1)}`)
                $("#right-tab-ftpct").text(
                    `${(oppsStats['FT_PCT'] * 100).toFixed(1)}`)
                $("#right-tab-oreb").text(
                    `${oppsStats['OREB'].toFixed(1)}`)
                $("#right-tab-dreb").text(
                    `${oppsStats['DREB'].toFixed(1)}`)
                $("#right-tab-reb").text(
                    `${oppsStats['REB'].toFixed(1)}`)
                $("#right-tab-ast").text(
                    `${oppsStats['AST'].toFixed(1)}`)
                $("#right-tab-tov").text(
                    `${oppsStats['TOV'].toFixed(1)}`)
                $("#right-tab-stl").text(
                    `${oppsStats['STL'].toFixed(1)}`)
                $("#right-tab-blk").text(
                    `${oppsStats['BLK'].toFixed(1)}`)
                $("#right-tab-blka").text(
                    `${oppsStats['BLKA'].toFixed(1)}`)
                $("#right-tab-pf").text(
                    `${oppsStats['PF'].toFixed(1)}`)
            },
            error: function(error) {
                console.log(error);
            }
        });
        
    });

});