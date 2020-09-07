import React,{useState, createContext} from 'react';
import Login from './Login';
import Cookies from 'js-cookie';

export const AuthContext = createContext() ;

export function AuthContextProvider(props) {

//here you have to useEffect and fetch the token from Cookies 
//now from cookies you have to put that cookie to setToken(token)
const [token, setToken ] =  useState(Cookies.get('Token')); 
const [is_Auth,setAuth]  =  useState(Cookies.get('isAuth'));



    return (
        <AuthContext.Provider value={[is_Auth,setAuth,token,setToken]}>
            {props.children}
            
        </AuthContext.Provider>
    );
}
