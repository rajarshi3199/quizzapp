import React,{useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import './Quiz.css'


const Quiz = (props) => {

  const [quizData, setQuizData] = useState(
    {
    "id": "f3e819d7-b3fb-43bc-9434-a988f73d4fa7",
    "questions": [
        {
            "id": "68e3e47b-ea54-48ce-ae00-652710b33dda",
            "question": "Which function is used to serialize an object into a JSON string in Javascript?",
            "type": "MCQs",
            "choices": [
                "stringify()",
                "parse()",
                "convert()",
                "None of the above"
            ],
            "correctAnswer": "stringify()",
            "quiz": "f3e819d7-b3fb-43bc-9434-a988f73d4fa7"
        }
    ],
    "topic": "Javascript",
    "level": "Beginner",
    "total_questions":1,
    "per_question_score": 5
}
);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const location = useLocation();
  const quizToken = location.state.quizToken || localStorage.getItem('usertoken');
  
  // works but quizData stays null
  // code also goes in infinite loop 

  // axios.get(`http://localhost:8000/api/quiz/${quizToken}/`)
  //       .then((res) => {
  //         const data = res.data;
  //         setQuizData(data);
  //       })

  // this code does not work ?? after some time have to define a quiz data in setQuizData 

  useEffect(() => {
    console.log("Fetching quiz data..."); // why is this not logging fuck useEffect
    const fetchQuizData = async () => {
      try {
        // const quizToken = localStorage.getItem('usertoken');
        const response = await axios.get(`http://localhost:8000/api/quiz/${quizToken}/`);
        console.log("Quiz data response:", response.data);
        setQuizData(response.data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };
  
    fetchQuizData()
  }, []);

  const { questions } = quizData;
  const { question, choices } = questions[activeQuestion] || {};

    const onClickNext = () => {
      setSelectedAnswerIndex(null)
      setResult((prev) =>
        selectedAnswer
          ? {
              ...prev,
              score: prev.score + 5,
              correctAnswers: prev.correctAnswers + 1,
            }
          : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
      )
      if (activeQuestion !== questions.length - 1) {
        setActiveQuestion((prev) => prev + 1)
      } else {
        setActiveQuestion(0)
        setShowResult(true)
      }
  }

  const onAnswerSelected = (answer, index) => {
      setSelectedAnswerIndex(index)
      console.log("Selected answer:", answer);
      console.log("question", questions[activeQuestion]);
      if (answer === questions[activeQuestion].correctAnswer) {
        setSelectedAnswer(true)
      } else {
        setSelectedAnswer(false)
      }
  }
    
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
  

  // Check if quizData exists and has questions
  // questions = quizData?.questions || [];

  // Check if activeQuestion is within the range of questions
  // const activeQuestionData =
  //   activeQuestion < questions.length ? questions[activeQuestion] : null;

  // Destructure question, choices, and correctAnswer from activeQuestionData

  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">
              {addLeadingZero(activeQuestion + 1)}
            </span>
            <span className="total-question">
              /{addLeadingZero(questions.length)}
            </span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={
                  selectedAnswerIndex === index ? 'selected-answer' : null
                }
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button
              onClick={onClickNext}
              disabled={selectedAnswerIndex === null}
            >
              {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Question: <span>{questions.length}</span>
          </p>
          <p>
            Total Score:<span> {result.score}</span>
          </p>
          <p>
            Correct Answers:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Wrong Answers:<span> {result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  )
};

export default Quiz