import React, { useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import FacebookLogin from "react-facebook-login";
import FaceBookButton from "./FaceBookButton";
import "./Facebook.css";

function LoginFacebook({responseSummary,setResponseSummary,setisLoggedIn}) {
  const [isAuth, setAuth] = useContext(AuthContext);
  const [clientId, setClientId] = useState("");
  const { REACT_APP_AUTH_SERVICE_BASE_URL } = process.env;
  useEffect(() => {
    fetch(REACT_APP_AUTH_SERVICE_BASE_URL + "/auth/api/app/credentials")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setClientId(data.facebook_app_id);
      });
  }, []);
  const responseFacebook = (res) => {
    let status;
    console.log(res.accessToken);
    let token_Id = res.accessToken;
    fetch(REACT_APP_AUTH_SERVICE_BASE_URL + "/auth/api/socialLogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: `${token_Id}`,
        social_type: "facebook",
      }),
    })
      .then((res) => {
        status = res.status;
        return res.json();
      })
      .then((data) => {
        if (status !== 200) {
          try {
            setResponseSummary([
              ...responseSummary,
              {
                status,
                content: data.message,
                severity: "error",
              },
            ]);
          } catch (err) {
            setResponseSummary([
              {
                status,
                content: data.message,
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
                content: "successfully logged in",
                severity: "success",
              },
            ]);
          } catch (err) {
            setResponseSummary([
              {
                status,
                content: "successfully logged in",
                severity: "success",
              },
            ]);
          }
          Cookies.set("Token", data.token);
          Cookies.set("isAuth", isAuth);
          window.open("/dashboard", "_self");
        }
        setisLoggedIn(false);
      });
  };

  return (
    <div>
      {clientId ? (
        <FacebookLogin
          appId={clientId}
          textButton=""
          autoLoad={false}
          callback={responseFacebook}
          cssClass="face"
          icon={<FaceBookButton />}
        />
      ) : null}
    </div>
  );
}

export default LoginFacebook;
