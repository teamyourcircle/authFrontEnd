import React from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import {Avatar} from '@material-ui/core'
import './SignOut.css'
function SignOut() {
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: { 
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
      }));
      const classes = useStyles();
    return (
      <div className="login">
      <div className="login_container">
    <CachedIcon/>
      <h2>You are Succesfully Sign Out</h2>
      <div className="icon">
<CheckCircleRoundedIcon/>
<div className="id">
<Avatar />
<p>Kumaranmol.ak2004@gmail.com</p>
</div>
        </div>
        <Button 
      variant="contained"
      color="secondary"
      className={classes.button}
      size="large"
      color="secondary"
     >Sign In</Button>
          </div>
  </div>
    );
}

export default SignOut;