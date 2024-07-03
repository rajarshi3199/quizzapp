import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Typography, TextField, Button, Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setEmailError('');
    setPasswordError('');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return;
    }

    // Validate password
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        role,
      };
      const response = await axios.post("http://localhost:8000/api/user/create/", userData);
      console.log(response.data);
      history.push("/login");
      // Handle successful sign-up
    } catch (error) {
      console.error(error);
      // Handle sign-up error
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" align="center">
        Sign Up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="role"
              select
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              variant="outlined"
              fullWidth
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUp;