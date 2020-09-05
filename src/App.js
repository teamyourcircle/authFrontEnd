import React from 'react';
import './App.css';
import ForgotPassword from './ForgotPassword'
import Join from './Join';
import Quote from './Quote';
import SignUp from './SignUp';
import Header from './Header';
import Login from './Login';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Facebook from './Banner'
import Host  from './Host';
import SignOut from './SignOut'
import PasswordRest from './PasswordReset'
import ReactVirtualizedTable from './Table'
import CustomizedSnackbars from './Snakbar';
import Dashboard from './Dashboard'
import { AuthContextProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
function App() {
   return (
      <div className="app">
         <Router>
         <Switch>
         <Route path="/signup"><SignUp /></Route>
         <Route exact path="/join"><Header />
         <div className="app_join">
         <div className="app_join_right">
         <Quote /> 
         <Join />
         </div>
<div className="app_join_left">
<Facebook/>
<Facebook/>
</div>
   
</div>
         </Route>
         
         <Route path="/login"><Login /></Route> 
       
       <Route path="/host">
       <Header />
       <div className="app_join">
         <div className="app_join_right">
         <Quote /> 
      <Host />
         </div>
<div className="app_join_left">
<Facebook/>
<Facebook/>
</div>
   
</div>

       </Route>
       <AuthContextProvider>
       <ProtectedRoute path="/signout" component={SignOut} />
       <ProtectedRoute path="/dashboard" component={Dashboard} />
       </AuthContextProvider>

       <Route path="/forgot_password"><ForgotPassword/></Route>
       <Route path="/verify_password"><CustomizedSnackbars/><PasswordRest/></Route>
       <Route path="/admin"><Header /><ReactVirtualizedTable/></Route>
       
      <Route path="/"><Header />
      <Link to="/signup">Get Started</Link>
      </Route>

         </Switch>
         </Router>
      </div>
   );
}

export default App;