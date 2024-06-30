import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import AvgHeightRatings from "./AvgHeightRatings";
import NumHomeWins from "./NumHomeWins";

export default function StoredProc() {
  const [show, setShow] = useState(false);
  const [tableshow, setTableshow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleTableClose();
  };
  const handleShow = () => setShow(true);

  const handleTableClose = () => setTableshow(false);
  const handleTableShow = () => setTableshow(true);

  const [minwins, setMinwins] = useState("");
  const [minratings, setMinratings] = useState("");

  const runProcedure = () => {
    Axios.put("http://34.125.165.198/QueryResultCheck", {
      min_wins: minwins,
      min_ratings: minratings,
    }).then((response) => {
      getRatingTable();
      getTeamTable();
      handleTableShow();
    });
    handleClose();
  };

  const [ratingTable, setRatingTable] = useState([
    { player_value: "player name A", AvgRatings: "Something" },
    { player_value: "player name B", AvgRatings: "Something" },
    { player_value: "player name C", AvgRatings: "Something" },
  ]);

  const [teamTable, setTeamTable] = useState([
    { NumHomeWins: "player name A", team_name: "Something" },
    { NumHomeWins: "player name B", team_name: "Something" },
    { NumHomeWins: "player name C", team_name: "Something" },
  ]);

  const getRatingTable = () => {
    Axios.get("http://34.125.165.198/RatingbyHeight").then((response) => {
      setRatingTable(response.data);
    });
  };

  const getTeamTable = () => {
    Axios.get("http://34.125.165.198/TeamHomeWins").then((response) => {
      setTeamTable(response.data);
    });
  };

  //   const [email, setEmail] = useState("");
  //   const [name, setName] = useState("");
  // const getUsers = () => {
  //   Axios.get("http://localhost:3001/users").then((response) => {
  //     setUserList(response.data);
  //   });
  // };
  //   const [userList, setUserList] = useState([]);

  //   const addUser = () => {
  //     Axios.post("http://34.125.165.198/create", {
  //       username: username,
  //       password: password,
  //       email: email,
  //       name: name,
  //     }).then(() => {
  //       setUserList([
  //         ...userList,
  //         {
  //           username: username,
  //           password: password,
  //           email: email,
  //           name: name,
  //         },
  //       ]);
  //     });
  //     handleClose();
  //   };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        Stored Procedure
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stored Procedure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="information">
            <label>Mininum Wins: </label>
            <input
              type="text"
              onChange={(event) => {
                setMinwins(event.target.value);
              }}
            />

            <label> Minimum Ratings: </label>
            <input
              type="text"
              onChange={(event) => {
                setMinratings(event.target.value);
              }}
            />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={runProcedure}>
            Run Stored Procedure
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={tableshow} onHide={handleTableClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Procedure Output</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="tables">
            <AvgHeightRatings
              teams={ratingTable}
              listName="Average Ratings by Height Group"
            />
            <NumHomeWins teams={teamTable} listName="Team by Home Wins" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleTableClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
