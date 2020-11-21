import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import CustomizedSnackbars from './Snakbar';

function Verify() {
    let {token} = useParams();
    const [isverified,setVerified] = useState(false);
    useEffect(async ()=>{

        const res = await fetch(`http://localhost:5000/api/verify/${token}`);
        if(res.ok){
            const data = await res.json();
            setVerified(true);
           setTimeout(()=>{
            window.open("/dashboard","_self");
           },2000);
        }
        else{
            setVerified(false);
        }
        

    },[]);
  return (
      <div>
            {isverified ? (<div>
                <CustomizedSnackbars severity={"success"} content={"Your Email is Verified !"}/>
                <h2>Redirecting To DashBoard .</h2>
            </div>) : (<div>
                <CustomizedSnackbars severity={"error"} content={"Invalid Jwt Token !"}/>

            </div>)}
      </div>
    );
}

export default Verify;