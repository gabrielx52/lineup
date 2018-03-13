"""Script using nba_py API wrapper."""
import os
import pickle

from nba_py import player, team

from .team_dict import TEAMS, tvt_keys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def get_player_info(player_id):
    """Return player info."""
    player_info = player.PlayerSummary(player_id)
    return player_info.info()


def get_player_regular_season_career_totals(player_id):
    """Return player regular season career totals."""
    player_stats = player.PlayerProfile(player_id)
    return player_stats.regular_season_career_totals()


def get_player_single_season_totals(player_id):
    """Return player current season totals."""
    player_stats = player.PlayerProfile(player_id)
    return player_stats.regular_season_totals()


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
    return team_vs_opp_raw
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


def make_empty_pickle_file(file_name):
    """Make empty pickle file."""
    d = {}
    with open("./pickles/{}.pkl".format(file_name), "wb") as fileObj:
        pickle.dump(d, fileObj)


def pickle_rosters(team_id, roster):
    """Pickle team rosters."""
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/roster.pkl", "rb") as fileObj:
        rosters = pickle.load(fileObj)
        if team_id not in rosters:
            rosters[team_id] = roster
        if len(rosters) == 30:
            print('30 team rosters pickled')
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/roster.pkl", "wb") as fileObj:
        pickle.dump(rosters, fileObj)
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/roster.pkl", "rb") as fileObj:
        rosts = pickle.load(fileObj)
        print(len(rosts))


def get_pickled_rosters(team_id):
    """Get team rosters from the pickle."""
    with open(os.path.join(BASE_DIR, "app/pickles/roster.pkl"), "rb") as fileObj:
        rosters = pickle.load(fileObj)
        return rosters[team_id]


def pickle_tvt_stats(opp_id, team_stats, opp_stats):
    """Pickle team vs team stats."""
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/tvt_stats.pkl", "rb") as fileObj:
        tvt_stats = pickle.load(fileObj)
        if opp_id not in tvt_stats:
            tvt_stats[opp_id] = [team_stats, opp_stats]
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/tvt_stats.pkl", "wb") as fileObj:
        pickle.dump(tvt_stats, fileObj)
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/tvt_stats.pkl", "rb") as fileObj:
        rosts = pickle.load(fileObj)
        print(rosts)
        print(len(rosts))


def get_pickled_tvt_stats(team_id):
    """Get team vs team stats from the pickle."""
    with open(os.path.join(BASE_DIR, "app/pickles/tvt_stats.pkl"), "rb") as fileObj:
        tvt_stats = pickle.load(fileObj)
        return tvt_stats[team_id]


def pickle_lineup_stats(opp_id, lineups):
    """Pickle team vs team stats."""
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/lineup_stats.pkl", "rb") as fileObj:
        lineup_stats = pickle.load(fileObj)
        if opp_id not in lineup_stats:
            lineup_stats[opp_id] = lineups
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/lineup_stats.pkl", "wb") as fileObj:
        pickle.dump(lineup_stats, fileObj)
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/lineup_stats.pkl", "rb") as fileObj:
        rosts = pickle.load(fileObj)
        print(rosts)
        print(len(rosts))


def get_pickled_lineup_stats(team_id):
    """Get lineup vs team stats from the pickle."""
    with open(os.path.join(BASE_DIR, 'app/pickles/lineup_stats.pkl'), "rb") as fileObj:
        lineup_stats = pickle.load(fileObj)
        return lineup_stats[team_id]


def pickle_player_stats(player_id, career_stats, single_stats):
    """Pickle player stats."""
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/player_stats.pkl", "rb") as fileObj:
        player_stats = pickle.load(fileObj)
        if player_id not in player_stats:
            player_stats[player_id] = {"current": single_stats, "career": career_stats}
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/player_stats.pkl", "wb") as fileObj:
        pickle.dump(player_stats, fileObj)
    with open("/Users/gabrielmeringolo/Python/lineup/app/pickles/player_stats.pkl", "rb") as fileObj:
        stats = pickle.load(fileObj)
        print(len(stats))


def get_pickled_player_stats(player_id):
    """Get lineup vs team stats from the pickle."""
    with open(os.path.join(BASE_DIR, 'app/pickles/player_stats.pkl'), "rb") as fileObj:
        player_stats = pickle.load(fileObj)
        return player_stats[int(player_id)]


def all_the_player_stats():
    """Get all the players stats."""
    all_players = get_player_list()
    for playrr in all_players:
        try:
            career_stats = get_player_regular_season_career_totals(playrr["PERSON_ID"])
            single_stats = get_player_single_season_totals(playrr["PERSON_ID"])
            for stat in single_stats:
                if stat['SEASON_ID'] == '2017-18':
                    print(stat)
            pickle_player_stats(playrr["PERSON_ID"], career_stats, single_stats)
            print("Got {}'s stats".format(playrr["DISPLAY_FIRST_LAST"]))
        except:
            print("ERR: {} *****".format(playrr["DISPLAY_FIRST_LAST"]))
