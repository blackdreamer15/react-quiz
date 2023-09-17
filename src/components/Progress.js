function Progress({ index, numOfQuestions, points, maxPossiblePoints, userAnswer }) {
    return (
        <section className="progress">
            <progress value={index + Number(userAnswer !== null)} min={0} max={numOfQuestions}></progress>
            <p>Question <strong>{index + 1}</strong> / {numOfQuestions}</p>
            <p><strong>{points}</strong> / {maxPossiblePoints} points</p>
        </section>
    );
}

export default Progress;
