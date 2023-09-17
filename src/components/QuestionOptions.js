function QuestionOptions({ question, dispatch, usserAnswer }) {
    return (
        <ul className="options">
            {question.options.map((option, index) => (
                <button
                    className="btn btn-option"
                    onClick={() => dispatch({ type: "selectedAnswer", payload: index })}
                    key={option}
                >
                    {option}
                </button>
            ))}
        </ul>
    );
}

export default QuestionOptions;
