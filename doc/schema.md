# Relational Schema

```
Match(match_id:INT [PK], Home:VARCHAR[20] [FK to team.name], Away:VARCHAR[20] [FK to team.name], Result:VARCHAR[20])

Team(team_name:VARCHAR[20] [PK], manager:VARCHAR[20])

User(username:VARCHAR[20] [PK], password:VARCHAR[20], email:VARCHAR[40], name:VARCHAR[40])

Player(player_id:INT [PK], name:VARCHAR[20], ratings:INT)

Sport(sport_id:INT [PK], name:VARCHAR[20])

Stats(player:VARCHAR[20] [PK] [FK to player.player_id], attribute:VARCHAR[20], value:VARCHAR[20])

Plays_match(home_team:VARCHAR[20] [PK] [FK to team.team_name], away_team:VARCHAR[20] [PK] [FK to team.team_name], match_id:INT [PK] [FK to match.match_id])

Sport_type(team_name:VARCHAR[20] [PK] [FK to team.team_name], sport_id:INT [PK] [FK to sport.sport_id])

Roster(team_name:VARCHAR[20] [PK] [FK to team.team_name], player_id:INT [PK] [FK to player.player_id])

Plays_sport(player_id:INT [PK] [FK to player.player_id], sport_id:INT [PK] [FK to sport.sport_id])

Follows(team_name:VARCHAR[20] [PK] [FK to team.team_name] , player_id:INT [PK] [FK to player.player_id] , sport_id:INT [PK] [FK to sport.sport_id] )

```

