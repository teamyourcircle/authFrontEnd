import React,{useContext,useState} from "react"
import {IntegrationDisplay} from '@teamyourcircle/oauth-integration'
import {config} from '@teamyourcircle/oauth-integration'
import { AuthContext} from './AuthContext'
function Integration () {
  // const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
//  console.log("this is",token);
  return (

<div>
 <IntegrationDisplay id={'google-sheets'} isInstalled={false} accessToken={'enter the token here'}/>
 <div>{console.log(config)}</div>
</div>
 
);

}
export default Integration;