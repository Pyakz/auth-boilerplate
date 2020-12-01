import { useEffect } from 'react'
import Login from './components/Login'
import Home from './components/Home'
import { PrivateRoute } from './components/PrivateRoutes';
import { Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    token  ? dispatch({type:'LOGIN'}) : dispatch({type:'LOGOUT'})
  },[dispatch])


  return (
      <div className="App">
        <Switch>
            <PrivateRoute exact={isLoggedIn ? false : true} path='/' component={Home} /> 
            <Route exact path='/auth' render={props => <Login {...props} />} /> 
            <Route path='*' render={props => <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'100vh'}}><h3>404 PAGE NOT FOUND</h3></div>} />
        </Switch>
      </div>
  );
}
export default App;
