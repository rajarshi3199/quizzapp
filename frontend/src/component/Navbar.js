import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import React ,{ useState, useEffect }from 'react';
import { useHistory } from "react-router-dom";
import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ username, setUsername }) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  const handleSignOut = () => {

    localStorage.removeItem('useremail');
    localStorage.removeItem('userrole');
    localStorage.removeItem('username');
    localStorage.removeItem('useruuid');
    setUsername(null);  
    history.push('/login');
  };

  //const username = localStorage.getItem('username');

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Button color="inherit" onClick={() => handleClick("/")}>Quizzzz</Button>
        </Typography>
        {username ? (
          <React.Fragment>
            <Typography variant="subtitle1" style={{ marginRight: '16px' }}>
              Welcome, {username}
            </Typography>
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </Button>
          </React.Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;