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
  FormControl
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

<<<<<<< HEAD
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter a name for the group"
                        onChange={({ target: { value } }) => setmwgName(value)}/>
                    </Form.Group>
                    <Col md={6} className="text-center">
                        <Form.Label>Add members to the group</Form.Label>
                        <Row className="justify-content-center ">
                            <ListGroup as="ul">
                                    {
                                        allUsers.map((user, idx) => {
                                            return (
                                                <>
                                                    <ListGroup.Item as="li"
                                                    key={idx}
                                                    onClick={({ target: { value } }) => addMember(value)}
                                                    >{user.username}</ListGroup.Item>
                                                </>
                                            )
                                        })
                                    }
                            </ListGroup>
                        </Row>
                    </Col>
                </Form>
            </Modal.Body>
=======
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
                  {allUsers.map((user, idx) => {
                    return (
                      <>
                        <ListGroup.Item
                          as="li"
                          key={idx}
                          onClick={({ target: { value } }) => addMember(value)}
                        >
                          {user.username}
                        </ListGroup.Item>
                      </>
                    );
                  })}
                </ListGroup>
              </Row>
            </Col>
          </Form>
        </Modal.Body>
>>>>>>> c9f76e90ba4c377ce21c6fff07ed1399382b541c

<<<<<<< HEAD
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary" onClick={CreateMWG}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
=======
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={CreateMWG}>Save changes</Button>
            </Modal.Footer>
        </Modal>
>>>>>>> 493ca7391e4d6a30c45ac9c310939056bdbb54df
    </>
  );
}
