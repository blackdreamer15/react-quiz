function Progress({ index, numOfQuestions }) {
    return (
        <section className="progress">
            <progress value={0} min={0} max={numOfQuestions}></progress>
            <p>Question <strong>{index}</strong> / {numOfQuestions}</p>
            <p><strong>X</strong> / X points</p>
        </section>
    );
}

export default Progress;
