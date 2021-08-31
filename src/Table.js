import React, {useEffect,useContext,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext} from './AuthContext'
import Generate from "./Generate";
import { CustomizedSnackbars } from "@teamyourcircle/oauth-integration";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});



function createData(name, prefix, scopes, actions) {
  return { name, prefix, scopes, actions };
}
var rows=[];
export default function BasicTable() {
  const classes = useStyles();
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [hashed, setHashed] = React.useState("");
  const [isEdit, setIsEdit] = React.useState(false);
  const [state, setstate] = React.useState([]);
  const [responseSummary, setResponseSummary] = useState([]);
  const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
  const [isloaded, setisloaded] = useState(false);
  const [back, setBack] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      if (responseSummary.length)
        setResponseSummary(responseSummary.length - 1, 1);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted]);
  const options = {
    method: 'GET',
    headers:{
      'access-token':token,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };

  const handleDelete = event => {
    var pf = event.target.id;
    const optionsDel = {
      method: 'DELETE',
      headers:{
        'access-token':token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({"prefix": pf})
    };
    const url = "http://localhost:5000/auth/api/delete/apis";
    fetch(url, optionsDel).then( res => res.json()).then( data => {
      let newArr = state.filter( (d,i) => { if(d['prefix'] !== pf) return d });
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
      }
      setstate(newArr);
      setIsDeleted(!isDeleted);
    });
  }

  const handleEdit = event => {
    const optionsEdit = {
      method: 'PUT',
      headers:{
        'access-token':token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body:JSON.stringify({"prefix": event.target.id})
    };
    const url = "http://localhost:5000/auth/api/put/apis";
    fetch(url, optionsEdit).then( res => res.json()).then( data => {
      setHashed(data["api_key"]);
      setIsEdit(true);
    });
  }
  useEffect(() => {
    if(state.length){
      const array = state;
      let setrows = [];
      for(var i=0;i<array.length;i++){
        let s = array[i];
        setrows[i] = createData(s.name,s.prefix,s.scopes.join(', '), <React.Fragment>
          <Button  onClick = {handleDelete} >
            <a id={`${s.prefix}`}>
            Delete
            </a>
          </Button>
          <Button  onClick = {handleEdit} >
            <a id={`${s.prefix}`}>
            Edit
            </a>
          </Button></React.Fragment>)
      }
      rows = setrows;
      setisloaded(true)
    }
  }, [state]);

  useEffect(() => {
    const url = "http://localhost:5000/auth/api/get/apis";
    fetch(url,options).then(res =>res.json()).then(data=>{
      setstate(data.data);
    })
  }, []);

  useEffect(() => {
    console.log('isBacked ? '+back)
  }, [back]);

  return (
    <React.Fragment>
      {
        !isEdit || back ? (
          <div>{
            isloaded ? (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Api Name</TableCell>
                    <TableCell align="right">Api Prefixes</TableCell>
                    <TableCell align="right">Scopes</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="right">{row.prefix}</TableCell>
                      <TableCell align="right">{row.scopes}</TableCell>
                      <TableCell align="right">{row.actions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div class="status">
                {responseSummary.length ? (
                  responseSummary.map((r) => (
                    <CustomizedSnackbars
                      content={r.content}
                      severity={r.severity}
                    />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </TableContainer>) : (null)
          }</div>
        ) : ( <Generate loaded={false} keys={hashed} setBack={setBack}/>)
      }
    </React.Fragment>
  );
}