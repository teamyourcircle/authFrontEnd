import React,{useState, createContext} from 'react';
import Login from './Login'

export const AuthContext = createContext() ;

export function AuthContextProvider(props) {
const [token, setToken ] =  useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjUxYmIzZWY1ZmQ0MDExYjQ2ODA5NzAiLCJpYXQiOjE1OTkxOTE5NzJ9.cI6bcVLIR7cfwGImnH38lZzOcA_IoCFiO5h8p6fnW78') ; 
const [is_Auth,setAuth]  =  useState(true) ; 



    return (
        <AuthContext.Provider value={[is_Auth,setAuth,token,setToken]}>
            {props.children}
            
        </AuthContext.Provider>
    );
}
