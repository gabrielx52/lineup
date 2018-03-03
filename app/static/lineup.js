"use strict";

$(document).ready(function() {
    $("#nets-roster-btn").click(function() {
        let netsRoster = JSON.parse(localStorage["nets_roster"])
        let str = ""
        
        $("#left-lineup-collapse").collapse("show");
        
        for(var playerObj in netsRoster) {
            var playerName = netsRoster[playerObj]["PLAYER"]
            var teamCode = "1610612751"
            var playerId = netsRoster[playerObj]["PLAYER_ID"]
            playerName = `${playerName.split(" ")[0][0]}. ${playerName.split(" ").slice(1).join(" ")} `
            console.log(playerName)
            str = str +         '<div class="col-lg-4 col-md-6 mb-4">' +
                                  '<div class="card">' +
                                    `<a href="#"><img class="card-img-top" src="./../static/headshots/${teamCode}/${playerId}.png" alt=""></a>` +
                                    '<div class="card-footer yearbook-footer">' +
                                        '<div class="form-check">' +
                                            '<input type="checkbox" class="form-check-input" id="exampleCheck1">' +
                                            `<label class="form-check-label" for="exampleCheck1">${playerName}</label>` +
                                        '</div>' +
                                    '</div>' +
                                  '</div>' +
                                '</div>'
        };
        $("#left-lineup-yearbook").html(str);

    });

    $("#left-lineup-collapse-close").click(function(){
        $("#left-lineup-collapse").collapse("hide");
    });


    $("#set-roster-r").click(function() {
        let oppRoster = JSON.parse(localStorage["opp_roster"])
        let str = ""

        $("#right-lineup-collapse").collapse("show");

        for(var playerObj in oppRoster) {
            var playerName = oppRoster[playerObj]["PLAYER"]
            var teamCode = oppRoster[playerObj]["TeamID"]
            var playerId = oppRoster[playerObj]["PLAYER_ID"]
            playerName = `${playerName.split(" ")[0][0]}. ${playerName.split(" ").slice(1).join(" ")} `
            console.log(playerName)
            str = str +         '<div class="col-lg-4 col-md-6 mb-4">' +
                                  '<div class="card">' +
                                    `<a href="#"><img onerror="imgError(this);" class="card-img-top" src="./../static/headshots/${teamCode}/${playerId}.png" alt=""></a>` +
                                    '<div class="card-footer yearbook-footer">' +
                                        '<div class="form-check">' +
                                            '<input type="checkbox" class="form-check-input" id="exampleCheck1">' +
                                            `<label class="form-check-label" for="exampleCheck1">${playerName}</label>` +
                                        '</div>' +
                                    '</div>' +
                                  '</div>' +
                                '</div>'
        };
        $("#right-lineup-yearbook").html(str);


    });

    $("#right-lineup-collapse-close").click(function(){
        $("#right-lineup-collapse").collapse("hide");
    });

});

function imgError(image) {
    image.onerror = "";
    image.src = "./../static/headshots/0/no-headshot.png";
    return true;
}