const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "34.132.245.214",
  password: "sportsnow",
  database: "sportsnow",
});

app.get("/RatingbyHeight", (req, res) => {
  db.query(
    "SELECT * FROM RatingbyHeight",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.get("/TeamHomeWins", (req, res) => {
  db.query(
    "SELECT * FROM TeamHomeWins",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});
app.put("/QueryResultCheck", (req, res) => {
  const minWins = req.body.min_wins;
  const minRatings = req.body.min_ratings;
  console.log("blah");
  db.query(
    "CALL sportsnow.QueryResultCheck( ? , ? )", [minWins, minRatings],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/create", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;

  db.query(
    "INSERT INTO Users (username, password, email, name) VALUES (?,?,?,?)",
    [username, password, email, name],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/teams", (req, res) => {
  db.query("SELECT * FROM Team", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

app.get("/players", (req, res) => {
  db.query("SELECT * FROM Player", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/numHomeWins", (req, res) => {
    db.query(`((SELECT COUNT(result) AS NumHomeWins, t.team_name
    FROM SportsMatch s JOIN Team t ON (s.home = t.team_name)
    WHERE result = 'H-W'
    GROUP BY t.team_name)

    UNION
    (SELECT COUNT(result) AS NumHomeWins, t.team_name
    FROM SportsMatch s JOIN Team t ON (s.away = t.team_name)
    WHERE result = 'H-W'
    GROUP BY t.team_name)
    ) 
    ORDER BY NumHomeWins desc`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.get("/avgRatingbyHeight", (req, res) => {
    db.query(`SELECT tab.player_value, avg(ratings)
FROM Player NATURAL JOIN (SELECT player_id, player_value
							FROM Stats
                            WHERE attribute = 'height'
                            
                            ) as tab
GROUP BY tab.player_value`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
app.put("/updatePlayer", (req, res) => {
  const player_name = req.body.player_name;
  const player_id = req.body.player_id;
  const rating = req.body.rating;
  console.log(req.body);
  console.log(rating);
  console.log(player_id);
  db.query(
    "UPDATE Player SET ratings = ? WHERE player_id = ?",
    [rating, player_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const username = req.params.username;
  db.query("DELETE FROM User WHERE username = ?", username, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(80, () => {
  console.log("Yey, your server is running on port 80");
});
