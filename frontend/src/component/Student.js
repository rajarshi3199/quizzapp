import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, TextField, Button, makeStyles  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
    },
  }));

const Student = () => {
    const [quizToken, setQuizToken] = useState('');
    let history = useHistory();
    const classes = useStyles();
    
    

    const handleQuizTokenChange = (e) => {
        const token = e.target.value;
        setQuizToken(token);
        localStorage.setItem('quizToken', token); // Update local storage
    };

    // Fetch the list of quizzes taken by the student
    useEffect(() => {
        // Your API call to fetch the list of quizzes taken by the student
        // Update the `quizTaken` state with the response data
    }, []);

    // Function to handle quiz submission using a token
    const handleQuizSubmission = () => {
        history.push({
          pathname: '/takeQuiz',
          state: { quizToken: quizToken }, // Pass data as state
      });
    };


    return (
        <Grid container className={classes.inputContainer}>
          <TextField
                type="text"
                value={quizToken}
                onChange={handleQuizTokenChange}
                placeholder="Enter quiz token"
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleQuizSubmission}
                style={{ marginLeft: 10 }}
            >
                Submit
            </Button>
        </Grid>
      );
    };

export default Student;