function QuestionOptions({ question, dispatch, userAnswer }) {
    const hasAnswered = userAnswer !== null;

    return (
        <ul className="options">
            {question.options.map((option, index) => (
                <button
                    className={`btn btn-option ${userAnswer === index ? "answer" : ""} 
                    ${hasAnswered
                            ? index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                        }`
                    }

                    onClick={() => dispatch({
                        type: "selectedAnswer",
                        payload: index
                    })}
                    key={option}
                >
                    {option}
                </button>
            ))
            }
        </ul >
    );
}

export default QuestionOptions;
