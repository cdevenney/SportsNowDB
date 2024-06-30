SELECT tab.player_value, avg(ratings)
FROM Player NATURAL JOIN (SELECT player_id, player_value 
							FROM Stats 
                            WHERE attribute = 'height'
                            
                            ) as tab
GROUP BY tab.player_value

                            


