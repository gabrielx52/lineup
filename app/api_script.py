"""Script using nba_py API wrapper."""
from nba_py import player, team

from .team_dict import TEAMS, tvt_keys


def get_player_info(player_id):
    """Return player info."""
    player_info = player.PlayerSummary(player_id)
    return player_info.info()


def get_player_regular_season_career_totals(player_id):
    """Return player regular season career totals."""
    player_stats = player.PlayerProfile(player_id)
    return player_stats.regular_season_career_totals()


def get_player_post_season_career_totals(player_id):
    """Return player post season career totals."""
    player_stats = player.PlayerProfile(player_id)
    return player_stats.post_season_career_totals()


def get_player_list():
    """Return player list."""
    players = player.PlayerList()
    return players.info()


def get_team_roster(team_id):
    """Return team roster."""
    roster = team.TeamCommonRoster(team_id)
    return roster.roster()


def get_team_coaches(team_id):
    """Return team coaches."""
    roster = team.TeamCommonRoster(team_id)
    return roster.coaches()


def small_lineup_vs_team_stats(lineups_raw):
    """Shortened version of above, use all player IDs as group key."""
    keys = ['GROUP_ID', 'FGA', 'FGM', 'FG_PCT', 'FG3A', 'FG3M', 'FG3_PCT', 'FTA', 'FTM', 'FT_PCT']
    short_lineup = {}
    for lineup in lineups_raw:
        short_lineup[''.join(lineup['GROUP_ID'])] = {key: lineup[key] for key in keys}
    return short_lineup


def get_team_lineup_vs_specific_team_stats(team_id=1610612751, opponent_id=0):
    """Get all lineups and stats vs specific team."""
    team_vs_opp_raw = team.TeamLineups(team_id, opponent_team_id=opponent_id)
    opp_vs_team_raw = team.TeamLineups(opponent_id, opponent_team_id=team_id)
    team_vs_opp = small_lineup_vs_team_stats(lineup_group_id_parser(team_vs_opp_raw.lineups()))
    opp_vs_team = small_lineup_vs_team_stats(lineup_group_id_parser(opp_vs_team_raw.lineups()))
    return {team_id: team_vs_opp, opponent_id: opp_vs_team}


def lineup_group_id_parser(lineups):
    """Parse GROUP_ID str into list of IDs."""
    for lineup in lineups:
        sorted_lineup = sorted(lineup['GROUP_ID'].split(' - '))
        lineup['GROUP_ID'] = sorted_lineup
    return lineups


def convert_team_id_to_name(team_id):
    """Convert team id to full team name."""
    for t in TEAMS:
        if TEAMS[t]['id'] == team_id:
            return '{} {}'.format(TEAMS[t]['city'], TEAMS[t]['name'])
    else:
        raise ValueError('No team with that id.')


def get_team_vs_team_stats(team_id, opponent_id=0):
    """Get team vs team stats."""
    team_data_raw = team.TeamOpponentSplits(team_id)
    res_set = team_data_raw.json
    # return res_set['resultSets'][3]
    teams_data = res_set['resultSets'][3]['rowSet']
    if opponent_id:
        opp_team = convert_team_id_to_name(opponent_id)
        match = [x for x in teams_data if x[-1] == opp_team]
        return dict(zip(tvt_keys, match[0]))
    else:
        return teams_data
