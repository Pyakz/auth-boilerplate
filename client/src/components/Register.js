import React, { useState } from 'react'
import { Modal, Button, Form, Col, Alert } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'
import axios from '../axios';

const Register = ({ show, handleClose,setSuccess,setRegistered }) => {
    const { addToast } = useToasts()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [validated, setValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.preventDefault();
          e.stopPropagation();
        }
        setLoading(true)
        axios.post('/users/register', {
                  username: username.toLowerCase(),
                  password: password.toLowerCase(),
                  role:'demo'
                }).then(res => {
                  handleClose()
                  setLoading(false)
                  setSuccess(true)
                  setRegistered({
                    username: username.toLowerCase(),
                    password: password.toLowerCase()
                  })
                  addToast(res.response.data,{ appearance: 'success',autoDismiss: true,autoDismissTimeout: 2000})
                }).catch(error => {
                  setLoading(false)
                    if(error.response) {
                        setErrorMessage(error.response.data)
                        setTimeout(() => setErrorMessage(false),2000)
                    }
              });

        setValidated(true);
        e.preventDefault()
      };
    return ( 
        <Modal show={show} onHide={handleClose} style={{opacity: loading ? '0.7' : 1}}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {errorMessage && <Alert variant='warning' >{errorMessage}</Alert>}
         
           <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label> Username </Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                  <Form.Text id="passwordHelpBlock" muted>
                        Your username must be 4 characters long or longer.
                    </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                
                </Form.Group>
                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                    <Form.Text id="passwordHelpBlock" muted>
                        Your password must be 4 characters long or longer.
                    </Form.Text>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

               
            </Form.Row>
                <Button variant="secondary" onClick={handleClose} className='mr-3'>
                    Cancel
                </Button>
                <Button variant="primary" type='submit'>
                    Register
                </Button>
            </Form>
        </Modal.Body>
      </Modal>
    )
}

export default Register
