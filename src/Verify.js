import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import CustomizedSnackbars from './Snakbar';
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
import './SignUp.css'



function Verify() {
    let {token} = useParams();
    const [isverified,setVerified] = useState(false);
    const [isforgot,setForgot] = useState(false);
    const [ispassnotmatch,setispass] = useState(false);
    const [issixchar,setissixchar] = useState(true);
    const compare  = (p1,p2) => {

        if(p1==p2){
          
          return true; 
        }
        return false;
        }
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
          const handleClickShowRepeatPassword = () => {
            setValues({ ...values, showRepeatPassword: !values.showRepeatPassword });
          };
          const handleMouseDownPassword = (event) => {
            event.preventDefault();
          };
          /*This is The Whole Data Set for This Component */
          const [values, setValues] = React.useState({
          
            amount: '',
            password: '',
            repeat_password: '',
            weight: '',
            weightRange: '',
            showPassword: false,
            showRepeatPassword: false
          });
        
    const postData = async (e) =>{
        e.preventDefault();
        const is_same = compare(values.password,values.repeat_password);
        if(is_same && values.password!="" && values.repeat_password!=""){
          if(values.password.length >=6){
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type':  'application/json'
                },
                body: JSON.stringify({"token":token,"passwd":values.password})
                
                }
                const res = await fetch('http://localhost:5000/api/reset_password',options);    
                if(res.ok){
                    const data = await res.json();
                    window.open("/login","_self");
                    //console.log(data);
                }
          }
          else{
            setissixchar(false);
          }
    }
    else{
        setispass(!ispassnotmatch);
    }
        }
       

    useEffect(async ()=>{

        const res = await fetch(`http://localhost:5000/api/verify/${token}`);
        if(res.ok){
            const data = await res.json();
            setVerified(true);
            switch (data['reason']) {
                case 'forgot':
                    setForgot(true);
                    break;
                case 'signup':
                    setTimeout(()=>{
                    window.open("/dashboard","_self");
                    },2000);
                
            }
           
        }
        else{
            setVerified(false);
        }
        

    },[]);
    const classes = useStyles();

    return (
      
      <div>
          {ispassnotmatch ? (<CustomizedSnackbars severity={"error"} content={"Password Not Matched "}/>) : (null)} 
      {!issixchar ? (<CustomizedSnackbars severity={"error"} content={"Password Should be of Atleast Six Characters "}/>) : (null)} 
            {isverified ? (<div>
                <CustomizedSnackbars severity={"success"} content={"Your Token is Verified Change Your Password !"}/>
                <h2>Redirecting To DashBoard .</h2>
            </div>) : (<div>
                <CustomizedSnackbars severity={"error"} content={"Invalid Jwt Token !"}/>

            </div>)}

            {isforgot ? (<div>
                        <CachedIcon />
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
        <FormControl fullWidth className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Repeat Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showRepeatPassword ? 'text' : 'password'}
            value={values.repeat_password}
            onChange={handleChange('repeat_password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowRepeatPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={130}
          />
        </FormControl>
     
      <Button 
      variant="contained"
      color="secondary"
      className={classes.button}
      size="large"
      color="secondary"
      value="submit"
      type="submit"
      onClick={postData}
      >Submit</Button>
            </div>) : (null)}
      </div>
    );
}

export default Verify;