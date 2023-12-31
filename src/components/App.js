import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTIONS = 30;

const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  questionIndex: 0,
  userAnswer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        status: "ready",
        questions: action.payload
      };

    case "dataFailed":
      return {
        ...state,
        status: "error"
      };

    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTIONS
      };

    case "selectedAnswer":
      const currQuestion = state.questions[state.questionIndex];
      return {
        ...state,
        userAnswer: action.payload,
        points:
          action.payload === currQuestion.correctOption
            ? state.points + currQuestion.points
            : state.points
      };

    case "nextQuestion":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        userAnswer: null,
      };

    case "finished":
      return {
        ...state,
        status:
          state.questionIndex === state.questions.length - 1
            ? "finished"
            : state.status,
        highscore: state.points > state.highscore
          ? state.points
          : state.highscore
      };

    case "restart":
      return {
        ...state,
        status: "ready ",
        questionIndex: 0,
        userAnswer: null,
        points: 0,
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining > 0
          ? state.status
          : "finished"
      };

    default: throw new Error("The action is unknown");
  }
}

export default function App() {
  const [{ questions, status, questionIndex, userAnswer, points, highscore, secondsRemaining }, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => (prev + curr.points), 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  },
    []
  );


  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numOfQuestions={numOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              userAnswer={userAnswer}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              index={questionIndex}
              numOfQuestions={numOfQuestions}
            />
            <Question
              question={questions[questionIndex]}
              dispatch={dispatch}
              userAnswer={userAnswer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                userAnswer={userAnswer}
                index={questionIndex}
                numOfQuestions={numOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}