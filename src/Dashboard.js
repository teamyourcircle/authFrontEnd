import React,{useState,useContext,useEffect} from 'react';
import './Dashboard.css';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext} from './AuthContext'
import Button from '@material-ui/core/Button';
import {CustomizedSnackbars} from '@teamyourcircle/oauth-integration';
import Avatar from '@material-ui/core/Avatar';

function Dashboard() {

const url = 'http://localhost:5000/auth/api/dashboard'
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
      method: 'GET',
      headers: {
        'access-token':token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
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
    {
    isLoaded ? ( 
      <React.Fragment>
        <div className="first">
        <Avatar style={{background:'#f50057',padding:'5px'}}>AK</Avatar>
      <p>{email}</p>
        </div>
        <div className="show_sidebar">
            <div className="show_option">
            <img src="https://www.flaticon.com/svg/static/icons/svg/103/103093.svg"/>
            <a href="/developers" className="api"><h3>Api</h3></a>
                </div>
                <div className="show_option">
                <img src="https://www.flaticon.com/svg/static/icons/svg/2910/2910834.svg"/>
                <a href="http://localhost:5000/developer/api-docs" className="api_docs"><h3>Api Docs</h3></a>
                </div>
                <div className="show_option">
                <img src="https://www.flaticon.com/svg/vstatic/svg/1087/1087930.svg?token=exp=1613485871~hmac=7bb9ee4d6d1a2d36435ae15452a8ee43"/>
                <a href="/integration" className="integration"><h3>Integration</h3></a>
                </div>
        </div>
 
      </React.Fragment>
      ): (<Skeleton variant="text" width={400} height={40}/>)
    }
    </div>
  </div>
</div>
</React.Fragment>
    );
}

export default Dashboard;