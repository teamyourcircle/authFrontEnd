import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button'
import './Login.css'
import './ForgotPassword.css'
function ForgotPassword() {
  const [isVerfied,setIsVerified] = useState(false);
  const [email,setEmail] = useState('');
    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));

      const handleChange =(e) =>{
          setEmail(e.target.value);
      }

      const handleSubmit = async ()  =>{
        console.log(email);
        setIsVerified(true);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json'
          },
          body: JSON.stringify({'email':email})
          
          }
        const response = await fetch(`http://localhost:5000/api/forgot_password`,options);
        const finalResponse = await response;
        if(!finalResponse.ok){
          setTimeout(function (){
            setIsVerified(false)
          },1000);
        }
        else {
          const data = await finalResponse.json();
          //setIsVerified(false);
          console.log(data);
          if(data['status']){
            setIsVerified(false);
          }
        }
      }


        const classes = useStyles();
    return (
      <div className="login">

        { 
      !isVerfied ? 
      (

      <div className="login_container">
    <CachedIcon/>
      <h2>Reset Your Password</h2>
      <p style={{fontWeight:'600'}}>Enter your Registered email 
          <br />address and we will send you a password reset link.</p>
      <TextField
      fullWidth
          className={classes.margin}
          label="E-Mail"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          onChange = {handleChange}
        />
      <Button 
      variant="contained"
      color="secondary"
      className={classes.button}
      size="large"
      color="secondary"
      onClick={handleSubmit}
      value="submit"
      >
        
        Send password reset Email
      
      </Button>
          </div>
      ) : (<h1>Loading,,,</h1>)
        }
  </div>
    );
}

export default ForgotPassword;