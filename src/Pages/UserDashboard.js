import React, { useState, useContext } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Modal, ListGroup } from 'react-bootstrap';
import { AddMWG, GetAllUsers, AddMemberToMWG } from '../Services/DataService'
import UserContext from '../Context/UserContext';

export default function UserDashboard() {

    let { username, setUsername, userId, setUserId, token, setToken } = useContext(UserContext);

    const [show, setShow] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    
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

    const CreateMWG = async () => {
        // AddMWG()
    } 


  return (
    <>
        <Container>
            <Row className='justify-content-center'>
                <Col md={6} className='text-center'>
                    <h1>Pick Flicks</h1>
                    <Row>
                        <Button variant="primary" onClick={handleShow}>Create new Watch Group</Button>
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
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder="Enter a name for the group"/>
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

            <Modal.Footer>
                <Button variant="secondary">Close</Button>
                <Button variant="primary" onClick={CreateMWG}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}
