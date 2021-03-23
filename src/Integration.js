import React,{useContext,useState,useEffect} from "react"
import {IntegrationDisplay} from '@teamyourcircle/oauth-integration'
import {config} from '@teamyourcircle/oauth-integration'
import { AuthContext} from './AuthContext'
function Integration () {
const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
const [integrationId, setintegrationId] = useState([])

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
  {config.map((object, i) => <IntegrationDisplay handleSuccess={handleSuccess} handleFaliure={handleFaliure} id={object.id} key={integrationId} accessToken={token} />)} 
  </div>
);
}


export default Integration; 