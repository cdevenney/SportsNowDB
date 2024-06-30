
((SELECT COUNT(result) AS NumHomeWins, t.team_name 
FROM SportsMatch s JOIN Team t ON (s.home = t.team_name)
WHERE result = 'H-W' 
GROUP BY t.team_name)

UNION

(SELECT COUNT(result) AS NumHomeWins, t.team_name 
FROM SportsMatch s JOIN Team t ON (s.away = t.team_name)
WHERE result = 'H-W' 
GROUP BY t.team_name)
) as tab
ORDER BY NumHomeWins desc
