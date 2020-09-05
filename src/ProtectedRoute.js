import React,{useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {AuthContext} from './AuthContext'
import Header from './Header'

function ProtectedRoute({component:Component , ...rest}) {
    const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
    
    return (
        <Route {...rest} render={(props) =>{
        if(is_Auth){
        return (<React.Fragment><Header /><Component {...props}/></React.Fragment>)
        }
        else
        return  <Redirect to={{ pathname: '/login' }} />
        
        }}/>

    );
}

export default ProtectedRoute;