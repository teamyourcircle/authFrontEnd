import React,{useContext} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {AuthContext} from './AuthContext'

function ProtectedRoute({component:Component , ...rest}) {
    const [is_Auth,setAuth,token] = useContext(AuthContext);
    
    return (
        <Route {...rest} render={(props) =>{
        if(is_Auth)
        return <Component {...props}/>
        else
        return  <Redirect to={{ pathname: '/login' }} />
        
        }}/>

    );
}

export default ProtectedRoute;