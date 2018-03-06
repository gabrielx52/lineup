"""Helper functions."""
import os

from api_script import get_player_list

import requests

from team_dict import TEAMS


def make_team_id_folders():
    """Make team id folders for headshots."""
    for team in TEAMS:
        os.makedirs('./static/headshots/{}'.format(TEAMS[team]['id']))


def headshot_harvester():
    """Harvest player headshots."""
    base = 'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/'
    query = '{}/2017/260x190/{}.png'
    players = get_player_list()
    for player in players:
        team_id = player['TEAM_ID']
        player_id = player['PERSON_ID']
        if team_id == 0:
            url = base + 'latest/260x190/{}.png'.format(player_id)
        else:
            url = base + query.format(team_id, player_id)
        r = requests.get(url, headers={'User-agent': 'Ryan DiCommo'})
        if r.headers['Content-Type'] != 'image/png':
            with open('pic_error_log.txt', 'a+') as f:
                f.write('Pic ERR: {}, {} \n'.format(team_id, player_id))
                print('ERROR: Harvesting pic for {}'.format(player['DISPLAY_FIRST_LAST']))
        elif r.headers['Content-Type'] == 'image/png':
            pic_path = './static/headshots/{}/{}.png'.format(team_id, player_id)
            with open(pic_path, 'wb') as f:
                f.write(r.content)
                print('Harvested pic for {}'.format(player['DISPLAY_FIRST_LAST']))
