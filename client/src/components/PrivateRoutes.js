import { Redirect, Route } from 'react-router-dom'
import Decode from 'jwt-decode'
import axios from 'axios'

const checkToken = () => {
    const token = localStorage.getItem('accessToken')
    if(!token) { return false }
    try {
        const { exp } = Decode(token)
        const dateNow = new Date();
        if( exp < dateNow.getTime() / 1000) {
          axios.post('/users/token')
          .then(res => res.data)
          .then(data => {
            localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
            return true
          }).catch(error => {
              console.log(error.response.data);
          })
         }
    } catch (error) { return false }
    return true
  }
  
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    return (
    <Route {...rest} render = { props => 
          checkToken() ? (
            <Component {...props} />
            ) : (
            <Redirect to="/auth"/>
            )
         }
    />
    )
};

export default PrivateRoute
