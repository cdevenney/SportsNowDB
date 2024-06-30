import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";
import "./NewUser.css";

export default function NewUser() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const getUsers = () => {
  //   Axios.get("http://localhost:3001/users").then((response) => {
  //     setUserList(response.data);
  //   });
  // };
  const [userList, setUserList] = useState([]);

  const addUser = () => {
    Axios.post("http://34.125.165.198/create", {
      username: username,
      password: password,
      email: email,
      name: name,
    }).then(() => {
      setUserList([
        ...userList,
        {
          username: username,
          password: password,
          email: email,
          name: name,
        },
      ]);
    });
    handleClose();
  };

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        New User
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="information">
            <label>Username: </label>
            <input
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />

            <label> Password: </label>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <label> Email: </label>
            <input
              type="text"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            <label> Name: </label>
            <input
              type="text"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <br />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addUser}>
            Create User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
