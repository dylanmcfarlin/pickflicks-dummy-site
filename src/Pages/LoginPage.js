import React, { useState, useContext } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Login, GetUserByUsername } from '../Services/DataService'
import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    // useContext
    let { username, setUsername, userId, setUserId, token, setToken } = useContext(UserContext);
    let navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        let userData = {
            username,
            password: password
        };

        let fetchedToken = await Login(userData);
        console.log(fetchedToken);

        if (fetchedToken.token != null) {
            localStorage.setItem('Token', fetchedToken.token);
            let userInfo = await GetUserByUsername(userData.username)
            setToken(localStorage.getItem('Token'));
            console.log(userInfo);
            setUserId(userInfo.id);
            navigate("/dashboard");
        } else {
            // Do something
            toggleShowA();
        }
    }

  return (
    <>  
        <Container>
            <Row className='justify-content-center loginMarginTop'>
            <h3 className="text-center">Log In</h3>
                <Col md={3} className=''>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="username" placeholder="Username" onChange={({ target: { value } }) => setUsername(value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" onChange={({ target: { value } }) => setPassword(value)}/>
                        </Form.Group>
                        <div className='d-flex justify-content-center'>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Sign in
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col xs={3}>
                    <Button onClick={() => navigate("/createAcct")}>Click here to create an account</Button>
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
                <strong className="me-auto">Unable to login</strong>
            </Toast.Header>
            <Toast.Body>Username and/or password is incorrect. Please try again.</Toast.Body>
            </Toast>
        </ToastContainer>
    </>
  )
}
