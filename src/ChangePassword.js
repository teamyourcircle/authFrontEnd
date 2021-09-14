import React, { useContext, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { AuthContext } from "./AuthContext";
import "./Login.css";
import { CustomizedSnackbars } from "@teamyourcircle/oauth-integration";
import Cookies from "js-cookie";
import Navbar from "./Navbar";
import vector from "./images/loginVector.svg";
import Hidden from "@material-ui/core/Hidden";
import PropTypes from "prop-types";

function ChangePassword(props) {
  const { REACT_APP_AUTH_SERVICE_BASE_URL } = process.env;
  const [isAuth, setAuth, token] = useContext(AuthContext);
  const [isPasswordChanged, setisPasswordChanged] = useState(false);
  const [responseSummary, setResponseSummary] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      if (responseSummary.length)
        setResponseSummary(responseSummary.length - 1, 1);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPasswordChanged]);
  useEffect(() => {
    setAuth(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    new_password: "",
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const classes = useStyles();
  const postData = (e) => {
    let status;
    e.preventDefault();
    const data = {
      password: values.password,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'access-token': token,
      },
      body: JSON.stringify(data),
    };
    if (data.new_password !== "" && data.password !== "") {
      setisPasswordChanged(true);
      fetch(REACT_APP_AUTH_SERVICE_BASE_URL + "/auth/api/change/password", options)
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((data) => {
          if (status !== 200) {
            try {
              setResponseSummary([
                ...responseSummary,
                {
                  status,
                  content: data.message,
                  severity: "error",
                },
              ]);
            } catch (err) {
              setResponseSummary([
                {
                  status,
                  content: data.message,
                  severity: "error",
                },
              ]);
            }
          } else {
            try {
              setResponseSummary([
                ...responseSummary,
                {
                  status,
                  content: "Password successfully change",
                  severity: "success",
                },
              ]);
            } catch (err) {
              setResponseSummary([
                {
                  status,
                  content: "Password successfully change",
                  severity: "success",
                },
              ]);
            }
            Cookies.set("Token", data.token);
            Cookies.set("isAuth", isAuth);
          }
          setisPasswordChanged(false);
        });
    } else {
      setResponseSummary([
        ...responseSummary,
        {
          status: 400,
          content: "new password is emty",
          severity: "error",
        },
      ]);
    }
  };

  return (
    <React.Fragment>
      <div className="login_complete">
        <Navbar />
        <div className="align">
          <Hidden only={["sm", "xs"]}>
            <div className="text">
              <h2>ENTER IN CIRCLE ACCOUNT</h2>
              <p>
                Change Password is far better than remembering it
              </p>
              <img src={vector} alt="svg" />
            </div>
          </Hidden>
          <div>
            {
              <div className="login">
                {!isPasswordChanged ? (
                  <div className="login_container">
                    <div className="mobile">
                      <div class="mobile_look"></div>
                    </div>
                    <h2>Change password</h2>
                    <form onSubmit={postData}>
                      <svg
                        width="443"
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
                      </svg>

                      <div className="info">
                        <TextField
                          style={{ width: "340px", marginLeft: "-20px" }}
                          className={classes.margin}
                          label="New password"
                          variant="outlined"
                          id="mui-theme-provider-outlined-input"
                          value={values.new_password}
                          type="password"
                          onChange={handleChange("new_password")}
                        />
                        <FormControl
                          style={{ width: "340px", marginLeft: "-20px" }}
                          className={clsx(classes.margin, classes.textField)}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Repeat Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            endAdornment={
                              <InputAdornment position="">
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
                        Submit
                      </Button>
                    </form>
                    <div class="status">
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
                    </div>
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

ChangePassword.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};
export default ChangePassword;
