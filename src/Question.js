import QuestionOptions from "./components/QuestionOptions";

function Question({ question }) {
    return (
        <div>
            <h4>{question.question}</h4>

            <QuestionOptions question={question} />
        </div>
    );
}

export default Question;
