import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "./Login.css";
import "./ForgotPassword.css";
import { CustomizedSnackbars } from "@teamyourcircle/oauth-integration";
import Navbar from './Navbar'

function ForgotPassword() {
  const { REACT_APP_AUTH_SERVICE_BASE_URL } = process.env;
  const [email, setEmail] = useState("");
  const [isLoaded, setisLoaded] = useState(false);
  const [responseSummary, setResponseSummary] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      if (responseSummary.length)
        setResponseSummary(responseSummary.length - 1, 1);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = () => {
    setisLoaded(true);
    let status;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };
    fetch(
      `${REACT_APP_AUTH_SERVICE_BASE_URL}/auth/api/forgot_password/initiate`,
      options
    )
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
                content: "mail sent successfully",
                severity: "success",
              },
            ]);
          } catch (err) {
            setResponseSummary([
              {
                status,
                content: "mail sent successfully",
                severity: "success",
              },
            ]);
          }
        }
        setisLoaded(false);
      });
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <div className="forgot-nav">
      <Navbar/>
      </div>
      <div className="back" style={{ background: "#28284E" }}>
     
      </div>
      {!isLoaded ? (
        <div className="forgot">
          <div className="forgot_container">
            <div className="mobile">
              <div class="mobile_look"></div>
            </div>
            <h2>Forgot Password</h2>
            <p style={{ lineHeight: "27px", color: "grey" }}>
              Enter your Registered email
              <br />
              address and we will send you a password reset link.
            </p>
            <TextField
              fullWidth
              className={classes.margin}
              label="E-Mail"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              size="large"
              style={{
                backgroundColor: "#28284E",
                fontSize: "20px",
                fontWeight: "normal",
                borderRadius: "13px",
                padding: "10px",
                marginLeft: "-20px",
              }}
              onClick={handleSubmit}
              value="submit"
            >
              Send
            </Button>
          </div>
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
        <div>loading...</div>
      )}
    </React.Fragment>
  );
}

export default ForgotPassword;
