
import './App.css';
import {Route, Link, Switch} from 'react-router-dom'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import FriendsList from './components/FriendsList'
function App() {

  const logout = () => {
    localStorage.removeItem('token')
  }
  return (
    <div >
      <ul>
          <li>
           <Link to="/login">Login</Link>
         </li>
         <li>
           <Link onClick={logout} to="/login">Logout</Link>
          </li>
         <li>
            <Link to="/friendslist">Friends!</Link>
       </li>
       </ul>
       <Switch>
         <PrivateRoute exact path="/friendslist" component={FriendsList} />
         <Route path="/login" component={Login} />
           <Route component={Login} />
        </Switch>
    </div>
  );
}

export default App;
