import React from 'react';
import './Host.css'
import { makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
function Host() {
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
  
        <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue="2017-05-24"
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
           <TextField
        id="time"
        label="Alarm clock"
        type="time"
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
 
  
   <TextField id="standard-basic" label="TiTle" />
   <br />

   <Button 
   style={{marginTop:'30px',
width:'85%'}}
      color="secondary"
      variant="contained"
      size="large"
      value="submit"
      className={classes.button}
     
      endIcon={<AssignmentTurnedInIcon/>}>Host</Button>
      
      </form>     
 );
}

export default Host;