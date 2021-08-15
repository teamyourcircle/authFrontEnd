import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import BasicTable from "./Table";
import { makeStyles } from "@material-ui/core/styles";
export default function ApiTable(email) {

  React.useEffect(() => {

    console.log('email',email);//get request

  }, [])

  const onClickButton = () =>{
    window.open('/create/token', "_self")
  }
  const useStyles = makeStyles((theme) => ({
    button: {
      borderRadius:'12px',
      backgroundColor:'#28284e',
      "&:focus":{
        backgroundColor:'#28284e'
      }
    },
  }));

  const classes = useStyles();
  return (
    <div className="App">
      <div className="card">
        <div className="card_header">
          <h3 style={{
    color: '#28284e',
    fontSize: '25px'

          }}>Manage Your Api Keys</h3>
        </div>
        <br />
        <BasicTable />
        <div className="button-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems:'center'
        }}>
          <div style={{
            width:'50%'
          }}>
        <Button
            variant="contained"
            color="secondary"
            // size="medium"
            startIcon={<AddIcon />}
            onClick={onClickButton}
            className={classes.button}
          >
            Create New Api Key
          </Button>
          </div>
          </div>
      </div>
    </div>
  );
}
