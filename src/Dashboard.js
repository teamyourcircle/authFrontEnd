import React,{useState,useContext,useEffect} from 'react';
import './Dashboard.css';
import {Avatar} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext} from './AuthContext'
import Button from '@material-ui/core/Button';
import MediaCard from './MediaCard'
import CustomizedSnackbars from './Snakbar';


function Dashboard() {

  const url = 'http://localhost:5000/api/users/dashboard'
 

const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
const [isLoaded,setisLoaded] = useState(false);  
const options = {
  method: 'GET',
  headers:{
    'access-token':token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};
const [email,setEmail] = useState('');
const [isVerified,setisVerified] = useState(true);
  useEffect(() =>{
  fetch(url, options).then(response => response.json()).then(data => {
    setEmail(data.email);
    setisVerified(data.isverified);
    setisLoaded(true);
    console.log(data);
  })

  }, [is_Auth])
  //create token 
  const sendLink = async () =>{
    const options = {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json'
      },
      body: JSON.stringify({"email":email})
      
      }
    const res = await fetch("http://localhost:5000/api/create/token", options);
    const data = await res.json();
    console.log(data);
  }

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
      <React.Fragment>
        <div>
        {!isVerified ?  (<React.Fragment><CustomizedSnackbars severity={"warning"} content={"Your Email is not Verified !"}/>
          <Button onClick={sendLink}>
              Send Link Again
          </Button>
          
          </React.Fragment>) : (null)}
        </div>
      <div className="dash">
        <div className="dashboard">
          <div className="dashboard_info">
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
        <Avatar style={{width:'150px',height:'150px'}} src="" alt="User-profile"/>
        </IconButton>
      </label>
    {
    isLoaded ? (<p>{email}</p>): (<Skeleton variant="text" width={400} height={40}/>)
    }
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
         <Button size="large" color="secondary" variant="contained" style={{width:'100%'}}>
          <a href="#">Get Started</a>
        </Button>
              <MediaCard 
        img="https://i.ibb.co/1RGWZt4/Black-White-and-Triangle-Data-Chase-Games-Logo-1.png"
        name="Survey Forms"
        description="Form survey service - form survey service will help you in creating a 
        quick form with Rich field types and help you to create quality Decision with simple visualizing tool."
        />
       <Button size="small" color="secondary" variant="contained" style={{width:'100%'}}>
          <a href="http://localhost:8080/dashboard/form" target="_blank"> Get Started</a>
        </Button>
      </div>

       
        

</div>
</React.Fragment>
    );
}

export default Dashboard;