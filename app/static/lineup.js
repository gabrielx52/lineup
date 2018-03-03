"use strict";

$(document).ready(function() {
    $("#nets-roster-btn").click(function() {
        let netsRoster = JSON.parse(localStorage["nets_roster"])
        let str = ""
        
        $("#left-lineup-collapse").collapse("show");
        
        for(var playerObj in netsRoster) {
            var playerName = netsRoster[playerObj]["PLAYER"]
            var teamID = "1610612751"
            var playerID = netsRoster[playerObj]["PLAYER_ID"]
            playerName = `${playerName.split(" ")[0][0]}. ${playerName.split(" ").slice(1).join(" ")} `
            // console.log(playerName)
            str = str + '<div class="col-lg-4 col-md-6 mb-4">' +
                            '<div class="card yearbook-card">' +
                                `<a href="#"><img class="card-img-top" src="./../static/headshots/${teamID}/${playerID}.png" alt=""></a>` +
                                '<div class="card-footer yearbook-footer">' +
                                    '<div class="form-check">' +
                                        `<input value="${playerID}" data-player-id="${playerID}" data-team-id="${teamID}" type="checkbox" class="form-check-input left-yearbook-input" id="exampleCheck1">` +
                                        `<label class="form-check-label" for="exampleCheck1">${playerName}</label>` +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
        };
        $("#left-lineup-yearbook").html(str);

    });
    
    // Close left side lineup dropdown with cancel button.
    $("#left-lineup-collapse-close").click(function(){
        $("#left-lineup-collapse").collapse("hide");
    });

    $("#set-roster-r").click(function() {
        let oppRoster = JSON.parse(localStorage["opp_roster"])
        let str = ""

        // Render rightside yearbook when choose lineup is selected.
        $("#right-lineup-collapse").collapse("show");
        for(var playerObj in oppRoster) {
            var playerName = oppRoster[playerObj]["PLAYER"]
            var teamID = oppRoster[playerObj]["TeamID"]
            var playerID = oppRoster[playerObj]["PLAYER_ID"]
            playerName = `${playerName.split(" ")[0][0]}. ${playerName.split(" ").slice(1).join(" ")} `
            // console.log(playerName)
            str = str + '<div class="col-lg-4 col-md-6 mb-4">' +
                            '<div class="card yearbook-card">' +
                                `<a href="#"><img onerror="imgError(this);" class="card-img-top" src="./../static/headshots/${teamID}/${playerID}.png" alt=""></a>` +
                                '<div class="card-footer yearbook-footer">' +
                                    '<div class="form-check">' +
                                        `<input value="${playerID}" data-player-id="${playerID}" data-team-id="${teamID}" type="checkbox" class="form-check-input right-yearbook-input" id="exampleCheck1">` +
                                        `<label class="form-check-label" for="exampleCheck1">${playerName}</label>` +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>'
        };
        $("#right-lineup-yearbook").html(str);
        
        // Listening for checkboxes being checked/unchecked.
        $("input.right-yearbook-input").on("change", function(event) {
            // Enable checkboxes if less than five are checked.
            if($("input.right-yearbook-input:checked").length != 5) {
                $("input.right-yearbook-input:not(:checked)").attr("disabled", false);
            };
            if($("input.right-yearbook-input:checked").length == 5) {

                // Enable confirm lineup button if five boxes checked.
                $("#right-lineup-confirm").removeAttr("disabled")
                                          .css({"color": "white"});
                // Disable checkboxes if more than five are checked. 
                $("input.right-yearbook-input:not(:checked)").attr("disabled", true);


                let oppFive = $("input.right-yearbook-input:checked")
                let oppPlayerOne = {}
                let oppPlayerTwo = {}
                let oppPlayerThree = {}
                let oppPlayerFour = {}
                let oppPlayerFive = {}



                console.log(JSON.stringify(oppFive[0]))
                console.log("************")
                console.log(oppFive[0])
                // console.log(oppFive[0].attributes)
                // console.log(oppFive[2])
                // localStorage.setItem("opp_five", JSON.stringify(oppFive));
            }
        })

    });
    
    // Close right side lineup dropdown with cancel button.
    $("#right-lineup-collapse-close").click(function(){
        $("#right-lineup-collapse").collapse("hide");
    });
});



function imgError(image) {
    image.onerror = "";
    image.src = "./../static/headshots/0/resized-baller.png";
    return true;
}