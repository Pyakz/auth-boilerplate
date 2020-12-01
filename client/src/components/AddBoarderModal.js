import React, { useState  } from 'react'
import axios from '../axios'
import { Button, Modal, Col, Form } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'


const AddBoarderModal = ({show, handleClose,roomID, setRoomID, rooms, setBoarders}) => {
    const { addToast } = useToasts()
    const handleChange = e => {
        const { name, value } = e.target;
          setInputs(prevState => ({
              ...prevState,
              [name]: value
          }));
      };
      const [validated, setValidated] = useState(false);

      const [inputs, setInputs] = useState({
        name:'',
        picture:'',
        contactNum:'',
        parentNum:'',
    })
    const  getBoarders = async () => {
        try {
          const res =  await axios.get('/boarders')
          const data = await res.data
          setBoarders(data)
        } catch (error) {
          error && addToast(error.response.data, {appearance: 'warning',autoDismiss: true, autoDismissTimeout: 3000})
        }
    }
    const submitHandler = (e) => {
        const newInput = { 
            ...inputs,
            roomID
          }
          const form = e.currentTarget;
          if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
          }
          setValidated(true);
        axios.post('/boarders', newInput).then(res => {
           getBoarders()
           setInputs({      
           name:'',
           picture:'',
           contactNum:'',
           parentNum:''
        })
           addToast(res.data.message,{ 
            appearance: 'success',
            autoDismiss: true,
            autoDismissTimeout: 3500,
        })
          }).catch(error => {
            if (error) { addToast( error.response.data , { 
              appearance: 'warning',
              autoDismiss: true,
              autoDismissTimeout: 3000,
          })} 
      });

      handleClose()
      e.preventDefault()
    }
    return (
        <Modal show={show} onHide={() => {
            handleClose()
        }} centered className='p-4'>
            <Modal.Header closeButton>
                <Modal.Title>Add</Modal.Title>
            </Modal.Header>
            <Form className='p-4' validated={validated} onSubmit={(e) => submitHandler(e)}> 
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Boarder Name</Form.Label>
                    <Form.Control 
                    required
                    type="text" 
                    placeholder="Name"             
                    onChange={handleChange}
                    name="name"/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Picture</Form.Label>
                    <Form.Control 
                    type="text" 
                    required
                    placeholder="Picture"             
                    onChange={handleChange}
                    name="picture"/>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                    type="text" 
                    required
                    placeholder="Contact Number"             
                    onChange={handleChange}
                    name="contactNum"/>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Parent Contact</Form.Label>
                    <Form.Control 
                    type="text" 
                    required
                    placeholder="Parent Contact"             
                    onChange={handleChange}
                    name="parentNum"/>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Room</Form.Label>
                       <Form.Control as="select" 
                         
                                name="roomID" 
                                onChange={e => setRoomID(e.target.value)}   
                                value={roomID}
                                >
                                <option value="" disabled defaultValue> Select </option>
                        {rooms.map(room => <option key={room._id} value={room._id}> {room.name} </option>)}
                        </Form.Control>
                </Form.Group>
             </Form.Row>
            <Button variant="secondary" onClick={() => handleClose()} className='mx-2'>
                Cancel
            </Button>
                <Button variant="primary" type='submit'>
                Yes
            </Button>
            </Form>
    </Modal>
    )
}

export default AddBoarderModal
