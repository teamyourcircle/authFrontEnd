import React,{useEffect, useState} from 'react';
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
import {AuthContext} from './AuthContext'
import Cookies from 'js-cookie';

function Login() {

const [isAuth,setAuth] = useState(false);

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
  const postData = (e) =>{

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
        
        console.log(data);

        // Hardik contributions Starts from here .

        //TODO basically our work is to fetch this api data
        //and in response headers there is access-token: token
        //you have to take that token and put  that into Cokkie 
        //through js-cookie [npm package]
        
        fetch('http://localhost:5000/api/signin',options).then(response => {
          // console.log("MyToken ",response.json())
          
           return response.json();
          }).then(data => {
            console.log(data.msg)
            Cookies.set("Token", data.token)
            // console.log('isAuth ',!isAuth)
            Cookies.set("isAuth",isAuth)
            console.log("Cookie created !")
          })
        //Hardik contribution ends 
        
      }
      else{
        console.log({"_msg":"Data Body Empty !"});
      }
      // const getToken = (req, res, next) => {
        
      // }

  }
  
  
        return (
      <div className="login">
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
          <p>Don't Have an Accounr?
      <Link to="/signup" className="link">Sign Up</Link></p>
          </div>
  </div>
    );
}

export default Login;