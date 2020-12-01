import React, { useState } from 'react'
import axios from 'axios'
import UserAvatar from '../assets/avatar.png'
import { Spinner } from 'react-bootstrap'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { addToast } = useToasts()

// SOME STATES 
const [username, setUsername] = useState('your_demo')
const [password, setPassword] = useState('iamdemo')
const [loading, setLoading] = useState(false)


const onSubmit = e => {
  setLoading(true)
  axios.post('/users/login', {
            username: username.toLowerCase(),
            password: password.toLowerCase()
          }).then(res => {
            setLoading(false)
            localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
            dispatch({type:'LOGIN'})
            history.push("/");
          }).catch(error => {
            setLoading(false)
            if (error) { addToast( error.response.data , { 
              appearance: 'warning',
              autoDismiss: true,
              autoDismissTimeout: 3000,
          })
        } 
      });
  e.preventDefault()
}
    return (
      <div className='LOGIN_CONTAINER'>
        <form className='LOGIN_FORM rounded' onSubmit={(e) => onSubmit(e)} style={{ opacity: loading ? "0.8" : 1 }}>
                <img 
                className='LOGIN_USER text-center p-3'
                src={UserAvatar} alt="USER" />
                <h5 className='text-center'>Apartment Management</h5>
                <h5 className='text-center  mb-4'>Boilerplate</h5>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <label>Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group my-4">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-dark btn-block">
                  { loading ? <Spinner animation="border" variant="primary" size="sm"/> : "LOGIN" }
                </button>  
            </form>
        </div>
    )
}

export default Login
