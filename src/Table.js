import React, {useEffect,useContext,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import deleteLogo from "./images/deleteIcon.png";
import editLogo from "./images/editIcon.png"
import Button from '@material-ui/core/Button';
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
  const [rows,setRows] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      if (responseSummary.length)
        setResponseSummary(responseSummary.length - 1, 1);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleted,isEdit]);

  //fetch all api's
  useEffect(() => {
    const options = {
      method: 'GET',
      headers:{
        'access-token':token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };
    const url = "http://localhost:5000/auth/api/get/apis";
    fetch(url,options).then(res =>res.json()).then(data=>{
      setstate(data.data);
    })
  }, []);

  //adding action to each row
  useEffect(() => {
    let newArr=[];
    for(let i=0;i<state.length;i++){
      const {name,prefix,scopes} = state[i];
      newArr.push(createData(name,prefix,scopes.join(', '), <React.Fragment>
      <Button  onClick = {handleDelete} >
        <a><img id={`${prefix}`} src={deleteLogo} alt={"DELETE"}></img></a>
      </Button>
      <Button  onClick = {handleEdit} >
        <a><img id={`${prefix}`} src={editLogo} alt={"EDIT"}></img></a>
      </Button></React.Fragment>));
    }
    setRows(newArr);
    setisloaded(true);
  }, [state]);

  const handleDelete = event => {
    var pf = event.target.id;
    if(window.confirm("You are about to delete this API key!!!")){
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
          let newArr = state.filter( (d,i) => { if(d['prefix'] !== pf) return d });
          setIsDeleted(!isDeleted);
          setstate(newArr);
        }
      });
    }
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
      console.log(data)
      const status=data.statusCode;
      if (status == 404) {
        try {
          setResponseSummary([
            ...responseSummary,
            {
              status,
              content: 'Failed to edit API',
              severity: "error",
            },
          ]);
        } catch (err) {
          setResponseSummary([
            {
              status,
              content: 'Failed to edit API',
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
              content: 'API edited successfully!',
              severity: "success",
            },
          ]);
        } catch (err) {
          setResponseSummary([
            {
              status,
              content: 'API edited successfully!',
              severity: "success",
            },
          ]);
        }
      }
      setHashed(data["api_key"]);
      setIsEdit(true);
    });
  }

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
                  {console.log(rows)}
                  {rows.length?rows.map(({name,prefix,scopes,actions}) => (
                    <TableRow key={name}>
                      <TableCell component="th" scope="row">{name}</TableCell>
                      <TableCell align="right">{prefix}</TableCell>
                      <TableCell align="right">{scopes}</TableCell>
                      <TableCell align="right">{actions}</TableCell>
                    </TableRow>
                  )) : (<></>)}
                </TableBody>
              </Table>
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
                    responseSummary.length && back ? (
                      responseSummary.map((r) => (
                        <CustomizedSnackbars
                          content={r.content}
                          severity={r.severity}
                        />
                      ))
                    ) : (
                      <></>
                    ))
                }
              </div>
            </TableContainer>) : (null)
          }</div>
        ) : ( <Generate loaded={false} keys={hashed} setBack={setBack}/>)
      }
    </React.Fragment>
  );
}