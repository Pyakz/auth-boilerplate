import React, { useState  } from 'react'
import { useToasts } from 'react-toast-notifications'
import axios from '../axios'

import { Card, 
        Button,
        ButtonGroup,
        ListGroup,
        ListGroupItem, 
        Row, 
        Col, 
        Modal,
        Form } from 'react-bootstrap'

const BoarderCard = ({ boarders, rooms, setBoarders }) => {

    const { addToast } = useToasts()
    const [show, setShow] = useState(false);
    const [toDelete, setToDelete] = useState(null);
    const [toEdit, setToEdit] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const  getBoarders = async () => {
        try {
          const res =  await axios.get('/boarders')
          const data = await res.data
          setBoarders(data)
        } catch (error) {
          error && addToast(error.response.data, {appearance: 'warning',autoDismiss: true, autoDismissTimeout: 3000})
        }
    }
    const editHandler = (e) => { 
        axios.patch(`/boarders/${toEdit._id}`,toEdit)
        .then(res => {
            addToast(res.data.message,{ 
             appearance: 'success',
             autoDismiss: true,
             autoDismissTimeout: 3000,
         })
        }).catch(error => {
            if (error) addToast(error.response.data,{ appearance: 'warning', autoDismiss: true, autoDismissTimeout: 3000})
       });
        getBoarders()
        setToEdit(null)
        handleClose()
        e.preventDefault()
    }
    const deleteHandler = (e) => {
        axios.delete(`/boarders/${toDelete}`)
        .then(res => addToast(res.data.message,{ appearance: 'info', autoDismiss: true, autoDismissTimeout: 3000}))
        .catch(error => {
            if (error) addToast(error.response.data,{ appearance: 'warning', autoDismiss: true, autoDismissTimeout: 3000})
        });
        getBoarders()
        setToDelete(null)
        handleClose()
        e.preventDefault()
    }
        


    const handleChange = e => {
        const { name, value } = e.target;
        setToEdit(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Row  className='mx-auto m-2'>
            {boarders.map((boarder) => (
                <Col key={boarder._id} md={3} >
                    <Card className="m-2 boardercard">
                        <Card.Img style={{width:'100%', height:'20rem'}} variant="top" src={boarder.picture ? boarder.picture : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS03tiLB6qXhk3r4HFnEu709l15NEbmeEYtog&usqp=CAU'} />
                        <Card.Body>
                        <Card.Title>{boarder.name}</Card.Title>
                        <ListGroup className="m-2">

                            <ListGroupItem>Contact: {boarder.contactNum}</ListGroupItem>
                            <ListGroupItem>Parent: {boarder.parentNum}</ListGroupItem>
                            <ListGroupItem>Room: {boarder.roomID && boarder.roomID.name ? boarder.roomID.name : 'Undefined or Deleted'}</ListGroupItem>

                        </ListGroup>
                        </Card.Body>
                        <ButtonGroup>
                                <Button variant="secondary"
                                    onClick={(e) => {
                                        handleShow()
                                        setToEdit(boarder)
                                    }}
                                >Edit</Button>
                                <Button variant="warning" onClick={(e) => {
                                    handleShow()
                                    setToDelete(boarder._id)
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
                                <Form.Label>Boarder Name</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Name"             
                                onChange={handleChange}
                                value={toEdit.name}
                                name="name"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Picture</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Picture"             
                                onChange={handleChange}
                                value={toEdit.picture}
                                name="picture"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Contact</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Contact Number"             
                                onChange={handleChange}
                                value={toEdit.contactNum}
                                name="contactNum"/>
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Parent Contact</Form.Label>
                                <Form.Control 
                                type="text" 
                                placeholder="Parent Contact"             
                                onChange={handleChange}
                                value={toEdit.parentNum}
                                name="parentNum"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Room</Form.Label>
                                <Form.Control as="select" 
                                            custom  
                                            name="roomID" 
                                            onChange={e => handleChange}    
                                            disabled   
                                            >
                                    {rooms.map(room => <option key={room._id} value={room._id}> {room.name} </option>)}
                                    </Form.Control>
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


export default BoarderCard