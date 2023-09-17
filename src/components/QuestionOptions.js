function QuestionOptions({ question, dispatch, userAnswer }) {
    const hasAnswered = userAnswer !== null;

    return (
        <>
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
                        disabled={hasAnswered ? true : false}
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

            {hasAnswered && <button
                className="btn" onClick={() => dispatch({ type: "nextQuestion" })}
            >
                Next
            </button>}
        </>
    );
}

export default QuestionOptions;
