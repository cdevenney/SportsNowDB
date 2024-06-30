import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navig from "./Navig.js";
import TeamsList from "./TeamsList";
import { useEffect, useState } from "react";
import Axios from "axios";
import PlayersList from "./PlayersList";

function App() {
  // const [managerList, setManagerList] = useState("");
  // const [newManager, setNewManager] = useState("");

  const [playerList, setPlayerList] = useState([
    { player_id: "player name A", name: "Something", ratings: "Somthing" },
    { player_id: "player name B", name: "Something", ratings: "Somthing" },
    { player_id: "player name C", name: "Something", ratings: "Somthing" },
  ]);

  const [displayList, setDisplayList] = useState([
    { player_id: "player name A", name: "Something", ratings: "Somthing" },
    { player_id: "player name B", name: "Something", ratings: "Somthing" },
    { player_id: "player name C", name: "Something", ratings: "Somthing" },
  ]);

  const [teamList, setTeamList] = useState([
    { team_name: "Team A", manager: "Something" },
    { team_name: "Team B", manager: "Something" },
    { team_name: "Team C", manager: "Something" },
  ]);

  const getPlayers = () => {
    Axios.get("http://34.125.165.198/players").then((response) => {
      setPlayerList(response.data);
    });
  };

  // const getTeams = () => {
  //   Axios.get("http://34.125.165.198/teams").then((response) => {
  //     setTeamList(response.data);
  //   });
  // };

  useEffect(() => {
    console.log("Use Effect");
    // getPlayers();
    Axios.get("http://34.125.165.198/players").then((response) => {
      setPlayerList(response.data);
      setDisplayList(response.data);
    });
    Axios.get("http://34.125.165.198/teams").then((response) => {
      setTeamList(response.data);
    });
  }, []);

  // const updateManager = (team_name) => {
  //   Axios.put("http://localhost:3001/update", {
  //     manager: newManager,
  //     team_name: team_name,
  //   }).then((response) => {
  //     setNewManager(
  //       managerList.map((val) => {
  //         return val.team_name == team_name
  //           ? {
  //               team: val.team_name,
  //               manager: newManager,
  //             }
  //           : val;
  //       })
  //     );
  //   });
  // };

  // const deleteUser = (name) => {
  //   Axios.delete(`http://localhost:3001/delete/${username}`).then(
  //     (response) => {
  //       setUserList(
  //         userList.filter((val) => {
  //           return val.name != name;
  //         })
  //       );
  //     }
  //   );
  // };

  function findMatches() {
    // console.log("Ran Find Matches");
    // getPlayers();
    var input, wordToMatch;
    input = document.getElementById("myInput");
    wordToMatch = input.value;
    setDisplayList(
      playerList.filter((player) => {
        const regex = new RegExp(wordToMatch, "gi");
        return player.name.match(regex);
      })
    );
  }

  // document.getElementById("myInput").onkeyup = function () {
  //   findMatches();
  // };

  // /updatePlayer
  // string: player_name
  // int: rating
  // setDisplayList(setPlayerList);

  return (
    <div>
      <Navig findMatches={findMatches} />
      {/* <div className="gif-container">
        <a href="https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup/qatar2022">
          <img
            src="https://media.tenor.com/8Q3Y3scvPDsAAAAC/qatar-world-cup.gif"
            alt="World Cup"
            // style="width:48px;height:48px;"
          />
        </a>
      </div> */}
      <div className="flex-container">
        <TeamsList teams={teamList} listName={"Team List"} />
        <PlayersList
          players={displayList}
          listName={"Players List"}
          getP={getPlayers}
          findMatches={findMatches}
        />
      </div>
    </div>
  );
}

export default App;
