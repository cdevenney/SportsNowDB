import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";

function AvgHeightRatings({ teams, listName }) {
  return (
    <Card style={{ width: "80%" }}>
      <Card.Body>
        <Card.Title>{listName}</Card.Title>
        <Card.Text>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Player Height Group</th>
                <th>Avg Ratings</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr>
                  <td>{team.player_value}</td>
                  <td>{team.AvgRatings}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AvgHeightRatings;
