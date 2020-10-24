import React from 'react';
import './App.css';
import ForgotPassword from './ForgotPassword'
import SignUp from './SignUp';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import SignOut from './SignOut'
import PasswordRest from './PasswordReset'
import CustomizedSnackbars from './Snakbar';
import Dashboard from './Dashboard'
import { AuthContextProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
function App() {
   return (
<div className="app">
   <Router>
      <Switch>
      <Route path="/forgot_password"><ForgotPassword/></Route>
         <Route path="/verify_password"><CustomizedSnackbars/><PasswordRest/></Route>
         <Route path="/signup"><SignUp /></Route>
         <Route path="/login"><Login /></Route> 
       <AuthContextProvider>
       <Route path="/signout"><SignOut /></Route>
       <ProtectedRoute path="/dashboard" component={Dashboard} />
       </AuthContextProvider>
      </Switch>
   </Router>
</div>
   );
}

export default App;