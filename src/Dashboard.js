import React,{useState,useContext,useEffect} from 'react';
import './Dashboard.css';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext} from './AuthContext'
import Button from '@material-ui/core/Button';
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
    isLoaded ? (<p>{email}</p>): (<Skeleton variant="text" width={400} height={40}/>)
    }
    </div>
  </div>
     

</div>
</React.Fragment>
    );
}

export default Dashboard;