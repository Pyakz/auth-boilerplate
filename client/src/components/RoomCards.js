import React, { useState  } from 'react'
import { useToasts } from 'react-toast-notifications'
import axios from 'axios'

import { Card, 
        Button,
        ButtonGroup,
        ListGroup,
        ListGroupItem, 
        Row, 
        Col, 
        Modal,
        Form } from 'react-bootstrap'

const RoomCards = ({rooms,setRooms}) => {
    const [error, setError] = useState(false)
    const { addToast } = useToasts()
    
    const deleteHandler = (e) => {
        axios.delete(`/rooms/${toDelete}`).then(res => {
            addToast(res.data.message,{ 
            appearance: 'success',
            autoDismiss: true,
            autoDismissTimeout: 3500,
        })})
        .catch(error => {
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
                .then(data => setRooms(data))
                .catch(error => {
                    if (error) { addToast( error.response.data , { 
                    appearance: 'warning',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                })} 
            })
          }
         setToDelete(null)
         handleClose()
        e.preventDefault()
    }
        
     const editHandler = (e) => { 
                const data = {
                    ...toEdit,
                }

          axios.patch(`/rooms/${toEdit._id}`,data)
                .then(res => {
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
                   })
                 } 
               });

               if(!error) {
                axios.get('/rooms')
                    .then(res => res.data)
                    .then(data => setRooms(data))
                    .catch(error => {
                        if (error) { addToast( error.response.data , { 
                        appearance: 'warning',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    })} 
                })
              }
               setToEdit(null)
               handleClose()
               e.preventDefault()
    }
        
    const [show, setShow] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [toEdit, setToEdit] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
        
    const handleChange = e => {
        const { name, value } = e.target;
        setToEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
    <Row  className='mx-auto m-2'>
            { rooms.map(room => (
                <Col key={room._id}  md={4} >
                <Card className='my-2' style={{width:'100%'}}>
                      <Card.Img style={{width:'100%', height:'20rem'}}  variant="top" src={room.image ? room.image : 'https://complianz.io/wp-content/uploads/2019/03/placeholder-300x202.jpg'} />
        
                          <Card.Body>
                             <Card.Title>Name: {room.name}</Card.Title>
                             <Card.Title>Capacity: {room.capacity}</Card.Title>
                               <Card.Header>Features</Card.Header>
                               <ListGroup className="list-group-flush">
                              {room.features.map((feature, index) => (
                              <ListGroupItem key={index}>{feature}</ListGroupItem>))}
                            </ListGroup>
                        </Card.Body>
                        <Card.Body>
                            <Card.Header>Boarders</Card.Header>
                              <ListGroup className="list-group-flush">
                                {room.boarders.map((boarder, index) => (
                              <ListGroupItem key={index}>{boarder.name}</ListGroupItem>))}
                            </ListGroup>
                        </Card.Body>
                        
                         <ButtonGroup>
                               <Button variant="secondary"
                               onClick={(e) => {
                                   handleShow()
                                   setToEdit(room)
                               }}
                               >Edit</Button>
                              <Button variant="warning" onClick={(e) => {
                                   handleShow()
                                  setToDelete(room._id)
                              }}>Remove</Button>
                        </ButtonGroup>
                 </Card>
            </Col>
         ))}

            { toEdit && <Modal show={show} onHide={() => {
                                        setToEdit(null)
                                        handleClose()
                                    }} centered className='p-4'>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit</Modal.Title>
                                        </Modal.Header>
            
                                <Form className='p-4'>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Room Name</Form.Label>
                                            <Form.Control 
                                            type="text" 
                                            required
                                            placeholder="Room Name"             
                                            onChange={handleChange}
                                            value={toEdit.name}
                                            name="name"/>
                                        </Form.Group>
            
                                        <Form.Group as={Col}>
                                            <Form.Label>Capacity</Form.Label>
                                            <Form.Control 
                                                type="number"
                                                required 
                                                onChange={handleChange}
                                                value={toEdit.capacity}
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
                                                value={toEdit.image}
                                                name="image"
                                                />
                                        </Form.Group>
                                    </Form.Row>
            
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                    <Form.Label>Feature 1</Form.Label>
                                                    <Form.Control 
                                                    type="text" 
                                                    disabled
                                                    placeholder="Feature #1" 
                                                    className=''/>
                                            </Form.Group>
                                        <Form.Group as={Col}>
                                                    <Form.Label>Feature 2</Form.Label>
                                                    <Form.Control 
                                                    type="text" 
                                                    disabled
                                                    placeholder="Feature #2" 
                                                    className=''/>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                    <Form.Label>Feature 3</Form.Label>
                                                    <Form.Control 
                                                    type="text" 
                                                    disabled
                                                    placeholder="Feature #3" 
                                                    className=''/>
                                            </Form.Group> 
                                        </Form.Row> 
                                    </Form>
            
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => {
                                            setToEdit(null)
                                            handleClose()
                                        }}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={editHandler}>
                                            Yes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>  } 
            
            { toDelete && <Modal show={show} onHide={() => {
                                        setToDelete(null)
                                        handleClose()
                                    }} centered className='p-4'>
                                    <Modal.Body>Are you sure you want to delete?</Modal.Body>
                                    <Modal.Footer>
                                    <Button variant="secondary" onClick={() => {
                                                setToDelete(null)
                                                handleClose() }}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={deleteHandler}>
                                        Yes
                                    </Button>
                                    </Modal.Footer>
                                </Modal>  } 
            
        </Row>
    )
}
        

export default RoomCards
