import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

function TeamsList({ teams, listName }) {
  return (
    <Card style={{ width: "40%" }}>
      <Card.Body>
        <Card.Title>{listName}</Card.Title>
        <Card.Text>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr>
                  <td>{team.team_name}</td>
                  <td>{team.manager}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TeamsList;
