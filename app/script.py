"""Main script file for app."""
from bs4 import BeautifulSoup

import requests

from team_dict import teamDict


def get_team_roster(team_abbrv, season='2017-18'):
    """Get teams current roster."""
    url = 'http://stats.nba.com/stats/{}/'
    query = '?LeagueID=00&Season={}&TeamID={}'
    endpoint = 'commonteamroster'
    team_id = str(teamDict[team_abbrv])
    full_url = url.format(endpoint) + query.format(season, team_id)
    r = requests.get(full_url, headers={'User-agent': 'Ryan DiCommo'})
    roster_raw = r.json()
    roster = roster_raw['resultSets'][0]['rowSet']
    return roster
