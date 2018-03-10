"""App routes."""
import json

from app import app

from flask import render_template, request

from flask_cors import cross_origin

from .api_script import (get_team_lineup_vs_specific_team_stats,
                         get_team_roster,
                         get_team_vs_team_stats,)

from .team_dict import TEAMS, teamColors


@app.route('/')
@app.route('/index')
def index():
    """Index route."""
    return render_template('index.html', title='Home Page', teams=TEAMS)


@app.route('/getTeamVsTeamData', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def get_team_vs_team_data():
    """Route for jquery team vs team data request."""
    nets_id = "1610612751"
    # team_id = request.form['teamID']

    return json.dumps({'status': 'OK', 'nets_id': nets_id})
    opp_roster = get_team_roster(team_id)
    nets_roster = get_team_roster(nets_id)
    nets_stats = get_team_vs_team_stats(nets_id, team_id)
    opp_stats = get_team_vs_team_stats(team_id, nets_id)
    return json.dumps({'status': 'OK', 'nets_stats': nets_stats, 'opp_stats': opp_stats,
                       'opp_roster': opp_roster, 'nets_roster': nets_roster,
                       'team_colors': teamColors})


@app.route('/getLineupVsTeamData', methods=['POST', 'GET'])
@cross_origin()
def get_lineup_vs_team_data():
    """Route for jquery lineup vs team data request."""
    nets_id = "1610612751"
    team_id = request.form['teamID']
    lineups = get_team_lineup_vs_specific_team_stats(nets_id, team_id)
    return json.dumps({'status': 'OK', 'nets_id': nets_id, "opp_id": team_id, "lineups": lineups})


@app.route('/test', methods=['POST', 'GET'])
def get_help():
    """Route for jquery lineup vs team data request."""
    return "hello"
