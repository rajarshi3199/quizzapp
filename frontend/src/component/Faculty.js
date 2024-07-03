import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Faculty = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [newQuiz, setNewQuiz] = useState('');
    let history = useHistory();
    
    const handleClick = (location) => {
        console.log(location);
        history.push(location);
    };

    // Fetch the quizzes created by the faculty
    useEffect(() => {
        fetch('/api/quiz/all/')
            .then(response => response.json())
            .then(data => setQuizzes(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Faculty Page</h1>

            <h2>Quizzes Created:</h2>
            {quizzes.length > 0 ? (
                <ul>
                    {quizzes.map(quiz => (
                        <li key={quiz.id}>{quiz.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No quizzes created yet.</p>
            )}

            <h2>Create New Quiz:</h2>
            <Button style={{
                    backgroundColor: 'blue',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '16px',
                }}
                className="create-quiz-button" onClick={() => handleClick("/createQuiz")}>
                CreateQuiz
              </Button>
        </div>
    );
};

export default Faculty;