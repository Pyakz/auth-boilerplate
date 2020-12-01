import React from 'react'
import axios from 'axios'
import { useHistory, Link, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { Nav, Navbar, Button } from 'react-bootstrap'
import Rooms from './Rooms'
import Boarders from './Boarders'
import PrivateRoute  from './PrivateRoutes'

const Home = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const LogOut = () => {
        axios.post('/users/logout')
        .then(res => {
            if(res.status === 200) {
                localStorage.removeItem('accessToken');
                dispatch({type:'LOGOUT'})
                history.push('/auth')
            }
        })
    }

    return (
        <div className='container-fluid'>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">MERN Boilerplate</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                            <Nav.Link 
                                as={Link} 
                                to='/' 
                                className={`${history.location.pathname === '/' && 'text-primary' }`} >
                                Rooms
                            </Nav.Link>
                            <Nav.Link 
                                as={Link} 
                                to='/boarders' 
                                className={`${history.location.pathname === '/boarders' && 'text-primary' } mx-2`} >
                                Boarders
                            </Nav.Link>  
                        <Button variant="outline-warning" onClick={() => LogOut()}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        <Switch>
            <PrivateRoute exact path='/' component={Rooms} />
            <PrivateRoute exact path='/boarders' component={Boarders} />
        </Switch>
        </div>
    )
}

export default Home
