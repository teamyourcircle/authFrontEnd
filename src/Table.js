import React from "react";
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
const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(name, prefix, scopes, actions) {
  return { name, prefix, scopes, actions };
}

const rows = [
  createData("TestApi", "zxYuiO", "forms.read | forms.write", <React.Fragment><DeleteIcon /><EditIcon /></React.Fragment>),
];

export default function BasicTable() {
  const classes = useStyles();

  return (
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
    </TableContainer>
  );
}
