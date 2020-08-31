import React from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import './Join.css';
function Join() {
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));
        const classes = useStyles();
    return (
        <div className="join">
               <form className={classes.root} noValidate autoComplete="off">
      <TextField id="mui-theme-provider-outlined-input" label="Join Code" variant="outlined" size="small"/>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        size="large"
        endIcon={<MeetingRoomIcon/>}
      >
      Join
      </Button>
    </form>

        </div>
    );
}

export default Join;