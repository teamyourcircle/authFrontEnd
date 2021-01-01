import React,{useContext,useEffect,useState} from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import {Avatar} from '@material-ui/core'
import {AuthContext} from './AuthContext'
import Cookie from 'js-cookie';
import Skeleton from '@material-ui/lab/Skeleton';



function SignOut() {

//this is the token comming from the header .
const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
const [is_loaded,setIsLoaded] = useState(false);
const [email,setEmail] = useState('');
//console.log('token is:',token);

const logout = () =>{
  window.open("/login","_self")
}

const options = {
  method: 'GET',
  headers:{
    'access-token':token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};
useEffect(() => {
console.log('logging out !');
// now user not authenticated
setAuth(false);
Cookie.remove('isAuth');
Cookie.remove('Token');

//status 
console.log("is Authenticated "+is_Auth); 
fetch('http://localhost:5000/api/logout',options).then(response => response.json()).then(data => {setEmail(data.email);setIsLoaded(true);})
} , [is_Auth]);
    const useStyles = makeStyles((theme) => ({
    
      container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: { 
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));
      const classes = useStyles();
    return (
      <div className="login">
      <div className="login_container">
    <CachedIcon/>
      <h2>You are Succesfully Sign Out</h2>
      <div className="icon">
<CheckCircleRoundedIcon/>
<div className="id">
<Avatar />
    {
      !is_loaded ? (<Skeleton variant="text" width={400} height={40}/>) :(<div><p>{email}</p></div>)
    }
</div>
        </div>
        <Button 
      variant="contained"
      color="secondary"
      className={classes.button}
      size="large"
      color="secondary"
      onClick={logout}
     >Sign In</Button>
          </div>
  </div>
    );
}

export default SignOut;