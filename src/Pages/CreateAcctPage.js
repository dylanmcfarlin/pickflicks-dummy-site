import React, {useState, useContext} from 'react'
import {Form, Row, Col, Container, Button, ToastContainer, Toast} from 'react-bootstrap'
import { AddUser, GetUserByUsername } from '../Services/DataService'
import { useNavigate } from 'react-router-dom';
import UserContext from '../Context/UserContext';

export default function CreateAcctPage() {
    let navigate = useNavigate();
    // useContext
    let { username, setUsername, userId, setUserId, token, setToken } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        let newUserData = {
            username: username,
            password: password
        };
            let result = await AddUser(newUserData)
        if(result){
            //should the use login too to get token
            let userInfo = await GetUserByUsername(username);
            setUsername(userInfo.username);
            setUserId(userInfo.id);
            navigate("/dashboard");
        }
        else {
            // Do something
            toggleShowA();
        }
    }

  return (
      <>
        <Container>
            <Row className='justify-content-center loginMarginTop'>
                <Col md={3} className=''>
                    <h3 className="text-center">Create an Account</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="username" placeholder="Create Username" onChange={({ target: { value } }) => setUsername(value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Create Password" onChange={({ target: { value } }) => setPassword(value)}/>
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Create Account
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
        <ToastContainer position="top-center">
            <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
                <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
                />
                <strong className="me-auto">Unable to create an account</strong>
            </Toast.Header>
            <Toast.Body> Please check if you already have one made.</Toast.Body>
            </Toast>
        </ToastContainer>
      </>
  )
}
