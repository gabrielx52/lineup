"""Script using nba_py API wrapper."""
from nba_py import player, team


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


def get_team_lineup_vs_specific_team_stats(team_id, opponent_id=0):
    """Get all lineups and stats vs specific team."""
    lineups = team.TeamLineups(team_id, opponent_team_id=opponent_id)
    return lineups.lineups()
