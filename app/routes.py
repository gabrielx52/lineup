"""App routes."""
import json

from app import app

from flask import render_template, request

from .api_script import get_team_roster, get_team_vs_team_stats

from .team_dict import TEAMS, teamColors


@app.route('/')
@app.route('/index')
def index():
    """Index route."""
    return render_template('index.html', title='Home Page', teams=TEAMS)


@app.route('/getTeamVsTeamData', methods=['POST'])
def get_team_vs_team_data():
    """Route for jquery team vs team data request."""
    team_id = request.form['teamId']
    nets_id = "1610612751"
    opp_roster = get_team_roster(team_id)
    nets_roster = get_team_roster(nets_id)
    nets_stats = get_team_vs_team_stats(nets_id, team_id)
    opp_stats = get_team_vs_team_stats(team_id, nets_id)
    return json.dumps({'status': 'OK', 'nets_stats': nets_stats, 'opp_stats': opp_stats,
                       'opp_roster': opp_roster, 'nets_roster': nets_roster,
                       'team_colors': teamColors})
