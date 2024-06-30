import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

export default function ChangeRating({ getPl, findMatches }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [player_id, setPlayer_id] = useState("");
  const [rating, setRating] = useState("");

  const changeRating = () => {
    Axios.put("http://34.125.165.198/updatePlayer", {
      player_id: player_id,
      rating: rating,
    })
      .then(getPl)
      .then(findMatches);
    handleClose();
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
      <Button variant="primary" onClick={handleShow}>
        Change Rating
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Player</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="information">
            <label>Confirm Player ID: </label>
            <input
              type="text"
              onChange={(event) => {
                setPlayer_id(event.target.value);
              }}
            />

            <label> New Rating: </label>
            <input
              type="text"
              onChange={(event) => {
                setRating(event.target.value);
              }}
            />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={changeRating}>
            Change Player Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
