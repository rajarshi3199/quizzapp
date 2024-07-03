import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, useHistory,useLocation} from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";
import React from 'react';
import Welcomehome from "./component/Welcomehome/Welcomehome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import CreateQuiz from "./component/CreateQuiz";
import Student from "./component/Student";
import Faculty from "./component/Faculty";
import Quiz from "./component/Quiz";
import MessagePopup from "./lib/MessagePopup";``

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);
  
  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar  username={username} setUsername={setUsername}/>
          </Grid>
          <Grid item className={classes.body}>
            <Switch>
              <Route exact path="/">
                <Welcomehome />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <Route exact path="/createQuiz">
                <CreateQuiz />
              </Route>
              <Route exact path="/takeQuiz">
                <Quiz />
              </Route>
              <Route exact path="/student">
                <Student />
              </Route>
              <Route exact path="/faculty">
                <Faculty />
              </Route>
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;
