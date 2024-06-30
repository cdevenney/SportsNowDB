import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

function NumHomeWins({ teams, listName }) {
  return (
    <Card style={{ width: "80%" }}>
      <Card.Body>
        <Card.Title>{listName}</Card.Title>
        <Card.Text>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Number of Wins</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr>
                  <td>{team.team_name}</td>
                  <td>{team.NumHomeWins}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default NumHomeWins;
