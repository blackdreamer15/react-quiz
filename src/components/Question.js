import QuestionOptions from "./QuestionOptions";

function Question({ question, dispatch, userAnswer }) {
    return (
        <div>
            <h4>{question.question}</h4>

            <QuestionOptions
                question={question}
                dispatch={dispatch}
                userAnswer={userAnswer}
            />
        </div>
    );
}

export default Question;
