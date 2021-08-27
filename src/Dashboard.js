import React, { useState, useContext, useEffect } from 'react';
import './Dashboard.css';
import Skeleton from '@material-ui/lab/Skeleton';
import {useLocation} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from './AuthContext'
import Button from '@material-ui/core/Button';
import { CustomizedSnackbars } from '@teamyourcircle/oauth-integration';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from './ApiTable'
import Recent from './Recent.js'
import Navbar from './Navbar'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {console.log(children)}
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




function Dashboard() {

  const url = 'http://localhost:5000/auth/api/dashboard'
  const [is_Auth, setAuth, token, setToken] = useContext(AuthContext);
  const [isLoaded, setisLoaded] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const options = {
    method: 'GET',
    headers: {
      'access-token': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
  const [email, setEmail] = useState('');
  const search = useLocation().search;
  const tabIndex = new URLSearchParams(search).get('tab');
  const [value, setValue] = useState(parseInt(tabIndex));
  const [isVerified, setisVerified] = useState(true);

  useEffect(() => {
    fetch(url, options).then(response => response.json()).then(data => {
      setEmail(data.email);
      setisVerified(data.isverified);
      setisLoaded(true);
      console.log(data);
    })

  }, [is_Auth])
  //create token
  const sendLink = async () => {
    const options = {
      method: 'GET',
      headers: {
        'access-token': token,
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
      flexGrow: '1'
    },
    indicator: {
      backgroundColor: '#28284E',
    },
    app: {
      background: 'white'
    },
    input: {
      display: 'none',
    },
  }));

  const classes = useStyles();
  return (
    <React.Fragment>
      <div>
        {!isVerified ? (<React.Fragment><CustomizedSnackbars severity={"warning"} content={"Your Email is not Verified !"} />
          <Button onClick={sendLink}>
            Send Link Again
          </Button>

        </React.Fragment>) : (null)}
      </div>
    
        <div className="dashboard">
          <div className="dashboard_info">
            {
              isLoaded ? (
                <React.Fragment>
                  <div className={classes.root}>
                    <AppBar position="static" className={classes.app}>
                      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" classes={{
                        indicator: classes.indicator
                      }} >
                        <Tab label={<span style={{
                          color: '#28284E', fontWeight: '600',
                          fontFamily: 'Segoe UI'
                        }}>Recent</span>} {...a11yProps(0)} />
                        <Tab label={<span style={{
                          color: '#28284E', fontWeight: '600',
                          fontFamily: 'Segoe UI'
                        }}>API</span>} {...a11yProps(1)} />
                      </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                     <Recent/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                     <Table/>
                    </TabPanel>
                  </div>

                </React.Fragment>
              ) : (<Skeleton variant="text" width={400} height={40} />)
            }
          </div>
      </div>
    </React.Fragment >
  );
}

export default Dashboard;




TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};