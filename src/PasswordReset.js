import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button'
import './Login.css'
import './ForgotPassword.css'

function PasswordReset() {
  const [tokenkey,setTokenKey] = useState('');   
  const [isVerfied,setIsVerified] = useState(false);
  const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));
      const handleChange = (e) =>{
        setTokenKey(e.target.value);

      }
      const handleSubmit = async ()  =>{
          console.log(tokenkey);
          setIsVerified(true);
          const response = await fetch(`http://localhost:5000/api/verify/${tokenkey}`);
          const finalResponse = await response;
          if(!finalResponse.ok){
            setTimeout(function (){
              setIsVerified(false)
            },2000);
          }
        }
        const classes = useStyles();
    return (
      <div className="login">
      {  !isVerfied ? (
      <div className="login_container">
    <CachedIcon/>
      <h2>Verify Your Mail</h2>
      <p style={{fontWeight:'600'}}>Check your email for a Verification code,
          <br />and write Verification code here.Thank You!</p>
      <TextField
      fullWidth
          className={classes.margin}
          label="Verification Code"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          onChange={handleChange}
        />
      <Button 
      variant="contained"
      color="secondary"
      className={classes.button}
      size="large"
      color="secondary"
      value="submit"
      onClick={handleSubmit}
      >Submit</Button>
 
 
 </div>
) : (<h1>Loading</h1>) 

}

 </div>
    );
      }

export default PasswordReset;