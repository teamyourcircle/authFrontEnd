import React,{useContext,useState} from 'react';
import Cookies from 'js-cookie';
import { GoogleLogin } from 'react-google-login';
import {AuthContext} from './AuthContext';
import FacebookLogin from 'react-facebook-login';


const clientId ='391383527608-vq5pjfpslfeq4i10624rvt088eqhsa4p.apps.googleusercontent.com';

function Login() {


  const [isAuth,setAuth] = useContext(AuthContext);
  const onSuccess = (res) => {
  let token_Id = res.tokenId;
  fetch('http://localhost:5000/auth/api/socialLogin', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify({
        "access_token":`${token_Id}`,
        "social_type":"google"
    })
            
    }).then(function(res) {
      if (!res.ok) {
          throw Error(res.statusText);
      }
      return res;
    }).then(async function(res) {
      const data = await res.json();
      console.log("Data",data)
      Cookies.set("Token", data.token);
      Cookies.set("isAuth",isAuth);
      window.open('/dashboard', "_self")
    }).catch(function(error) {
      console.log(error);
    });
    }
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };

  const responseFacebook= (res)=>{
    console.log(res.accessToken)
    let token_Id = res.accessToken;
  fetch('http://localhost:5000/auth/api/socialLogin', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify({
        "access_token":`${token_Id}`,
        "social_type":"facebook"
    })
            
    }).then(function(res) {
      if (!res.ok) {
          throw Error(res.statusText);
      }
      return res;
    }).then(async function(res) {
      const data = await res.json();
      console.log("Data",data)
      Cookies.set("Token", data.token);
      Cookies.set("isAuth",isAuth);
      window.open('/dashboard', "_self")
    }).catch(function(error) {
      console.log(error);
    });
  }

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        
      />
       <FacebookLogin
        appId="839799953534082"
        autoLoad={false}
        // onClick={componentClicked}
        callback={responseFacebook}
         />
    </div>
  );
}

export default Login;