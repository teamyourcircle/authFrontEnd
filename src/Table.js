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
  const [is_Auth,setAuth,token,setToken] = useContext(AuthContext);
  const [isloaded, setisloaded] = useState(false)
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
      body:JSON.stringify({"pref": pf})
    };
    const url = "http://localhost:5000/api/token/delete/apis";
    fetch(url, optionsDel).then( res => res.json()).then( data => {
      let newArr = state['apis_collection'].filter( (d,i) => { if(d['prefix'] !== pf) return d });
      setstate({ 'apis_collection': newArr});
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
      body:JSON.stringify({"pref": event.target.id})
    };
    const url = "http://localhost:5000/api/token/put/apis";
    fetch(url, optionsEdit).then( res => res.json()).then( data => {
      console.log(data) 
      setHashed(data["hashed_token"]);
      setIsEdit(true);
    });
  }
  useEffect(() => {
    if(state['apis_collection']!==undefined){
      const array = state['apis_collection'];
      let setrows = [];  
      for(var i=0;i<array.length;i++){
        let s = array[i];
        setrows[i] = createData(s.name,s.prefix,s.scope.join(', '), <React.Fragment>
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
    const url = "http://localhost:5000/api/token/get/apis";
    fetch(url,options).then(res =>res.json()).then(data=>{
      setstate(data);
      
      console.log(data);
    })
  }, [])

  return (
    <React.Fragment>
      {
        !isEdit ? (
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
            </TableContainer>) : (null)
          }</div>
        ) : ( <Generate loaded={false} keys={hashed}/>)
      }
    </React.Fragment>
  );
}