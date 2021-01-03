import React from 'react';
import './Temporary.css';
function Temporary({api_key}) {
    return (
        <div className="App_token">
        <div className="key_api">
          <div className="key_header">
            <h1>Create New Api key</h1>
          </div>
          <hr />
          <div className="key_content">
            <span className="mid_high">New Api Created and </span>
            <span className="high">It will displayed only now</span>
                <p>{api_key}</p>
            <span className="warn">
              Please store it somewhrere safe because as soon as you navigate away
              from this <br /> page, we will not albe to restore or retrive this
              generated token.
            </span>
          </div>
        </div>
      </div>
    );
}

export default Temporary;