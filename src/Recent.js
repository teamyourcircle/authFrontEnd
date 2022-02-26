import React,{useEffect,useState,useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import formLogo from "./images/recent-form-logo.svg";
import deleteLogo from "./images/deleteIcon.png";
import { AuthContext } from "./AuthContext";
import ReactTimeAgo from 'react-time-ago'
import nothingFound from "./images/nothingFound.svg";
import { Button } from "@material-ui/core";
import { CustomizedSnackbars } from "@teamyourcircle/oauth-integration";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  logo: {
    height: "53px",
    width: "42.76px",
  },
  formDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: "4px",
  },
});

function createData(FormName, time, action) {
  return { FormName, time, action };
}

function createRow(formName, time, action) {
  return createData(formName, time, action);
}

function NotFoundVector() {
  return(
<div style={{
      display:'flex',
      justifyContent:'center'
    }}>
    
    <img src={nothingFound} alt="nothing-found" />
    
      </div>
  )
}
export default function BasicTable() {
  const classes = useStyles();
  const { REACT_APP_AUTH_SERVICE_BASE_URL } = process.env;
  const [isLoaded, setisLoaded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [is_Auth, setAuth, token, setToken] = useContext(AuthContext);
  const [recentActivity, setRecentActivity] = useState([]);
  const [rows, setRows] = useState([]);
  const [responseSummary, setResponseSummary] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      if (responseSummary.length)
        setResponseSummary(responseSummary.length - 1, 1);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "access-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(REACT_APP_AUTH_SERVICE_BASE_URL + "/auth/api/activity/recent/listing",options)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setRecentActivity(data);
      setisLoaded(true);
    })
    .catch((err) => {
      setisLoaded(true);
    });
  }, []);

  useEffect(() => {
    let newArr=[];
    for(let i=0;i<recentActivity.length;i++){
      const {name,id,lastUpdated} = recentActivity[i];
      newArr.push(createRow(name, <ReactTimeAgo date={lastUpdated} locale="en-US"/>,
        <React.Fragment>
          <Button onClick={handleDelete}>
            <a id={id}><img id={id} src={deleteLogo} alt={"delete-icon"}></img></a>
          </Button>
        </React.Fragment>
      ));
    }
    setRows(newArr);
  }, [recentActivity]);

  const handleDelete = (event)=>{
    const deletingId = event.target.id;
    if(window.confirm("Delete this entry")){
      const url = REACT_APP_AUTH_SERVICE_BASE_URL+"/auth/api/activity/recent/listing";
      const optionsDel={
        method:"DELETE",
        headers: {
          "access-token": token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({id:deletingId})
      }
      fetch(url, optionsDel).then( res => res.json()).then( data => {
        const status = data.statusCode;
        if (status != 200) {
          try {
            setResponseSummary([
              ...responseSummary,
              {
                status,
                content: data.msg,
                severity: "error",
              },
            ]);
          } catch (err) {
            setResponseSummary([
              {
                status,
                content: data.msg,
                severity: "error",
              },
            ]);
          }
        } else {
          try {
            setResponseSummary([
              ...responseSummary,
              {
                status,
                content: data.msg,
                severity: "success",
              },
            ]);
          } catch (err) {
            setResponseSummary([
              {
                status,
                content: data.msg,
                severity: "success",
              },
            ]);
          }
          setIsDeleted(!isDeleted);
          setRecentActivity(recentActivity.filter( (activity) => { if(activity.id !== deletingId) return activity; }));
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }
  
  return (
    <>
    <TableContainer component={Paper}>
      {isLoaded ? (
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {rows && rows.length ? (
              <>
                {console.log(rows)}
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <div style={{ display: "flex" }}>
                        <img src={formLogo} className={classes.logo} />
                        <div className={classes.formDetails}>
                          <span>{row.FormName}</span>
                          <span>{row.owner}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="left">{row.time}</TableCell>
                    <TableCell align="right">{row.action}</TableCell>
                  </TableRow>
                ))}
              </>
            ) : (
             null
            )}
          </TableBody>
          <div class="status">
                {
                  isDeleted ?
                  (responseSummary.length ? (
                    responseSummary.map((r) => (
                      <CustomizedSnackbars
                        content={r.content}
                        severity={r.severity}
                      />
                    ))
                  ) : (
                    <></>
                  )) : (
                    <></>
                  )
                }
              </div>
        </Table>
      ) : (
        <>loading..</>
      )}
    </TableContainer>
    {
      (rows && rows.length)?null: (<NotFoundVector/>)
    }
      </>
   
  );
}
