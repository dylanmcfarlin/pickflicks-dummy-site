import React, { useState, useEffect, useContext } from "react";
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
  Toast,
  ToastContainer,
  Card,
} from "react-bootstrap";
import {
  AddMWG,
  GetAllUsers,
  AddMemberToMWG,
  GetUserByUsername,
  GetAllCreatedMWGByUserId,
  GetAllMWGAUserIsMemberOfuserId,
} from "../Services/DataService";
import UserContext from "../Context/UserContext";

export default function UserDashboard() {
  let { username, setUsername, userId, setUserId, token, setToken } =
    useContext(UserContext);

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [show, setShow] = useState(false);

  const [allUsers, setAllUsers] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [allSearchedNames, setAllSearchedNames] = useState([]);
  const [mwgName, setmwgName] = useState("");
  const [mwgMembersId, setmwgMembersId] = useState([]);
  const [allCreatedMWG, setAllCreatedMWG] = useState([]);

  useEffect(async () => {
    let lsUserId = localStorage.getItem('UserId')
    let allCreatedMWG1 = await GetAllMWGAUserIsMemberOfuserId(lsUserId);
    setAllCreatedMWG(allCreatedMWG1);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    // let fetchedData = await GetAllUsers();
    // console.log(fetchedData);
    // setAllUsers(fetchedData);
  };

  const AddMember = async (e) => {
    AddMemberToMWG(e);
  };

  const handleClick = async () => {
    let foundUser = await GetUserByUsername(searchedName);
    if (foundUser != null && foundUser.id != 0) {
      allSearchedNames.push(searchedName);
      setAllSearchedNames([...allSearchedNames]);
      mwgMembersId.push(foundUser.id);
      console.log(mwgMembersId);
      console.log(allSearchedNames);
    } else {
      console.log("noooo");
      toggleShowA();
    }
  };

  const CreateMWG = async () => {
    mwgMembersId.push(userId);
    handleClose();

    let newMWG = {
      Id: 0,
      MWGName: mwgName,
      GroupCreatorId: userId,
      MembersId: mwgMembersId.join(","),
      MembersNames: "",
      UserSuggestedMovies: "",
      IsDeleted: false,
    };
    console.log(newMWG);

    let result = await AddMWG(newMWG);
    //   AddMWG(newMWG)

    if (result) {
      console.log("yay it worked");
      // setDisplayOfYourMWG = GetAllCreatedMWGByUserId(userId);
      // setDisplayOfMWGYourMemberOf = GetAllMWGAUserIsMemberOf(userId);
    }
  };

  // useEffect( async() => {
  //   let allCreatedMWG = await GetAllCreatedMWGByUserId(userId);
  //     console.log(allCreatedMWG)
  //     setAllCreatedMWG(allCreatedMWG);
  // }, [])

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
            <Row>
              <Row xs={1} md={2} className="g-4">
                {allCreatedMWG.map((MWG) => {
                    return (
                        <Col>
                        <Card>
                        <Card.Body>
                            <Card.Title>{MWG.mwgName}</Card.Title>
                            <Card.Text>
                            {MWG.membersId}
                            </Card.Text>
                        </Card.Body>
                        </Card>
                    </Col>
                    );
                })}
                
              </Row>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="bottom-center">
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
          <Toast.Body>Unable to add member to {mwgName}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new Watch Group</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <input
              type="text"
              onChange={({ target: { value } }) => setmwgName(value)}
            ></input>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={searchedName}
                onChange={({ target: { value } }) => setSearchedName(value)}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleClick}
              >
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={CreateMWG}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
