import React, { useEffect, useState  } from 'react'
import { useToasts } from 'react-toast-notifications'
import axios from '../axios'
import BoarderCards from './BoarderCards'
import { Button, Spinner} from 'react-bootstrap'
import AddBoarderModal from './AddBoarderModal';


const Boarders = () => {
    const { addToast } = useToasts()
    const [rooms, setRooms] = useState([])
    const [boarders, setBoarders] = useState([])
    const [loadingBoarders, setLoadingBoarders] = useState(true)
    const [loadingRooms, setLoadingRooms] = useState(true)

    const [roomID, setRoomID] = useState('')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
      setLoadingRooms(true)
      setLoadingBoarders(true)

      const  getBoarders = async () => {
        try {
          const res =  await axios.get('/boarders')
          const data = await res.data
          setBoarders(data)
        } catch (error) {
          if (error) addToast(error.response.data, {appearance: 'warning',autoDismiss: true, autoDismissTimeout: 3000})
        }
        setLoadingBoarders(false)
      }

      const getRooms = async () => {
        try {
          const res =  await axios.get('/rooms')
          const data = await res.data
          setRooms(data)
        } catch (error) {
          if (error) addToast(error.response.data, {appearance: 'warning',autoDismiss: true, autoDismissTimeout: 3000})
        }
        setLoadingRooms(false)
      }

      getBoarders()
      getRooms()
    },[addToast])



  const loadingStyle = {
      display:'flex', 
      justifyContent:'center', 
      alignItems:'center', 
      height:'90vh'
  }
  

    return (
        <main style={loadingBoarders && loadingRooms ? loadingStyle : null}>
       <Button variant="primary" className='floating' onClick={handleShow}> + </Button>

        { loadingBoarders && loadingRooms ? 
        <Spinner animation="border" className='loading'/> 
        : 
        <BoarderCards boarders={boarders} rooms={rooms} setBoarders={setBoarders} />  
        }
          
          <AddBoarderModal 
          boarders={boarders}
          setBoarders={setBoarders}
          show={show} 
          handleClose={handleClose} 
          setRoomID={setRoomID} 
          roomID={roomID} 
          rooms={rooms} />
        </main >
    )
}


export default Boarders
