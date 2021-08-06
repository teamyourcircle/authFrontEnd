import React from "react";
import "./Navbar.css";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { alpha, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Hidden from "@material-ui/core/Hidden";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { AuthContext } from "./AuthContext";
const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: "44px",
    height: "44px",
  },
  button: {
    width: "41px",
    height: "16px",
    textTransform: "none",
    height: "26px",
    fontSize: "11px",
    width: "78px",
    color: "#FFFFFF",
  },
}));
function SimplePopover({ handleClick, handleClose, anchorEl, email }) {
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    window.open("/signout", "_self");
  };

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div
          className="box-container"
          style={{
            width: "233px",
            height: "91px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Avatar className={classes.purple}>OP</Avatar>
          <div
            className="box-content"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "end",
              height: "49px",
              justifyContent: "space-evenly",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: "bold" }}>
              {email}
            </span>
            <Button
              aria-describedby={id}
              variant="contained"
              className={classes.button}
              style={{ backgroundColor: "#28284E" }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
}

function Navbar(props) {
  const useStyles = makeStyles((theme) => ({
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
        color: "white",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "35ch",
      },
    },
  }));
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [user, setUser] = React.useState();
  const { REACT_APP_AUTH_SERVICE_BASE_URL } = process.env;
  const [is_Auth, setAuth, token, setToken] = React.useContext(AuthContext);
  React.useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "access-token": token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch(REACT_APP_AUTH_SERVICE_BASE_URL + "/auth/api/dashboard", options)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="navbar_left">
        <svg
          width="58"
          height="55"
          viewBox="0 0 58 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.6115 17.291L40.4503 17.5541C41.5723 17.5713 42.6856 17.7547 43.754 18.098C47.198 19.2099 54.1071 22.4103 56.365 30.6057C57.2581 33.9305 57.2082 37.4381 56.2213 40.7361C55.1546 44.3787 52.95 48.5506 48.9846 51.5799C47.1336 52.9837 44.9581 53.8975 42.6597 54.2364C39.7434 54.6754 35.2358 54.8336 30.8783 52.8904C30.8783 52.8904 36.0621 48.6765 39.0236 42.4679L43.6442 33.6882C44.3067 32.4591 44.4914 31.0282 44.1623 29.6712C43.8713 28.5039 43.1709 27.4799 42.1885 26.7856C41.1974 26.0848 40.0133 25.7086 38.7993 25.7091L24.5082 25.5623C23.9006 25.5592 23.3052 25.3917 22.785 25.0774C22.2651 24.7632 21.8399 24.3139 21.5548 23.7773C21.4307 23.5421 21.3275 23.2963 21.2465 23.043C21.0077 22.3501 20.9391 21.61 21.0462 20.885C21.1536 20.16 21.4337 19.4714 21.863 18.8775C22.1886 18.4395 22.6004 18.0726 23.0731 17.7999C23.5458 17.527 24.0694 17.3538 24.6115 17.291Z"
            fill="white"
            stroke="white"
            stroke-width="0.32278"
            stroke-miterlimit="10"
          />
          <path
            d="M19.9765 40.7441L12.2862 26.9001C11.7406 25.9193 11.343 24.863 11.1065 23.7659C10.3463 20.2282 9.66366 12.6429 15.6254 6.59078C18.0583 4.1538 21.122 2.4426 24.4728 1.64901C28.1654 0.751683 32.8812 0.574155 37.4873 2.4947C39.6284 3.39606 41.5075 4.82325 42.9503 6.64403C44.7886 8.94868 47.1755 12.7769 47.6742 17.5169C47.6742 17.5169 41.4317 15.1364 34.5742 15.6754L24.66 16.0676C23.2638 16.1083 21.9322 16.6649 20.9222 17.6299C20.0564 18.465 19.5197 19.5838 19.41 20.7818C19.2985 21.9892 19.564 23.2015 20.1701 24.2517L27.1874 36.7013C27.4892 37.2289 27.6423 37.8283 27.6304 38.4359C27.6184 39.0436 27.4419 39.6365 27.1196 40.1518C26.9761 40.3763 26.8141 40.5885 26.6354 40.7861C26.1545 41.3392 25.5475 41.7685 24.8658 42.0378C24.1841 42.3072 23.4476 42.4087 22.7185 42.3338C22.1772 42.2697 21.6548 42.0956 21.1833 41.8222C20.7118 41.5488 20.301 41.182 19.9765 40.7441Z"
            fill="white"
            stroke="white"
            stroke-width="0.48417"
            stroke-miterlimit="10"
          />
          <path
            d="M42.9827 33.0909L34.8373 46.6735C34.26 47.6338 33.5443 48.504 32.7134 49.2558C30.0279 51.6766 23.8015 56.0664 15.5755 53.9232C12.2533 53.0346 9.24333 51.2404 6.88137 48.7409C4.2604 45.9973 1.74917 41.9997 1.10845 37.0498C0.817595 34.7454 1.11405 32.4049 1.97028 30.2456C3.04675 27.502 5.16257 23.5221 9.02463 20.7236C9.02463 20.7236 10.0834 27.3196 13.9793 32.9893L19.2729 41.3815C20.0088 42.5692 21.1587 43.4422 22.5007 43.8315C23.657 44.1629 24.8941 44.0684 25.9867 43.5652C27.0874 43.0571 28.0041 42.2211 28.6109 41.1717L35.8831 28.869C36.1888 28.3461 36.6299 27.9152 37.1599 27.6221C37.6899 27.329 38.2893 27.1844 38.8947 27.2034C39.7589 27.2393 40.5967 27.5109 41.3176 27.9888C42.0386 28.4666 42.6149 29.1327 42.9843 29.9148C43.2006 30.4164 43.3121 30.9569 43.3118 31.503C43.3114 32.0492 43.1994 32.5897 42.9827 33.0909Z"
            fill="white"
            stroke="white"
            stroke-width="0.48417"
            stroke-miterlimit="10"
          />
        </svg>
        <h1>Swing</h1>
      </div>
      <Hidden only={["xs", "sm"]}>
        <div className="navbar-search">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search for Forms and Services etc…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </div>
      </Hidden>
      <div className="navbar-right">
        <Hidden only={["md", "lg", "xl"]}>
          <IconButton
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <SearchIcon fontSize="large" />
          </IconButton>
        </Hidden>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          {user && user.email ? (
            <>
              <AccountCircle fontSize="large" onClick={handleClick} />
              <SimplePopover
                handleClick={handleClick}
                handleClose={handleClose}
                anchorEl={anchorEl}
                email={user.email}
              />
            </>
          ) : null}
        </IconButton>
        <IconButton
          aria-label="display more actions"
          edge="end"
          color="inherit"
        >
          <HelpOutlineIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}
Navbar.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default Navbar;

// export default Header;
