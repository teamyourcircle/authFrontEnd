import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {CustomizedSnackbars} from "@teamyourcircle/oauth-integration";
import { makeStyles } from "@material-ui/core/styles";
import CachedIcon from "@material-ui/icons/Cached";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import "./Verify.css";
import Navbar from "./Navbar";
// import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import setPassImg1 from './images/setPassImg1.svg'
import mobileBackground from './images/verify-mobile-background.svg'

function Verify() {
  let { token } = useParams();
  const [isverified, setVerified] = useState(false);
  const [isforgot, setForgot] = useState(false);
  const [ispassnotmatch, setispass] = useState(false);
  const [issixchar, setissixchar] = useState(true);
  const compare = (p1, p2) => {
    if (p1 == p2) {
      return true;
    }
    return false;
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      width: '88%'
    },
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
    amount: "",
    password: "",
    repeat_password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    showRepeatPassword: false,
  });

  const postData = async (e) => {
    e.preventDefault();
    const is_same = compare(values.password, values.repeat_password);
    if (is_same && values.password != "" && values.repeat_password != "") {
      if (values.password.length >= 6) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, passwd: values.password }),
        };
        const res = await fetch(
          "http://localhost:5000/api/reset_password",
          options
        );
        if (res.ok) {
          const data = await res.json();
          window.open("/login", "_self");
          //console.log(data);
        }
      } else {
        setissixchar(false);
      }
    } else {
      setispass(!ispassnotmatch);
    }
  };

  // useEffect(async ()=>{

  //     const res = await fetch(`http://localhost:5000/api/verify/${token}`);
  //     if(res.ok){
  //         const data = await res.json();
  //         setVerified(true);
  //         switch (data['reason']) {
  //             case 'forgot':
  //                 setForgot(true);
  //                 break;
  //             case 'signup':
  //                 setTimeout(()=>{
  //                 window.open("/dashboard","_self");
  //                 },2000);

  //         }

  //     }
  //     else{
  //         setVerified(false);
  //     }

  // },[]);
  const classes = useStyles();

  return (
    <>
      <Navbar/>
      {/* <CachedIcon />
      <FormControl
        fullWidth
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
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
      <FormControl
        fullWidth
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Repeat Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showRepeatPassword ? "text" : "password"}
          value={values.repeat_password}
          onChange={handleChange("repeat_password")}
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
      >
        Submit
      </Button> */}
      <div className="page-content">
      {/* <div className={classes.root}>
      <Grid container spacing={3}>
       
        <Grid item xs={12} sm={6}> */}
          <div className="left-section">
          <img src={setPassImg1} className="setPassimg"/>
          </div>
        {/* </Grid> */}
        {/* <Grid item xs={12} sm={6}> */}
          <div className="right-section">
          <img src={mobileBackground} className="mobileBackground"/>
          <div className="verify-content">
          <h2>Password Reset</h2>
          {/* <div classname="para-content"> */}
          <p>Enter your new password for your circle account</p>
          <FormControl
        fullWidth
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
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
      <FormControl
        fullWidth
        className={clsx(classes.margin, classes.textField)}
        variant="outlined"
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Repeat Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showRepeatPassword ? "text" : "password"}
          value={values.repeat_password}
          onChange={handleChange("repeat_password")}
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
        className={classes.button}
        color="secondary"
        value="submit"
        type="submit"
        style={{
          backgroundColor: "#28284E",
          fontSize: "22.74px",
          fontWeight: "normal",
          borderRadius: "5.69px",
          textTransform:"initial"
        }}
        onClick={postData}
      >
        Change My Password
      </Button> 
          {/* <span>
            </span> */}
            {/* </div> */}
            </div>
          </div>
        {/* </Grid> */}
       
        
        
      {/* </Grid> */}
    </div>
    {/* </div> */}
    </>
  );
}

export default Verify;
