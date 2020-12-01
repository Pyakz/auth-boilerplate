import React,{useState} from 'react'
import { useToasts } from 'react-toast-notifications'
import axios from '../axios'
import { 
        Button,
        Col, 
        Modal,
        Form } from 'react-bootstrap'

const AddRoomModal = ({show,handleClose,setInputs,inputs,setRooms}) => {
    
            const [error, setError] = useState(false)
            const { addToast } = useToasts()
            const [validated, setValidated] = useState(false);
            let f1 = '', f2 = '', f3 = ''

            const handleChange = e => {
                const { name, value } = e.target;
                setInputs(prevState => ({
                    ...prevState,
                    [name]: value,
                }));
            };
            const submitHandler = (e) => {
                const features = f1.concat(f2, f3).split(' ').filter(notEmpty => notEmpty !== "");
                const data = {
                    ...inputs,
                    features
                }
        
                const form = e.currentTarget;
                if (form.checkValidity() === false) {
                  e.preventDefault();
                  e.stopPropagation();
                }
            
                setValidated(true);
                axios.post('/rooms', data ).then(res => {
                   setError(false)
                   setInputs({       
                   name:'',
                   image:'',
                   capacity: 1,})
                   addToast(res.data.message,{ 
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 3500,
                })
                  }).catch(error => {
                    setError(true)
                    if (error) { addToast( error.response.data , { 
                      appearance: 'warning',
                      autoDismiss: true,
                      autoDismissTimeout: 3000,
                  })} 
              });

              if(!error) {
                axios.get('/rooms')
                    .then(res => res.data)
                    .then(data => {
                        setRooms(data)
                    })
                    .catch(error => {
                        if (error) { addToast( error.response.data , { 
                        appearance: 'warning',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    })} 
                })
              }
              
              handleClose()
              e.preventDefault()
            }
            return ( 
            <Modal   show={show} onHide={handleClose} centered className='p-4' >
                <Modal.Header closeButton>
                    <Modal.Title>Add Room</Modal.Title>
                </Modal.Header>
                
                <Form  validated={validated} className='p-4' onSubmit={(e) => submitHandler(e)} >
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Room Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            placeholder="Room Name"             
                            onChange={handleChange}
                            value={inputs.name}
                            name="name"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control 
                                required
                                type="number" 
                                onChange={handleChange}
                                value={inputs.capacity}
                                name="capacity"
                            />
                        </Form.Group>
                    </Form.Row>
        
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Photo</Form.Label>
                            <Form.Control 
                            type="text" 
                            required
                            placeholder="Image Link"
                            onChange={handleChange}
                            value={inputs.image}
                            name="image"
                            />
                    </Form.Group>
                    </Form.Row>
        
                    <Form.Row>
                        <Form.Group as={Col}>
                                <Form.Label>Feature 1</Form.Label>
                                <Form.Control 
                                onChange={(e) => f1 = `${e.target.value} `}
                                type="text" 
                                required
                                placeholder="Feature #1" 
                                className=''/>
                        </Form.Group>
                        <Form.Group as={Col}>
                                <Form.Label>Feature 2</Form.Label>
                                <Form.Control 
                                onChange={(e) => f2 = `${e.target.value} `}
                                type="text" 
                                required
                                placeholder="Feature #2" 
                                className=''/>
                        </Form.Group>
                        <Form.Group as={Col}>
                                <Form.Label>Feature 3</Form.Label>
                                <Form.Control 
                                onChange={(e) => f3 = `${e.target.value}`}
                                type="text" 
                                required
                                placeholder="Feature #3" 
                                className=''/>
                        </Form.Group>
                    </Form.Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
        
                </Form>
            </Modal>
        )
}

export default AddRoomModal
