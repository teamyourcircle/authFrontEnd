import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import BasicTable from "./Table";
export default function ApiTable(email) {

  React.useEffect(() => {

    console.log('email',email);//get request

  }, [])

  const onClickButton = () =>{
    window.open('/create/token', "_self")
  }
  return (
    <div className="App">
      <div className="card">
        <div className="card_header">
          <h3>Manage Your Api Keys</h3>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<AddIcon />}
            onClick={onClickButton}
          >
            Create New Api Key
          </Button>
        </div>
        <br />
        <BasicTable />
      </div>
    </div>
  );
}
