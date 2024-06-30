import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/esm/Button";
// import Axios from "axios";
import React, { useState } from "react";
import ChangeRating from "./ChangeRating";

function PlayersList({ players, listName, getP, findMatches }) {
  // const [player_id, setPlayer_id] = useState(0);
  // const [rating, setRating] = useState(14);

  return (
    <Card style={{ width: "40%" }}>
      <Card.Body>
        <Card.Title>{listName}</Card.Title>
        <Card.Text>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Player ID</th>
                <th>Player Name</th>
                <th>Player Rating</th>
                <th>Change Rating</th>
              </tr>
            </thead>
            <tbody>
              {players.map((team) => (
                <tr>
                  <td>{team.player_id}</td>
                  <td>{team.name}</td>
                  <td>{team.ratings}</td>
                  <td>
                    <ChangeRating getPl={getP} findMatches={findMatches} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PlayersList;
