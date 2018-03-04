"""Main script file for app."""
# from bs4 import BeautifulSoup

import requests

from team_dict import TEAMS

current_season = '2017-18'


def get_team_roster(team_abbrv, season=current_season):
    """Get teams current roster."""
    url = 'http://stats.nba.com/stats/{}/'
    query = '?LeagueID=00&Season={}&TeamID={}'
    endpoint = 'commonteamroster'
    team_id = TEAMS[team_abbrv]['id']
    full_url = url.format(endpoint) + query.format(season, team_id)
    r = requests.get(full_url, headers={'User-agent': 'Ryan DiCommo'})
    roster_raw = r.json()
    roster = roster_raw['resultSets'][0]['rowSet']
    return roster


def get_common_player_info(player_id):
    """Get common player info."""
    url = 'http://stats.nba.com/stats/{}/'
    query = '?PlayerID={}'
    endpoint = 'commonplayerinfo'
    full_url = url.format(endpoint) + query.format(player_id)
    r = requests.get(full_url, headers={'User-agent': 'Ryan DiCommo'})
    player_info = r.json()
    return player_info


def get_player_stats(player_id, mode='Totals'):
    """Get player stats."""
    url = 'http://stats.nba.com/stats/{}/'
    query = '?PlayerID={}&Permode={}'
    endpoint = 'playerprofilev2'
    full_url = url.format(endpoint) + query.format(player_id, mode)
    r = requests.get(full_url, headers={'User-agent': 'Ryan DiCommo'})
    player_stats = r.json()
    return player_stats
