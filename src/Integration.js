import React,{useContext,useState,useEffect} from "react"
import {IntegrationDisplay} from '@teamyourcircle/oauth-integration'
import {config} from '@teamyourcircle/oauth-integration'
import { AuthContext} from './AuthContext'
function Integration () {
const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
const [integrationId, setintegrationId] = useState([])


useEffect(() => {
  
  fetch('http://localhost:5000/auth/api/user/oauthApps', {
  method: 'GET',
  headers: {
    'access-token':token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
     },
 
          
  }).then(function(res) {
    if (!res.ok) {
        throw Error(res.statusText);
    }
    return res;
  }).then(async function(res) {
    let integration_id = []
    const data = await res.json();
    for(let i=0;i<data.integartionList.length;i++){
    integration_id.push(data.integartionList[i].integration_id)
    }
    setintegrationId( integration_id)
  })
  
}, [])

useEffect(() => {
  console.log(integrationId);
}, [integrationId])

const checkIsInstalled = (array,id) =>{
  if(array.includes(id)){
  return true
  }
  return false;
}

const handleSuccess = (res) =>{
  console.log(res);
  if(res.integration_id){
    setintegrationId([...integrationId, res.integration_id]);
  }
}
const handleFaliure = (res) =>{
  console.log(res);
}


return (
    <div>      
    {config.map((object, i) => <IntegrationDisplay handleSuccess={handleSuccess} handleFaliure={handleFaliure} id={object.id} key={integrationId} isInstalled = {checkIsInstalled(integrationId,object.id)} accessToken = {token} />)} 
    </div>
);
}


export default Integration; 