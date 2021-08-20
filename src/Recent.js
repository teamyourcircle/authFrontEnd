import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import formLogo from "./images/recent-form-logo.svg";
import { AuthContext } from "./AuthContext";
import ReactTimeAgo from 'react-time-ago'
import nothingFound from "./images/nothingFound.svg";
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
function createData(FormName, time) {
  return { FormName, time };
}

function createRow(formName, time) {
  return createData(formName, time);
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
  const [isLoaded, setisLoaded] = React.useState(false);
  const [is_Auth, setAuth, token, setToken] = React.useContext(AuthContext);
  const [recentActivity, setRecentActivity] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    if (recentActivity.length) {
      setRows(
        recentActivity.map((r) => {
          return createRow(r.name, <ReactTimeAgo date={r.lastUpdated} locale="en-US"/>);
        })
      );
    }
  }, [recentActivity]);
  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "access-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(
      REACT_APP_AUTH_SERVICE_BASE_URL + "/auth/api/activity/recent/listing",
      options
    )
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
                  </TableRow>
                ))}
              </>
            ) : (
             null
            )}
          </TableBody>
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
