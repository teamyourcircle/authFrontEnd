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
import CustomizedSnackbars from "@teamyourcircle/oauth-integration";
import signBoy from "./images/signBoy.svg";
import signMiddle from "./images/signMiddle.svg";
import signGirl from "./images/signGirl.svg";
import Hidden from "@material-ui/core/Hidden";
import LoginGoogle from "./Google_Login.js";
import LoginFacebook from "./Facebook_Login.js";
import { AuthContextProvider } from "./AuthContext";
function SignUp() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [ispassnotmatch, setispass] = useState(false);
  const [issixchar, setissixchar] = useState(true);
  const [status, setStatus] = useState(0);
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
      {ispassnotmatch ? (
        <CustomizedSnackbars
          severity={"error"}
          content={"Password Not Matched "}
        />
      ) : null}
      {!issixchar ? (
        <CustomizedSnackbars
          severity={"error"}
          content={"Password Should be of Atleast Six Characters "}
        />
      ) : null}
      {status == 200 ? (
        <CustomizedSnackbars
          severity={"success"}
          content={"Successfully Signed in  "}
        />
      ) : null}
      {status == 409 ? (
        <CustomizedSnackbars
          severity={"error"}
          content={"Email Already Exists "}
        />
      ) : null}
      <div className="back">
        <Hidden only={["sm", "xs", "md"]}>
          <img src={signBoy} />
          <img src={signMiddle} />
          <img src={signGirl} />
        </Hidden>
      </div>
      <div className="signup">
        {!isSignedUp ? (
          <div className="signup_container">
            <div className="mobile">
              <div class="mobile_look"></div>
            </div>
            <CachedIcon />
            <h2>Welcome To CIRCLE</h2>
            <form onSubmit={postData}>
              <TextField
                fullWidth
                className={classes.margin}
                label="E-Mail"
                variant="outlined"
                id="mui-theme-provider-outlined-input"
                onChange={handleChange("email")}
              />

              <FormControl
                fullWidth
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
                        {values.showRepeatPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
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
              >
                Sign Up
              </Button>
              <div className="more">
                <AuthContextProvider>
                  <LoginGoogle />
                  <LoginFacebook />
                </AuthContextProvider>
              </div>
            </form>
            <p>
              Already have an Account?
              <Link to="/login" className="link">
                Log In
              </Link>
            </p>
          </div>
        ) : (
          <h1>Loading,,,</h1>
        )}
      </div>
    </React.Fragment>
  );
}

export default SignUp;
