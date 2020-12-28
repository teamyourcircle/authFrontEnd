import React,{useState,useContext,useEffect} from 'react';
import './Generate.css';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { AuthContext} from './AuthContext'

function Generate() {
    const [apiname, setapiname] = React.useState();
    const [scopes,setScopes] = React.useState([]);
    const url = 'http://localhost:5000/api/users/dashboard'
 

    const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
    const [isLoaded,setisLoaded] = useState(false);  
    const options = {
      method: 'GET',
      headers:{
        'access-token':token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    const [email,setEmail] = useState('');
    const [isVerified,setisVerified] = useState(true);
      useEffect(() =>{
      fetch(url, options).then(response => response.json()).then(data => {
        setEmail(data.email);
        setisVerified(data.isverified);
        setisLoaded(true);
        console.log(data);
      })
    
      }, [is_Auth])
    const handleSubmit = () =>{
        const body = {
            "name": apiname,
            "scopes": scopes,
            "mail": email
        }
        console.log(body);
    }

    const handleScopes = (e) =>{
        let index = scopes.indexOf(`${e.target.value}`);
        if(index===-1){
            setScopes([...scopes,e.target.value])
        }else{
            scopes.splice(index,1)
        }
    }

    return (
        
        <div className="generate">
            {isLoaded ? (<React.Fragment>
                <h2>Create New Api Key</h2>
          <hr style={{color:'whitesmoke',border: '1px solid whitesmoke'}}/>
          <div className="form">
          <label>Name</label>
       <input type="text" onChange={e => setapiname(e.target.value)}/>
          </div>
          <h3>Choose Scopes:</h3>
          <div className="option">
              <p>Form Apis:</p>
            <Checkbox
            size="small"
            inputProps={{ 'aria-label': 'checkbox with small size' }}
            value="form.read"
            onChange={handleScopes}
            /> 
            <label>form.read</label>
            <Checkbox
                size="small"
                inputProps={{ 'aria-label': 'checkbox with small size' }}
                value="form.delete"
                onChange={handleScopes}
            /> 
            <label>form.delete</label>
              </div>
              <hr style={{color:'whitesmoke',border: '1px solid whitesmoke'}}/>
              <div className="group">
              <Button className="button" onClick={handleSubmit}>Create New Api Key</Button>
              </div>
            </React.Fragment>): (null)}     
        </div>
    );
}

export default Generate;