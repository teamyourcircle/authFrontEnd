import React from 'react';
import './Header.css';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
function Header() {
  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);
    const useStyles = makeStyles((theme) => ({
        button: {
          margin: theme.spacing(1),
        },
      }));
    //const classes = useStyles();
    
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
    <nav className="header">
      <div className="header_brand">
      <img src="https://i.ibb.co/1Jx9SJV/White-and-Purple-Icon-Internet-Logo-2-removebg-preview.png" style={{height:'200px'}}/>
                <h1>CIRCLE</h1>

                              </div>
<div className="header_button"> 


<Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
    <Button variant="contained" >
    <Link to="/signout" activeClassName="active">Log Out</Link>
    </Button>
      </Popover>
      <Button onClick={handleClick}>
      <Avatar style={{marginRight:'10px'}}/>
      </Button>

</div>
    </nav>
    );
}

export default Header;