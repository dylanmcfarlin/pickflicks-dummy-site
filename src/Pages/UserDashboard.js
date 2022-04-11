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
  GetMWGByMWGName,
  AddMovieToMWG,
  fetchFromAPIFromPageNumber,
  fetchFromAPI,
  fetchFromAPIByTitle
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
    let lsUsername = localStorage.getItem('Username');
    setUsername(lsUsername);
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
      mwgMembersNames.push(searchedName);
      setmwgMembersNames([...mwgMembersNames]);
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
        mwgMembersNames.push(username);
        handleClose();

        let newMWG = {
            Id: 0,  
            MWGName: mwgName,
            GroupCreatorId: userId,
            MembersId: mwgMembersId.join(","),
            membersNames: mwgMembersNames.join(","),
            UserSuggestedMovies: '',
            IsDeleted: false
        }
        console.log(newMWG)

      let result = await AddMWG(newMWG);
    //   AddMWG(newMWG)

        if (result) {
            console.log("yay it worked")
            let mwg = await GetAllMWGAUserIsMemberOfuserId(userId);
            setAllCreatedMWG([...mwg]);
            // setDisplayOfYourMWG = GetAllCreatedMWGByUserId(userId);
            // setDisplayOfMWGYourMemberOf = GetAllMWGAUserIsMemberOf(userId);
        }
    }

    const handleAddMovie = async () => {
      let newMovie = {
        Id: 0,
        MWGId: 1,
        SessionId: 1,
        MovieName: 'Anne Frank',
        MovieOverview: 'She dies',
        MovieReleaseYear: 2006,
        MovieIMDBRating: 6,
        MovieImage: 'image.jpg'
      }
      let result = await AddMovieToMWG(newMovie)
      console.log(result);
    }
    
    const fetchFromAPIBtn = async () => {
      let result = await fetchFromAPI();
      //console.log(result);
      let totalPages = result.total_pages;
      let rNum = Math.floor(Math.random()*totalPages) + 1;
      console.log(rNum);
      let totalMovies = await fetchFromAPIFromPageNumber(rNum);
      console.log(totalMovies);

      let randomList = [];
      for(let i=0; i< 20; i++)
      {
        let newRnum = Math.floor(Math.random()*250);
        if(!randomList.includes(newRnum))
        {
          randomList.push(totalMovies.titles[newRnum].id)
        }
      }
      console.log(randomList)
      //go thru randomList array and fetch each movie
      for(let i=0; i<randomList.length; i++)
      {
        let newMovieObject = await fetchFromAPIByTitle(randomList[i])
        console.log(newMovieObject);

        let newMovieToAdd = {
          Id: 0,
          MWGId: 1,
          SessionId: 0,
          MovieName: newMovieObject.title,
          MovieOverview: newMovieObject.plot_overview,
          MovieReleaseYear: newMovieObject.year,
          MovieIMDBRating: newMovieObject.user_rating,
          MovieImage: newMovieObject.poster
        }

        let result = await AddMovieToMWG(newMovieToAdd);
        console.log(result);
      }
    }

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
        
        <Row className="mt-5">
          <Button onClick={handleAddMovie}>Add Movie to MovieModel</Button>
        </Row>
        <Row className="mt-5">
          <Button onClick={fetchFromAPIBtn}>Get total number of pages</Button>
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
