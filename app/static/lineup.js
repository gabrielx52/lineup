"use strict";

$(document).ready(function() {
    $("#set-roster-l").click(function() {
        let netsRoster = JSON.parse(localStorage["nets_roster"])
        let str = ""
        
        $("#set-roster-l").attr("disabled", "disabled")
        $("#left-lineup-confirm").attr("disabled", "disabled")
        $("#left-lineup-collapse-close").addClass("flatLeft")
    

        // Render left side yearbook when choose lineup is selected.
        $("#left-lineup-collapse").collapse("show");
        var teamID = "1610612751"
        var teamColors = JSON.parse(localStorage["team_colors"])[teamID]
        for(var playerObj in netsRoster) {
            var playerName = netsRoster[playerObj]["PLAYER"]
            var playerID = netsRoster[playerObj]["PLAYER_ID"]
            playerName = `${playerName.split(" ")[0][0]}. ${playerName.split(" ").slice(1).join(" ")} `
            // console.log(playerName)
            str = str + '<div class="col-lg-4 col-md-6 mb-4">' +
                            '<div class="card yearbook-card">' +
                                `<a href="#"><img class="card-img-top" src="./../static/headshots/${teamID}/${playerID}.png" alt=""></a>` +
                                `<div class="card-footer yearbook-footer" style="background-color: #${teamColors[0]}; color: #${teamColors[1]};">` +
                                    '<div class="form-check">' +
                                        `<input value="${playerID}" data-player-id="${playerID}" data-team-id="${teamID}" data-player-name="${playerName}" type="checkbox" class="form-check-input left-yearbook-input" id="exampleCheck1">` +
                                        `<label class="form-check-label" for="exampleCheck1">${playerName}</label>` +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
        };
        $("#left-lineup-yearbook").html(str);


        // Listening for checkboxes being checked/unchecked.
        $("input.left-yearbook-input").on("change", function() {
            checkedBoxes("left")
        }
        )
    });



    // Close left side lineup and confirm picks.
    $("#left-lineup-confirm").click(function() {
        let teamLineup = JSON.parse(localStorage["leftLineup"])
        let players = teamLineup["players"]
        let teamID = teamLineup["teamID"]
        let teamColors = JSON.parse(localStorage["team_colors"])[teamID]
        let str = `<div class="col-lg-12 col-sm-12 text-center">`
        $("#set-roster-l").removeAttr("disabled")
        
        checkForCurrentLineupStats(teamLineup, teamID, "left")

   

        for(var playerObj in players) {
            let playerName = players[playerObj]["NAME"]
            let playerID = players[playerObj]["ID"]
            playerName = `${playerName.split(" ")[0][0]}. ${playerName.split(" ").slice(1).join(" ")} `
            str = str + `<div class="vert-card">` +
                            `<div style="background-image: url('./static/headshots/${teamID}/${playerID}.png')" data-player-id="${playerID}" data-team-id="${teamID}" class="vert-head"></div>` +
                            `<div style="background-color: #${teamColors[0]}; border-color: #${teamColors[1]};" class="vert-name">` +
                                `${playerName}&thinsp;` +
                            `</div>` +
                        `</div>`
        };
        str = str + `</div>`
        $("#left-team-dash").html(str);
        $("#left-graph-toggle").removeAttr("disabled")

        $("#left-lineup-collapse").collapse("hide");
    });


    // Close left side lineup dropdown with cancel button.
    $("#left-lineup-collapse-close").click(function(){
        $("#left-lineup-collapse").collapse("hide");
        $("#set-roster-l").removeAttr("disabled")

    });



    

    // Right side team js.
    $("#set-roster-r").click(function() {
        let oppRoster = JSON.parse(localStorage["opp_roster"])
        let str = ""
        
        $("#set-roster-r").attr("disabled", "disabled")
        $("#btnGroupDrop1").addClass("appleBottom")
        $("#right-lineup-confirm").attr("disabled", "disabled")
        $("#right-lineup-collapse-close").addClass("flatLeft")

        
        // Render right side yearbook when choose lineup is selected.
        $("#right-lineup-collapse").collapse("show");
        for(var playerObj in oppRoster) {
            let playerName = oppRoster[playerObj]["PLAYER"]
            let teamID = oppRoster[playerObj]["TeamID"]
            let teamColors = JSON.parse(localStorage["team_colors"])[teamID]
            let playerID = oppRoster[playerObj]["PLAYER_ID"]
            playerName = `${playerName.split(" ")[0][0]}. ${playerName.split(" ").slice(1).join(" ")} `
            str = str + '<div class="col-lg-4 col-md-6 mb-4">' +
                            '<div class="card yearbook-card">' +
                                `<a href="#"><img onerror="imgError(this);" class="card-img-top" src="./../static/headshots/${teamID}/${playerID}.png" alt=""></a>` +
                                `<div class="card-footer yearbook-footer" style="background-color: #${teamColors[0]}; border-color: #${teamColors[1]};">` +
                                    '<div class="form-check">' +
                                        `<input value="${playerID}" data-player-id="${playerID}" data-team-id="${teamID}" data-player-name="${playerName}" type="checkbox" class="form-check-input right-yearbook-input" id="exampleCheck1">` +
                                        `<label class="form-check-label" for="exampleCheck1">${playerName}</label>` +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
        };
        $("#right-lineup-yearbook").html(str);
        
        // Listening for checkboxes being checked/unchecked.
        $("input.right-yearbook-input").on("change", function() {
            checkedBoxes("right")
        })
    });


    // Close right side lineup and confirm picks.
    $("#right-lineup-confirm").click(function() {
        let oppLineup = JSON.parse(localStorage["rightLineup"])
        let players = oppLineup["players"]
        let teamID = oppLineup["teamID"]
        let teamColors = JSON.parse(localStorage["team_colors"])[teamID]
        let str = `<div class="col-lg-12 col-sm-12 text-center">`
        $("#set-roster-r").removeAttr("disabled")
        $("#btnGroupDrop1").removeClass("appleBottom")
        checkForCurrentLineupStats(oppLineup, teamID, "right")

        
        for(var playerObj in players) {
            let playerName = players[playerObj]["NAME"]
            let playerID = players[playerObj]["ID"]
            playerName = `${playerName.split(" ")[0][0]}. ${playerName.split(" ").slice(1).join(" ")} `
            str = str + `<div class="vert-card">` +
                            `<div style="background-image: url('./static/headshots/${teamID}/${playerID}.png')" data-player-id="${playerID}" data-team-id="${teamID}" class="vert-head"></div>` +
                            `<div style="background-color: #${teamColors[0]}; border-color: #${teamColors[1]};" class="vert-name">` +
                                `${playerName}&thinsp;` +
                            `</div>` +
                        `</div>`
        };
        str = str + `</div>`
        $("#right-team-dash").html(str);
        $("#right-graph-toggle").removeAttr("disabled")


        $("#right-lineup-collapse").collapse("hide");
    })
    
    // Close right side lineup dropdown with cancel button.
    $("#right-lineup-collapse-close").click(function(){
        $("#right-lineup-collapse").collapse("hide");
        $("#set-roster-r").removeAttr("disabled")
        $("#btnGroupDrop1").removeClass("appleBottom")


    });
});


// Replace missing headshots with placeholder.
function imgError(image) {
    image.onerror = "";
    image.src = "./../static/headshots/0/grey-silhouette.png";
    return true;
}



function teamLineupObjectifier(checkFive) {
    let teamLineup = {"teamID": checkFive[0].attributes["data-team-id"].value,
                      "GROUP_KEY": [checkFive[0].attributes["data-player-id"].value,
                                    checkFive[1].attributes["data-player-id"].value,
                                    checkFive[2].attributes["data-player-id"].value,
                                    checkFive[3].attributes["data-player-id"].value,
                                    checkFive[4].attributes["data-player-id"].value].sort().join(''),
                     "players": {
                         "player1": {
                            "ID": checkFive[0].attributes["data-player-id"].value,
                            "NAME": checkFive[0].attributes["data-player-name"].value
                        },
                         "player2": {
                            "ID": checkFive[1].attributes["data-player-id"].value,
                            "NAME": checkFive[1].attributes["data-player-name"].value
                        },
                         "player3": {
                            "ID": checkFive[2].attributes["data-player-id"].value,
                            "NAME": checkFive[2].attributes["data-player-name"].value
                        },
                         "player4": {
                            "ID": checkFive[3].attributes["data-player-id"].value,
                            "NAME": checkFive[3].attributes["data-player-name"].value
                        },
                         "player5": {
                            "ID": checkFive[4].attributes["data-player-id"].value,
                            "NAME": checkFive[4].attributes["data-player-name"].value
                        }
                    }
                 }
    return teamLineup
};




function checkedBoxes(side) {
            // Enable checkboxes if less than five are checked.
            if($(`input.${side}-yearbook-input:checked`).length != 5) {
                $(`input.${side}-yearbook-input:not(:checked)`).attr("disabled", false);
                $(`#${side}-lineup-confirm`).attr("disabled", "disabled")
            };
            if($(`input.${side}-yearbook-input:checked`).length == 5) {

                // Enable confirm lineup button if five boxes checked.
                $(`#${side}-lineup-confirm`).removeAttr("disabled")

                // Disable checkboxes if more than five are checked. 
                $(`input.${side}-yearbook-input:not(:checked)`).attr("disabled", "disabled");
                $(`#${side}-lineup-collapse-close`).removeClass("flatLeft");

                let checkedFive = $(`input.${side}-yearbook-input:checked`)
                let lineupObj = teamLineupObjectifier(checkedFive)
                localStorage.setItem(`${side}Lineup`, JSON.stringify(lineupObj));
            }
        }