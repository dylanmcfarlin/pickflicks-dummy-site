import React, { useState, useContext } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  ListGroup,
  InputGroup,
  FormControl,
  Toast
} from "react-bootstrap";
import { AddMWG, GetAllUsers, AddMemberToMWG, GetUserByUsername } from "../Services/DataService";
import UserContext from "../Context/UserContext";

export default function UserDashboard() {

    let { username, setUsername, userId, setUserId, token, setToken } = useContext(UserContext);

    const [show, setShow] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [searchedName, setSearchedName] = useState("");
    const [mwgName, setmwgName] = useState('');
    const [mwgMembersId, setmwgMembersId] = useState([]);
    
    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        let fetchedData = await GetAllUsers();
        console.log(fetchedData);
        setAllUsers(fetchedData);
    }
    
    const addMember = async (e) => {
        AddMemberToMWG(e)
    }

  const handleClick = async () => {
      let foundUser = await GetUserByUsername(searchedName);
      if(foundUser != null)
      {
        allSearchedNames.push(searchedName);
        setAllSearchedNames([...allSearchedNames]);
        console.log(allSearchedNames);
      }else{
          console.log("noooo")
        setShowA(!showA)
      }
  }

    const addMember = async (e) => {
        AddMemberToMWG(e);
    };

    const CreateMWG = async () => {
        handleClose();

        let newMWG = {
            Id: 0,  
            MWGName: mwgName,
            GroupCreatorId: userId,
            MembersId: mwgMembersId,
            UserSuggestedMovies: '',
            IsDeleted: false
        }

      let result = await AddMWG(newMWG);
      AddMWG(newMWG)

        if (result) {
            // setDisplayOfYourMWG = GetAllCreatedMWGByUserId(userId);
            // setDisplayOfMWGYourMemberOf = GetAllMWGAUserIsMemberOf(userId);
        }
    }
 

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <h1>Pick Flicks</h1>
            <Row>
              <Button variant="primary" onClick={handleShow}>
                Create new Watch Group
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new Watch Group</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={searchedName}
                onChange={({ target: { value } }) => setSearchedName(value)}
              />
              <Button variant="outline-secondary" id="button-addon2" onClick={handleClick}>
                Button
              </Button>
            </InputGroup>
            <Col md={6} className="text-center">
              <Form.Label>Add members to the group</Form.Label>
              <Row className="justify-content-center ">
                <ListGroup as="ul">
                  {allSearchedNames.map((user, idx) => {
                    return (
                      <>
                        <ListGroup.Item
                          as="li"
                          key={idx}
                          // onClick={({ target: { value } }) => addMember(value)}
                        >
                          {user}
                        </ListGroup.Item>
                      </>
                    );
                  })}
                </ListGroup>
              </Row>
            </Col>
          </Form>
        </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={CreateMWG}>Save changes</Button>
            </Modal.Footer>
        </Modal>

        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
    </>
  );
}
