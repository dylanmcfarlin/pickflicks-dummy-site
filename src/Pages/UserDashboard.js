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
  GetMWGByMWGName
} from "../Services/DataService";
import UserContext from "../Context/UserContext";
import CardComponent from "../Components/CardComponent";

export default function UserDashboard() {
  let { username, setUsername, userId, setUserId, token, setToken } =
    useContext(UserContext);

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

  const [allUsers, setAllUsers] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [allSearchedNames, setAllSearchedNames] = useState([]);
  const [mwgName, setmwgName] = useState("");
  const [mwgMembersId, setmwgMembersId] = useState([]);
  const [mwgMembersNames, setmwgMembersNames] = useState([]);
  const [allCreatedMWG, setAllCreatedMWG] = useState([]);

  useEffect(async () => {
    let lsUserId = localStorage.getItem('UserId')
    setUserId(lsUserId);
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
  const handleShow1 = async (e) => {
      console.log(e.target.textContent)
    // let mwgInfo = await GetMWGByMWGName(e.target.textContent);
    setShow1(true);
  }

  const CreateMWG = async () => {
    mwgMembersId.push(userId);
    handleClose();

    let newMWG = {
      Id: 0,
      MWGName: mwgName,
      GroupCreatorId: userId,
      MembersId: mwgMembersId.join(","),
      MembersNames: allSearchedNames.join(","),
      UserSuggestedMovies: "",
      IsDeleted: false,
    };
    console.log(newMWG);

    let result = await AddMWG(newMWG);
    //   AddMWG(newMWG)

    if (result) {
      console.log("yay it worked");
      let allCreatedMWG1 = await GetAllMWGAUserIsMemberOfuserId(userId);
      setAllCreatedMWG([...allCreatedMWG1]);
      // setDisplayOfYourMWG = GetAllCreatedMWGByUserId(userId);
      // setDisplayOfMWGYourMemberOf = GetAllMWGAUserIsMemberOf(userId);
    }
  };

<<<<<<< HEAD
    const handleClick = async () => {
        let foundUser = await GetUserByUsername(searchedName);
        if(foundUser != null && foundUser.id != 0)
        {
            allSearchedNames.push(searchedName);
            setAllSearchedNames([...allSearchedNames]);
            mwgMembersId.push(foundUser.id);
            console.log(mwgMembersId);
            console.log(allSearchedNames);
        }else{
          console.log("noooo")
          toggleShowA();
        }
    }

    const CreateMWG = async () => {
        mwgMembersId.push(userId);
        handleClose();

        let newMWG = {
            Id: 0,  
            MWGName: mwgName,
            GroupCreatorId: userId,
            MembersId: mwgMembersId.join(","),
            UserSuggestedMovies: '',
            IsDeleted: false
        }
        console.log(newMWG)

      let result = await AddMWG(newMWG);
    //   AddMWG(newMWG)

        if (result) {
            console.log("yay it worked")
            // setDisplayOfYourMWG = GetAllCreatedMWGByUserId(userId);
            // setDisplayOfMWGYourMemberOf = GetAllMWGAUserIsMemberOf(userId);
        }
    }


    // useEffect( async() => {
    //   let allCreatedMWG = await GetAllCreatedMWGByUserId(userId);
    //     console.log(allCreatedMWG)
    //     setAllCreatedMWG(allCreatedMWG); 
    // }, [])

 
=======
  // useEffect( async() => {
  //   let allCreatedMWG = await GetAllCreatedMWGByUserId(userId);
  //     console.log(allCreatedMWG)
  //     setAllCreatedMWG(allCreatedMWG);
  // }, [])
>>>>>>> f94d94411048e9b97a1d077b94148b6167d21a8a

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
                    if (!MWG.isDeleted) {
                        console.log(MWG)
                        return (
                        //     <Col>
                        //     <Card onClick={(e) => handleShow1(e)}>
                        //     <Card.Body>
                        //         <Card.Title>{MWG.mwgName}</Card.Title>
                        //         <Card.Text>
                        //         {MWG.membersNames}
                        //         </Card.Text>
                        //     </Card.Body>
                        //     </Card>
                        // </Col>
                        <CardComponent props={MWG}/>
                        );
                        
                    }
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

      {/* Modal for editing MWG */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit MWG</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <input
              type="text"
              value={mwgName}
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
                            action
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
          <Button variant="secondary" onClick={handleClose1}>
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
