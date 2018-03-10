"use strict";

const baseUrl = "https://serene-earth-30229.herokuapp.com"

$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
    $(".dropdown-toggle").click(function() {
        $("#right-lineup-collapse").collapse("hide");
    });

    $(".dropdown-item").click(function() {
        let teamAbbr = $(this).data("team-abbr")
        let teamName = $(this).text()
        let teamID = $(this).data("team-id")
        console.log($SCRIPT_ROOT + '*****')
        console.log('*****')
        $("#team2-img").attr({"style": "visibility: hidden"});
        $("#loader").addClass("loader");
        $("#btnGroupDrop1").removeClass("appleBottom");

        $("#left-stats-table-header").text(
            `2017-18 stats vs. ${teamName}`);

        // $.ajax({
        //     type: "POST",
        //     url: $SCRIPT_ROOT + `/getTeamVsTeamData`,
        //     dataType: 'json',
        //     data: {"teamID": JSON.stringify(teamID)},
        //     xhrFields: {
        //         withCredentials: true
        //         },
        //     crossDomain: true,
        //     contentType: 'application/json; charset=utf-8',
        //     success: function(response) {
        //         let netsStats = response['nets_stats']
        //         let netsRoster = response['nets_roster']
        //         let oppsStats = response['opp_stats']
        //         let oppRoster = response['opp_roster']
        //         let teamColors = response['team_colors']

        //         $("#loader").removeClass("loader");

        //         $("#team2-img").attr({
        //             "style": "visibility: visible",
        //             "src": `./../static/logos/${teamAbbr}_logo.svg`
        //         });

        //         localStorage.setItem("nets_stats", JSON.stringify(netsStats));
        //         localStorage.setItem("opp_stats", JSON.stringify(oppsStats));
        //         localStorage.setItem("nets_roster", JSON.stringify(netsRoster));
        //         localStorage.setItem("opp_roster", JSON.stringify(oppRoster));
        //         localStorage.setItem("team_colors", JSON.stringify(teamColors))
                
        //         $(".collapse-stats").collapse()
        //         $("#set-roster-r").removeAttr("disabled")
        //                           .css({"color": "white"});
        //         $("#set-roster-l").removeAttr("disabled")
        //                           .css({"color": "white"});

        //         tableMaker("left", netsStats)
        //         tableMaker("right", oppsStats)


        //         lineupVsTeamStatsAjax(teamID);
        //     },
        //     error: function(error) {
        //         console.log(error);
        //         console.log("Here I am.")
        //     }
        // });
        
    });

});



function tableMaker(side, stats) {
                $(`#${side}-tab-gp`).text(
                    `${stats['GP']}`)
                $(`#${side}-tab-w`).text(
                    `${stats['W']}`)
                $(`#${side}-tab-l`).text(
                    `${stats['L']}`)
                $(`#${side}-tab-winpct`).text(
                    `${stats['W_PCT'].toFixed(3)}`)
                $(`#${side}-tab-min`).text(
                    `${stats['MIN'].toFixed(1)}`)
                $(`#${side}-tab-pts`).text(
                    `${stats['PTS'].toFixed(1)}`)
                $(`#${side}-tab-fgm`).text(
                    `${stats['FGM'].toFixed(1)}`)
                $(`#${side}-tab-fga`).text(
                    `${stats['FGA'].toFixed(1)}`)
                $(`#${side}-tab-fgpct`).text(
                    `${(stats['FG_PCT'] * 100).toFixed(1)}`)
                $(`#${side}-tab-3pm`).text(
                    `${stats['FG3M'].toFixed(1)}`)
                $(`#${side}-tab-3pa`).text(
                    `${stats['FG3A'].toFixed(1)}`)
                $(`#${side}-tab-3ppct`).text(
                    `${(stats['FG3_PCT'] * 100).toFixed(1)}`)
                $(`#${side}-tab-ftm`).text(
                    `${stats['FTM'].toFixed(1)}`)
                $(`#${side}-tab-fta`).text(
                    `${stats['FTA'].toFixed(1)}`)
                $(`#${side}-tab-ftpct`).text(
                    `${(stats['FT_PCT'] * 100).toFixed(1)}`)
                $(`#${side}-tab-oreb`).text(
                    `${stats['OREB'].toFixed(1)}`)
                $(`#${side}-tab-dreb`).text(
                    `${stats['DREB'].toFixed(1)}`)
                $(`#${side}-tab-reb`).text(
                    `${stats['REB'].toFixed(1)}`)
                $(`#${side}-tab-ast`).text(
                    `${stats['AST'].toFixed(1)}`)
                $(`#${side}-tab-tov`).text(
                    `${stats['TOV'].toFixed(1)}`)
                $(`#${side}-tab-stl`).text(
                    `${stats['STL'].toFixed(1)}`)
                $(`#${side}-tab-blk`).text(
                    `${stats['BLK'].toFixed(1)}`)
                $(`#${side}-tab-blka`).text(
                    `${stats['BLKA'].toFixed(1)}`)
                $(`#${side}-tab-pf`).text(
                    `${stats['PF'].toFixed(1)}`)
}