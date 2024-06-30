CREATE DEFINER=`root`@`%` PROCEDURE `QueryResultCheck`(minwins int, minratings decimal(14,4))
BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE hwins INTEGER DEFAULT 0;
    DECLARE ratings decimal(14,4) DEFAULT 0;
	DECLARE cur1 CURSOR FOR SELECT NumHomeWins FROM TeamHomeWins;
    DECLARE cur2 CURSOR FOR SELECT AvgRatings FROM RatingbyHeight;
    DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET finished = 1;
        
	DROP TABLE IF EXISTS TeamHomeWins;
	CREATE TABLE TeamHomeWins 
    AS (
	(SELECT COUNT(result) AS NumHomeWins, t.team_name 
	FROM SportsMatch s JOIN Team t ON (s.home = t.team_name)
	WHERE result = 'H-W' 
	GROUP BY t.team_name)

	UNION

	(SELECT COUNT(result) AS NumHomeWins, t.team_name 
	FROM SportsMatch s JOIN Team t ON (s.away = t.team_name)
	WHERE result = 'H-W' 
	GROUP BY t.team_name)
	);
    
    DROP TABLE IF EXISTS RatingbyHeight;
	CREATE TABLE RatingbyHeight
    AS(
    SELECT tab.player_value, avg(p.ratings) as AvgRatings
	FROM Player p NATURAL JOIN (SELECT player_id, player_value 
								FROM Stats 
								WHERE attribute = 'height'                            
								) as tab
	GROUP BY tab.player_value);


	open cur1;

	checkHWins: LOOP
		FETCH cur1 INTO hwins;
		IF finished = 1 THEN
			LEAVE checkHWins;
		END IF;
		
		IF hwins < minwins THEN
			DELETE FROM TeamHomeWins WHERE NumHomeWins = hwins;
		END IF;
		END LOOP checkHWins;
    CLOSE cur1;
    
    SET finished = 0;
    
    open cur2;
    checkRatings: LOOP
		FETCH cur2 INTO ratings;
		IF finished = 1 THEN
			LEAVE checkRatings;
		END IF;
		
		IF ratings < minratings THEN
			DELETE FROM RatingbyHeight WHERE AvgRatings = ratings;
		END IF;
		END LOOP checkRatings;
    CLOSE cur2;
    
	
END