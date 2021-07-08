import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import './Login.css'
import './ForgotPassword.css'
import CustomizedSnackbars from './Snakbar';
function ForgotPassword() {
  const [isVerfied,setIsVerified] = useState(false);
  const [email,setEmail] = useState('');
  const [emailExists,isemailExists] = useState(true);
  const [issent,setisSent] = useState(false);  
  const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));

      const handleChange =(e) =>{
          setEmail(e.target.value);
      }

      const handleSubmit = async ()  =>{
        
        setIsVerified(true);
        const options = {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json'
          },
          body: JSON.stringify({'email':email})
          
          }
        const response = await fetch(`http://localhost:5000/api/forgot_password`,options);
        if(!response.ok){
          setTimeout(function (){
            setIsVerified(false)
          },1000);
          isemailExists(false);          
        }
        else {
          const data = await response.json();
          //setIsVerified(false);
          console.log(data);
          setisSent(true);
          if(data['status']){
            setIsVerified(false);
          }
        }
      }


        const classes = useStyles();
    return (
<React.Fragment>
<div className="back" style={{background:'#28284E'}}>
      </div>
      <div className="forgot">
       
        {issent ? (<CustomizedSnackbars severity={"success"} content={"Check Your Mail."} />) : (null)}
        {!emailExists  ? (<CustomizedSnackbars severity={"error"} content={"Email Not Exists ."} />) : (null)}
        { 
      !isVerfied ? 
      (

      <div className="forgot_container">
         <div className="mobile">
        <div class="mobile_look"></div>
        </div>
      <h2>Reset Password</h2>
      <p style={{lineHeight:'27px',color:'grey'}}>Enter your Registered email 
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
      style={{backgroundColor:'#28284E', fontSize:'20px', fontWeight:'normal', borderRadius:'13px', padding:'10px', marginLeft:'-20px'}}
      onClick={handleSubmit}
      value="submit"
      >
        
        Send
      
      </Button>
          </div>
      ) : (<h1>Loading,,,</h1>)
        }
  </div>
</React.Fragment>
    );
}

export default ForgotPassword;