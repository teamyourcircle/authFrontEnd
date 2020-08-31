import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import Button from '@material-ui/core/Button'
import './Login.css'
import './ForgotPassword.css'
function PasswordReset() {   
    const useStyles = makeStyles((theme) => ({
        margin: {
          margin: theme.spacing(1),
        },
      }));
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
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
      <h2>Verify Your Mail</h2>
      <p style={{fontWeight:'600'}}>Check your email for a Verification code,
          <br />and write Verification code here.Thank You!</p>
      <TextField
      fullWidth
          className={classes.margin}
          label="Verification Code"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
        />
      <Button 
      variant="contained"
      color="secondary"
      className={classes.button}
      size="large"
      color="secondary"
      value="submit">Submit</Button>
          </div>
  </div>
    );
}

export default PasswordReset;