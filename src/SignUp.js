import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
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
import { Link } from "react-router-dom";
import "./SignUp.css";
import { CustomizedSnackbars } from "@teamyourcircle/oauth-integration";
import signBoy from "./images/signBoy.svg";
import signMiddle from "./images/signMiddle.svg";
import signGirl from "./images/signGirl.svg";
import Hidden from "@material-ui/core/Hidden";
import LoginGoogle from "./Google_Login.js";
import LoginFacebook from "./Facebook_Login.js";
import { AuthContextProvider } from "./AuthContext";
//

import { AuthContext } from "./AuthContext";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import vector from "./images/signupVector.svg";
import PropTypes from "prop-types";
//
function SignUp() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [ispassnotmatch, setispass] = useState(false);
  const [issixchar, setissixchar] = useState(true);
  const [status, setStatus] = useState(0);
  const [metervalue, setmetervalue] = useState([{status:'veryWeak',color:'orangered'},{status:'weak',color:'orange'},{status:'good',color:'green'},{status:'excellent',color:'darkgreen'}])
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
    email: "",
    amount: "",
    password: "",
    repeat_password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
    showRepeatPassword: false,
  });

  const compare = (p1, p2) => {
    if (p1 == p2) {
      return true;
    }
    return false;
  };

  const postData = async (e) => {
    e.preventDefault();
    const is_same = compare(values.password, values.repeat_password);
    if (
      is_same &&
      values.email != "" &&
      values.password != "" &&
      values.repeat_password != ""
    ) {
      if (values.password.length >= 6) {
        const body = {
          email: values.email,
          password: values.password,
        };

        setIsSignedUp(true);
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        };

        const res = await fetch("http://localhost:5000/api/signup", options);
        setIsSignedUp(false);
        if (res.ok) {
          const data = await res.json();

          setStatus(200);
          window.open("/login", "_self");
        } else {
          setStatus(res.status);
        }
      } else {
        setissixchar(false);
      }
    } else {
      setispass(true);
    }
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="login_complete">
        <Navbar />
        <div className="align">
          <Hidden only={["sm", "xs"]}>
            <div className="text">
              <h2>CREATE A CIRCLE ACCOUNT</h2>
              <p>
                Sign up in Seconds by filling your right information for your
                right journey with us
              </p>
              <img src={vector} alt="svg" />
            </div>
          </Hidden>
          <div>
            {
              <div className="login">
                {!isSignedUp ? (
                  <div className="login_container">
                    <div className="mobile">
                      <div class="mobile_look"></div>
                    </div>
                    <h2>SIGNUP</h2>
                    <form onSubmit={postData}>
                      <div className="more">
                        <AuthContextProvider>
                          <LoginGoogle />
                          <LoginFacebook />
                        </AuthContextProvider>
                      </div>
                      <svg
                        height="37"
                        viewBox="0 0 443 37"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginTop: "20px" }}
                      >
                        <line
                          y1="17.5"
                          x2="184"
                          y2="17.5"
                          stroke="#E5E5E5"
                          stroke-width="3"
                        />
                        <line
                          x1="259"
                          y1="17.5"
                          x2="443"
                          y2="17.5"
                          stroke="#E5E5E5"
                          stroke-width="3"
                        />
                        <path
                          d="M244 18.5C244 27.9908 234.566 36 222.5 36C210.434 36 201 27.9908 201 18.5C201 9.0092 210.434 1 222.5 1C234.566 1 244 9.0092 244 18.5Z"
                          fill="white"
                          stroke="#E5E5E5"
                          stroke-width="2"
                        />
                        <path
                          d="M217.269 23.1641C215.879 23.1641 214.764 22.7061 213.926 21.79C213.092 20.874 212.675 19.6823 212.675 18.2148C212.675 16.638 213.101 15.3802 213.953 14.4414C214.805 13.5026 215.965 13.0332 217.433 13.0332C218.786 13.0332 219.875 13.4889 220.7 14.4004C221.53 15.3118 221.944 16.5036 221.944 17.9756C221.944 19.5752 221.521 20.8398 220.673 21.7695C219.825 22.6992 218.69 23.1641 217.269 23.1641ZM217.351 14.0723C216.321 14.0723 215.484 14.4437 214.842 15.1865C214.199 15.9294 213.878 16.9046 213.878 18.1123C213.878 19.32 214.19 20.293 214.814 21.0312C215.443 21.765 216.261 22.1318 217.269 22.1318C218.344 22.1318 219.192 21.7809 219.812 21.0791C220.431 20.3773 220.741 19.3952 220.741 18.1328C220.741 16.8385 220.44 15.8382 219.839 15.1318C219.237 14.4255 218.408 14.0723 217.351 14.0723ZM230.899 23H229.532L227.892 20.252C227.741 19.9967 227.595 19.7803 227.454 19.6025C227.313 19.4202 227.167 19.2721 227.017 19.1582C226.871 19.0443 226.711 18.9622 226.538 18.9121C226.369 18.8574 226.178 18.8301 225.964 18.8301H225.021V23H223.872V13.1973H226.798C227.226 13.1973 227.62 13.252 227.98 13.3613C228.345 13.4661 228.66 13.6279 228.924 13.8467C229.193 14.0654 229.402 14.3389 229.553 14.667C229.703 14.9906 229.778 15.3711 229.778 15.8086C229.778 16.1504 229.726 16.4648 229.621 16.752C229.521 17.0345 229.375 17.2874 229.184 17.5107C228.997 17.734 228.769 17.9255 228.5 18.085C228.236 18.2399 227.937 18.3607 227.604 18.4473V18.4746C227.769 18.5475 227.91 18.6318 228.028 18.7275C228.151 18.8187 228.268 18.9281 228.377 19.0557C228.486 19.1833 228.593 19.3291 228.698 19.4932C228.808 19.6527 228.928 19.8395 229.061 20.0537L230.899 23ZM225.021 14.2363V17.791H226.579C226.866 17.791 227.131 17.7477 227.372 17.6611C227.618 17.5745 227.83 17.4515 228.008 17.292C228.186 17.1279 228.325 16.9297 228.425 16.6973C228.525 16.4603 228.575 16.196 228.575 15.9043C228.575 15.3802 228.404 14.9723 228.062 14.6807C227.725 14.3844 227.235 14.2363 226.593 14.2363H225.021Z"
                          fill="#555555"
                        />
                      </svg>

                      <div className="info">
                        <div className="full-name"> 
                        <TextField
                          style={{ width: "340px", marginLeft: "-20px" }}
                          className={classes.margin}
                          label="First Name"
                          style={{ width: "340px", marginLeft: "-20px" }}
                          className={classes.margin}
                          label="First Name"
                          variant="outlined"
                          id="mui-theme-provider-outlined-input"
                          value={values.firstName}
                          onChange={handleChange("firstName")}
                        />
                        <TextField
                          style={{ width: "340px", marginLeft: "-20px" }}
                          className={classes.margin}
                          label="Last Name"
                          style={{ width: "340px"}}
                          className={classes.margin}
                          label="Last Name"
                          variant="outlined"
                          id="mui-theme-provider-outlined-input"
                          value={values.lastName}
                          onChange={handleChange("lastName")}
                        />
                        </div>
                         <TextField
                          style={{ width: "340px", marginLeft: "-20px" }}
                          className={classes.margin}
                          label="E-Mail"
                          variant="outlined"
                          id="mui-theme-provider-outlined-input"
                          value={values.email}
                          onChange={handleChange("email")}
                        />
                        <FormControl
                          style={{ width: "340px", marginLeft: "-20px" }}
                          className={clsx(classes.margin, classes.textField)}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
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
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            labelWidth={70}
                          />
                          <div className="password-strength-meter">
                            <div className="meter-content">
                            <span className="meter" style={{background:`${metervalue[0].color}`}}></span>
                            <span className="meter" style={{background:`${metervalue[1].color}`}}></span>
                            <span className="meter" style={{background:`${metervalue[2].color}`}}></span>
                            <span className="meter" style={{background:`${metervalue[3].color}`}}></span>
                            </div>
                            </div>
                              <span className="password-status">Excellent</span>
                        </FormControl>
                        <FormControl
                          style={{ width: "340px", marginLeft: "-20px" }}
                          className={clsx(classes.margin, classes.textField)}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Confirm Password
                          </InputLabel>
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
                                  {values.showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            labelWidth={70}
                          />
                          
                        </FormControl>
                      </div>
                      
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        style={{
                          width: "340px",
                          height: "60px",
                          backgroundColor: "#28284E",
                          fontSize: "26px",
                          fontWeight: "normal",
                          borderRadius: "15px",
                          marginTop: "15px",
                          marginLeft: "2px",
                        }}
                        size="large"
                        type="submit"
                        value="submit"
                      >
                        sign up
                      </Button>
                    </form>
                    <p>
                    Already Have an Account ? 
                      <Link to="/login" className="link">
                      Log In
                      </Link>
                    </p>
                    {/* <div class="status">
                      {responseSummary.length ? (
                        responseSummary.map((r) => (
                          <CustomizedSnackbars
                            content={r.content}
                            severity={r.severity}
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </div> */}
                  </div>
                ) : (
                  <h1>Loading,,,</h1>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

SignUp.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default SignUp;
