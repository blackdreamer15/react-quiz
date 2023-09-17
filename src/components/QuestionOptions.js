function QuestionOptions({ question, dispatch, usserAnswer }) {
    return (
        <ul className="options">
            {question.options.map((option) => (
                <button
                    className="btn btn-option"
                    key={option}
                >
                    {option}
                </button>
            ))}
        </ul>
    );
}

export default QuestionOptions;
