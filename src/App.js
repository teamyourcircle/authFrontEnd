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
import Integration from './Integration';
function App() {
   console.log(process.env);
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
       <ProtectedRoute path="/dashboard" component={() => <React.Fragment><div className="layout"><Dashboard />
       {/* <Products /> */}
       </div></React.Fragment>} />
       <ProtectedRoute path="/create/token" component={() => <Generate loaded = {true} keys=""/>} />
       <ProtectedRoute path="/developers" component={Developers} />
       <ProtectedRoute path="/integration" component={Integration} />
       </AuthContextProvider>
      </Switch>
   </Router>
</div>
   );
}

export default App;