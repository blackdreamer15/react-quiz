import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";

const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading"
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };

    case "dataFailed":
      return { ...state, status: "error" };
    // case :
    //   return;
    // case :
    //   return;

    default: throw new Error("The action is unknown");
  }
}

export default function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);



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
        {status === "ready" && <StartScreen />}
      </Main>
    </div>
  );
}