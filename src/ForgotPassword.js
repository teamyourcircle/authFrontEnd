import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button'
import './Login.css'
import './ForgotPassword.css'
function ForgotPassword() {
    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));
    
  
      const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
        const classes = useStyles();
    return (
      <div className="login">
      <div className="login_container">
    <CachedIcon/>
      <h2>Reset Your Password</h2>
      <p style={{fontWeight:'600'}}>Enter your user account's verified email 
          <br />address and we will send you a password reset link.</p>
      <TextField
      fullWidth
          className={classes.margin}
          label="E-Mail"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
        />
      <Button 
      variant="contained"
      color="secondary"
      className={classes.button}
      size="large"
      color="secondary"
      value="submit">Send password reset Email</Button>
          </div>
  </div>
    );
}

export default ForgotPassword;