import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";

const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  questionIndex: 0,
  userAnswer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startQuiz":
      return { ...state, status: "active" };
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
      return { ...state, questionIndex: state.questionIndex + 1, userAnswer: null };

    default: throw new Error("The action is unknown");
  }
}

export default function App() {
  const [{ questions, status, questionIndex, userAnswer, points }, dispatch] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;

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
            <Progress index={questionIndex + 1} numOfQuestions={numOfQuestions} />
            <Question
              question={questions[questionIndex]}
              dispatch={dispatch}
              userAnswer={userAnswer}
            />
            <NextButton dispatch={dispatch} userAnswer={userAnswer} />
          </>
        )}
      </Main>
    </div>
  );
}