import React,{useContext} from 'react';
import Cookies from 'js-cookie';
import { GoogleLogin } from 'react-google-login';
import {AuthContext} from './AuthContext';


// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
  '391383527608-vq5pjfpslfeq4i10624rvt088eqhsa4p.apps.googleusercontent.com';
//


//
function Login() {

    const [isAuth,setAuth] = useContext(AuthContext);
  const onSuccess = (res) => {
    var oauth2Client = getOAuthClient();
    console.log("kbkbkbkb")
      
      console.log("Response",res)
    // let token_Id = res.tokenId;

    console.log(token_Id)
      //
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
      


      
    console.log('Login Success: currentUser:', res.profileObj);
    // alert(
    //   `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    // );
    // refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    // alert(
    //   `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    // );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        // isSignedIn={false}
        responseType = {'code'}
      />
    </div>
  );
}

export default Login;