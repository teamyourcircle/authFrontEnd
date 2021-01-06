import React from 'react';
import './App.css';
import ForgotPassword from './ForgotPassword'
import SignUp from './SignUp';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignOut from './SignOut'
import Verify from './Verify';
import Dashboard from './Dashboard'
import Developers from './Developers'
import { AuthContextProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Products from './Products'
import Generate from './Generate'

function App() {
   return (
<div className="app">
   <Router>
      <Switch>
      <Route path="/forgot"><ForgotPassword/></Route>
         <Route path="/verify/:token"  children={<Verify />}/>
         <Route path="/signup"><SignUp /></Route>
       <AuthContextProvider>
       <Route path="/signout"><SignOut /></Route>
       <Route path="/login"><Login /></Route> 
       <ProtectedRoute path="/dashboard" component={() => <React.Fragment><Dashboard /><Products /></React.Fragment>} />
       <ProtectedRoute path="/create/token" component={Generate} />
       <ProtectedRoute path="/developers" component={Developers} />
       
       </AuthContextProvider>
      </Switch>
   </Router>
</div>
   );
}

export default App;