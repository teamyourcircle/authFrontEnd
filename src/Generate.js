import React, { useState, useContext, useEffect } from "react";
import "./Generate.css";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { AuthContext } from "./AuthContext";
import Temporary from "./Temporary";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  button: {
    width: "443px",
    height: "60px",
    background: "#28284E",
    borderRadius: "9px",
    fontFamily: "Segoe UI",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "26px",
    lineHeight: "16px",
    color: "#FFFFFF",
  },
  root: {
    "&$checked": {
      color: "#28284E",
    },
  },
  checked: {},
});
function Generate({ loaded, keys }) {
  const [apiname, setapiname] = React.useState();
  const [scopes, setScopes] = React.useState([]);
  const [is_Auth, setAuth, token, setToken] = useContext(AuthContext);
  const [isLoaded, setisLoaded] = useState(loaded);
  const [key, setkey] = useState(keys);
  const classes = useStyles();
  const handleSubmit = () => {
    const body = {
      name: apiname,
      scopes: scopes,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "access-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    console.log(body);
    const url = "http://localhost:5000/auth/api/generator";
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        setkey(data["api_key"]);
        setisLoaded(false);
      });
  };

  const handleScopes = (e) => {
    let index = scopes.indexOf(`${e.target.value}`);
    if (index === -1) {
      setScopes([...scopes, e.target.value]);
    } else {
      scopes.splice(index, 1);
    }
  };

  return (
    <div className="generate-container">
      <div className="generate">
        {isLoaded ? (
          <React.Fragment>
            <h2>Create New Api Key</h2>
            <hr className="top-ruler" />
            <div className="form-container">
              <div className="form">
                <div className="input-field">
                  <label
                    style={{
                      fontSize: "27.77px",
                      color: "#28284E",
                      fontWeight: "400",
                    }}
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setapiname(e.target.value)}
                    className="text-input"
                  />
                </div>

                <h3 className="scope-heading">Choose Scopes:</h3>
                <div className="option">
                  <span>Form Apis:</span>
                  <div className="checkbox-content">
                    <Checkbox
                      size="small"
                      inputProps={{ "aria-label": "checkbox with small size" }}
                      value="form.read"
                      onChange={handleScopes}
                      style={{
                        transform: "scale(2)",
                      }}
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                    <label>form.read</label>
                  </div>
                  <div className="checkbox-content">
                    <Checkbox
                      size="small"
                      inputProps={{ "aria-label": "checkbox with small size" }}
                      value="form.delete"
                      onChange={handleScopes}
                      style={{
                        transform: "scale(2)",
                      }}
                      classes={{
                        root: classes.root,
                        checked: classes.checked,
                      }}
                    />
                    <label>form.delete</label>
                  </div>
                </div>
              </div>
            </div>
            <hr className="bottom-ruler" />
            <div className="button-container">
              <Button className={classes.button} onClick={handleSubmit}>
                Create
              </Button>
            </div>
          </React.Fragment>
        ) : (
          <Temporary api_key={key} />
        )}
      </div>
    </div>
  );
}

export default Generate;
