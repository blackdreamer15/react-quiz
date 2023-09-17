function FinishedScreen({ points, maxPossiblePoints }) {
    const result = (points / maxPossiblePoints) * 100;

    return (
        <div className="result">
            <p>You scored <strong>{points}</strong> out of {maxPossiblePoints} points ({Math.ceil(result)}%)</p>
        </div>
    );
}

export default FinishedScreen;
