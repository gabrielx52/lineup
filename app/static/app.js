'use strict';

$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
});

$(document).ready(function() {
    $(".dropdown-item").click(function() {
        let teamAbbr = $(this).data('team-abbr')
        $("#team2-img").attr({
            "style": "visibility: visible",
            "src": `./../static/logos/${teamAbbr}_logo.svg`
        })
        $("#set-roster-r").removeAttr("disabled")
    });
});