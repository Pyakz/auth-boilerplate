import React, { useEffect, useState  } from 'react'
import { useToasts } from 'react-toast-notifications'
import axios from '../axios'
import RoomCards from './RoomCards'
import AddRoomModal from './AddRoomModal'

import { Button, Spinner } from 'react-bootstrap'

const Rooms = () => {
    const [loading, setLoading] = useState(true)
    const { addToast } = useToasts()
    const [rooms, setRooms] = useState([])
    const [inputs, setInputs] = useState({
        name:'',
        image:'',
        capacity: 1,
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        setLoading(true)
        axios.get('/rooms')
        .then(res => res.data)
        .then(data => {
            setRooms(data)
            setLoading(false)
        })
        .catch(error => {
            if (error) { 
                    addToast( error.response.data , { 
                    appearance: 'warning',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                })
            } 
      })
    },[addToast])

    

const loadingStyle = {
    display:'flex', 
    justifyContent:'center', 
    alignItems:'center', 
    height:'90vh'
}
    return (
        <main style={loading ? loadingStyle : null}>
            <Button variant="primary" className='floating' onClick={handleShow}> + </Button>
            {loading ? <Spinner animation="border" className='loading'/>
             :
             <RoomCards rooms={rooms} setRooms={setRooms} />}
            <AddRoomModal 
                show={show}  
                handleClose={handleClose} 
                inputs={inputs}
                setInputs={setInputs}
                setRooms={setRooms}
            />
        </main>
    )
}
export default Rooms

