import React from 'react';
import './App.css';
import ForgotPassword from './ForgotPassword'
import SignUp from './SignUp';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignOut from './SignOut'
import Verify from './Verify';
import Dashboard from './Dashboard'
import { AuthContextProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
   return (
<div className="app">
   <Router>
      <Switch>
      <Route path="/forgot"><ForgotPassword/></Route>
         <Route path="/verify_password/:token"  children={<Verify />}/>
         <Route path="/signup"><SignUp /></Route>
       <AuthContextProvider>
       <Route path="/signout"><SignOut /></Route>
       <Route path="/login"><Login /></Route> 
       <ProtectedRoute path="/dashboard" component={Dashboard} />
       </AuthContextProvider>
      </Switch>
   </Router>
</div>
   );
}

export default App;