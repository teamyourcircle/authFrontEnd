import React,{useContext, useEffect, useState} from 'react';
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
import {Link} from 'react-router-dom';
import {AuthContext} from './AuthContext';
import './Login.css';
import CustomizedSnackbars from './Snakbar';
import Cookies from 'js-cookie';

function Login(props) {

const [isAuth,setAuth] = useContext(AuthContext);
const [isLoggedin,setisLoggedIn] = useState(false);
const [status,setStatus] = useState(0);
    useEffect(() => {
      setAuth(true)
    },[])
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
        email:'',
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
        const classes = useStyles();
  const postData = async (e) =>{

      e.preventDefault();
      const data = {
        email:values.email,
        password:values.password
      }

      const options = {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json'
        },
        body: JSON.stringify(data)
        
        }
        
      if(data.email!="" && data.password!=""){
        setisLoggedIn(true);
        const req = await fetch('http://localhost:5000/api/signin',options);
        setisLoggedIn(false);
        if(req.ok){
          const data = await req.json();
          setStatus(200);
          Cookies.set("Token", data.token);
          Cookies.set("isAuth",isAuth);
          window.open('/dashboard', "_self")
        }
        else{
          
        if(req.status===400){

          setStatus(400);

        }
      }
        
        
      }
      else{
        console.log({"_msg":"Data Body Empty !"});
      }

  }
  
  
        return (<React.Fragment>
          <div className="back">
            
          </div>
          <div class="status">
          {

            status==400 ? (<CustomizedSnackbars severity={"error"} content={"Invalid Password Or Email !"}/>) :(null)
          }
          {
          status==200 ? (<CustomizedSnackbars severity={"success"} content={"Logged In Successfully "}/>) : (null)

          }
        </div>
      <div>

        {
          
      <div className="login">
        {   !isLoggedin ? (
        
      
      <div className="login_container">
       
    <CachedIcon/>
      <h2>Welcome To CIRCLE</h2>
      <form onSubmit={postData}>
      <TextField
      fullWidth
          className={classes.margin}
          label="E-Mail"
          variant="outlined"
          id="mui-theme-provider-outlined-input"
          value={values.email}
          onChange = {handleChange('email')}
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
      type="submit"
      value="submit">Login</Button>
      </form>
          <p>Don't Have an Account?
      <Link to="/signup" className="link">Sign Up</Link></p>
          </div> ) : (<h1>Loading,,,</h1>)
}
  </div>
}
  </div>
  </React.Fragment>
   
    );
}

export default Login;