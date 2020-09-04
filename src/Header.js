import React from 'react';
import './Header.css';
import CachedIcon from '@material-ui/icons/Cached';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
function Header() {
    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
    //const classes = useStyles();
    return (
    <nav className="header">
      <div className="header_brand">
      <CachedIcon/>
                <h1>CIRCLE</h1>

                              </div>
<div className="header_button"> 
<Avatar />
</div>
    </nav>
    );
}

export default Header;