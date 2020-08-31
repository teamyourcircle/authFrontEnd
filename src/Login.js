import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'
import './Login.css'
function Login() {
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
    
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
      <h2>Welcome To CIRCLE</h2>
      <TextField
      fullWidth
          className={classes.margin}
          label="E-Mail"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
        />
        <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Link to="/forgot" className="forgot">Forgot Password ?</Link>
      <Button 
      variant="contained"
      color="secondary"
      className={classes.button}
      size="large"
      color="secondary"
      value="submit">Login</Button>
          <p>Don't Have an Accounr?
<Link to="/signup" className="link">Sign Up</Link></p>
          </div>
  </div>
    );
}

export default Login;