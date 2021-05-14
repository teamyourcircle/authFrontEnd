import React,{useState,useContext,useEffect} from 'react';
import Dashboard from './Dashboard'
import ApiTable from './ApiTable'
import { AuthContext} from './AuthContext'
function Developers() {
    const url = 'http://localhost:5000/auth/api/dashboard'
    const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
    const [isfullyLoaded,setisLoaded] = useState(false);  
    const options = {
      method: 'GET',
      headers:{
        'access-token':token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    const [email,setEmail] = useState('');
      useEffect(() =>{
      fetch(url, options).then(response => response.json()).then(data => {
        setEmail(data.email);
        setisLoaded(true);
      })
    
      }, [is_Auth])
    return (
        <div>
        <Dashboard/>
        {
            isfullyLoaded ? (<ApiTable email={email}/>) : (<div>Loading...</div>)
        }
        
        </div>
    );
}

export default Developers;