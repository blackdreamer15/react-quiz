function Question({ question }) {
    return (
        <div>
            <h4>{question.question}</h4>
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
        </div>
    );
}

export default Question;
