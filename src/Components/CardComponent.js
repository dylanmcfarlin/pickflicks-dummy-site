import React, { useState, useContext } from "react";
import { Col, Card, Modal, Form, InputGroup, FormControl, Button, ListGroup, Row } from "react-bootstrap";
import UserContext from "../Context/UserContext";

export default function CardComponent({ props }) {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);

  let { username, setUsername, userId, setUserId, token, setToken } =
    useContext(UserContext);

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const [allUsers, setAllUsers] = useState([]);
  const [searchedName, setSearchedName] = useState("");
  const [allSearchedNames, setAllSearchedNames] = useState([]);
  const [mwgName, setmwgName] = useState("");
  const [mwgMembersId, setmwgMembersId] = useState([]);
  const [mwgMembersNames, setmwgMembersNames] = useState([]);
  const [allCreatedMWG, setAllCreatedMWG] = useState([]);

  const handleUpdateMWG = () => {
      let updatedMWG = {
        Id: props.id,
        MWGName: mwgName,
        GroupCreatorId: userId,
        MembersId: mwgMembersId.join(","),
        MembersNames: mwgMembersNames.join(","),
        UserSuggestedMovies: "",
        IsDeleted: false,
      }
  }

  const handleRemoveMember = (e) => {
    e.target.classList.toggle("active");
  }
 

  const handleShow1 = async (e) => {
      console.log(e)
      console.log(props.mwgName)
    setmwgName(props.mwgName);
    setmwgMembersNames(props.membersNames.split(","));
    setShow1(true);
  };
  return (
    <>
      <Col>
        <Card onClick={(e) => handleShow1(e)}>
          <Card.Body>
            <Card.Title>{props.mwgName}</Card.Title>
            <Card.Text>{props.membersNames}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      {/* Modal for editing MWG */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
        <Form>
              <InputGroup className="mb-3">
              <FormControl
                placeholder="MWG name"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={mwgName}
                onChange={({ target: { value } }) => setmwgName(value)}
              />
              </InputGroup>
              </Form>
          {/* <Modal.Title>{mwgName}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
        <ListGroup as="ul" >
                  {mwgMembersNames.map((member, idx) => {
                    return (
                      <>
                      <Row className="justify-content-center">
                        <Col xs={6}>
                            <ListGroup.Item
                            active
                                className="pointer"
                            as="li"
                            key={idx}
                            onClick={(e) => handleRemoveMember(e)}
                            // onClick={({ target: { value } }) => addMember(value)}
                            >
                            {member}
                            </ListGroup.Item>

                        </Col>

                      </Row>
                      </>
                    );
                  })}
                </ListGroup>
            
            
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateMWG}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
