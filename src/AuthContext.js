import React,{useState, createContext} from 'react';
import Login from './Login'

export const AuthContext = createContext() ;

export function AuthContextProvider(props) {

//here you have to useEffect and fetch the token from Cookies 
//now from cookies you have to put that cookie to setToken(token)
const [token, setToken ] =  useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxYmIzZWY1ZmQ0MDExYjQ2ODA5NzAiLCJpYXQiOjE1OTkxOTE5NzJ9.cI6bcVLIR7cfwGImnH38lZzOcA_IoCFiO5h8p6fnW78') ; 
const [is_Auth,setAuth]  =  useState(true) ; 



    return (
        <AuthContext.Provider value={[is_Auth,setAuth,token,setToken]}>
            {props.children}
            
        </AuthContext.Provider>
    );
}
