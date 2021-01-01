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
import EditIcon from '@material-ui/icons/Edit';
import { AuthContext} from './AuthContext'

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
  useEffect(() => {
    const url = "http://localhost:5000/api/token/get/apis";
    fetch(url,options).then(res =>res.json()).then(data=>{
      setstate(data);
      if(data['apis_collection']!==undefined){
        const array = data['apis_collection'];
        let setrows = [];  
        for(var i=0;i<array.length;i++){
          let s = array[i];
          setrows[i] = createData(s.name,s.prefix,s.scope.join(', '), <React.Fragment><DeleteIcon /><EditIcon /></React.Fragment>)
        }
        rows = setrows;
        setisloaded(true)
      }
    })
  }, [])

  return (
  <div>{
    isloaded ? (<TableContainer component={Paper}>
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
    
  );
}
