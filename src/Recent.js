import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import formLogo from './images/recent-form-logo.svg'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  logo:{
    height: '53px',
    width: '42.76px'
  },
  formDetails:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: '4px'
  }
});

function createData(FormName, owner,time) {
  return { FormName, owner,time };
}

const rows = [
  createData('Test Form','Prachi kansal','48m ago'),
  createData('Getting Started with OneDrive','Prachi Kansal’s OneDrive [Personal]','May 3'),
  
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                  <div style={{display:'flex'}}>
                <img src={formLogo} className={classes.logo}/>
                <div className={classes.formDetails}>
                    <span>{row.FormName}
                        </span>
                        <span>
                           {row.owner}
                        </span>
                    </div>
                </div>
              </TableCell>
              
              <TableCell align="left">{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
