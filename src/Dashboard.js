import React,{useState,useContext,useEffect} from 'react';
import './Dashboard.css';
import {Avatar} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext} from './AuthContext'
import Button from '@material-ui/core/Button';
import MediaCard from './MediaCard'


function Dashboard() {

  const url = 'http://localhost:5000/api/users/dashboard'
 

  //this is the token comming from the header .
const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
const options = {
  method: 'GET',
  headers:{
    'access-token':token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};
const [email,setEmail] = useState('');

  useEffect(() =>{
  console.log("is Authenticated ",is_Auth);  
  fetch(url, options).then(response => response.json()).then(data => setEmail(data.email))

  }, [is_Auth])


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
      <div className="dash">
        <div className="dashboard">
          <div className="dashboard_info">
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
        <Avatar style={{width:'150px',height:'150px'}} src="" alt="User-profile"/>
        </IconButton>
      </label>
    <p>{email}</p>
    </div>
    <div className="dashboard_button">
    <Button variant="contained" color="secondary" size="large" style={{padding:'10px 40px',fontSize:'18px'}}>
        Edit Profile
      </Button>
  </div>
  </div>
      <div className="product">
        <MediaCard 
        img="https://i.ibb.co/MM1hj9Q/Black-White-and-Triangle-Data-Chase-Games-Logo.png"
        name="Media Player"
        description="Media player service -  a video player help in manipulation of your video content by embedded any form in mentioned time stamps , 
        with time stamps based analysis on basis of views , with Sketch annotations on particular frame at mentioned time stamps"
        />
              <MediaCard 
        img="https://i.ibb.co/1RGWZt4/Black-White-and-Triangle-Data-Chase-Games-Logo-1.png"
        name="Survey Forms"
        description="Form survey service - form survey service will help you in creating a 
        quick form with Rich field types and help you to create quality Decision with simple visualizing tool."
        />
               <MediaCard 
        img="https://i.ibb.co/qC0jXwb/Black-White-and-Triangle-Data-Chase-Games-Logo-2.png"
        name="Live Play"
        description="Webinar service - help in creating quick webinar in real time 
        mode and can be attend virtually after that interaction supported for people aim to Target there desired audience by quality interaction ."
        />
      

      </div>
      
         {/*   <Skeleton variant="circle" width={150} height={150} />
            <Skeleton variant="text" width={500} height={40}/>*/}
        

</div>
    );
}

export default Dashboard;