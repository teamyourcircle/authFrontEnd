import React from 'react';
import './Dashboard.css';
import {Avatar} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

function Dashboard() {
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        input: {
          display: 'none',
        },
      }));
      const classes = useStyles();
    return (
        <div className="dashboard">
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
        <Avatar style={{width:'150px',height:'150px'}} src="" alt="User-profile"/>
        </IconButton>
      </label>
            <h1>Kumaranmol.ak2004@gmail.com</h1>
            <Skeleton variant="circle" width={150} height={150} />
            <Skeleton variant="text" width={500} height={40}/>
        </div>
    );
}

export default Dashboard;