import React from 'react';
import './Temporary.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  button: {
    width: '443px',
    height: '60px',
    background: '#28284E',
    borderRadius: '9px',
    fontFamily: 'Segoe UI',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '26px',
    lineHeight: '16px',
    color: '#FFFFFF',  
    "&:focus":{
      backgroundColor:'#28284e'
    }
  },
  root: {
    "&$checked": {
      color: "#28284E"
    }
  },
 
});
function Temporary({api_key}) {
  const classes = useStyles();
    return (
        <div className="App_token">
        <div className="key_api">
          <div className="key_header">
            <h1>Your API key</h1>
          </div>
          <hr />
          <div className="key_content">
            <span className="mid_high">New Api Created and </span>
            <span className="high">It will displayed only now</span>
                <p style={{display:'flex',alignItems: 'center',paddingLeft:'9px'}}>{api_key}</p>
            <span className="warn">
              Please store it somewhere safe because as soon as you navigate away
              from this <br /> page, we will not albe to restore or retrive this
              generated token.
            </span>
          </div>
        </div>
        <div className="button-container">
              <Button className={classes.button}>Back</Button>
            </div>
      </div>
    );
}

export default Temporary;