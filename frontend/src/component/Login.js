import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";

import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "300px",
  },
  submitButton: {
    width: "300px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the user with the provided email exists
      const userResponse = await axios.get(`${apiList.user}/${email}/`);
      const user = userResponse.data;

      // Verify the password
      const verifyResponse = await axios.get(`${apiList.verify}/${user.id}/${ password }/`);

      if (verifyResponse.data.success === "Password is valid") {

        localStorage.setItem('useremail', user.email);
        localStorage.setItem('useruuid', user.uuid);
        localStorage.setItem('username', user.name);
        localStorage.setItem('userrole', user.role);

        setUsername(user.name);

        // Password is valid, redirect based on the user's role
        if (user.role === "faculty") {
          history.push("/Faculty");
        } else if (user.role === "student") {
          history.push("/Student");
        }
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      setError(err.response.data.error || "An error occurred");
    }
  };

  return (
    <Paper elevation={3} className={classes.body}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h2">
            Login
          </Typography>
        </Grid>
        {error && (
          <Grid item>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classes.inputBox}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.inputBox}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submitButton}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;