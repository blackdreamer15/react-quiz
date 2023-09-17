import { useReducer } from "react";


function reducer(state, action) {
    // if (action.type === "increment") return state + 1;
    // if (action.type === "decrement") return state - 1;
    // if (action.type === "defineCount") return state + action.payload;
    switch (action.type) {
        case "increment":
            return { ...state, count: state.count + state.step };
        case "decrement":
            return { ...state, count: state.count - state.step };
        case "defineCount":
            return { ...state, count: action.payload };
        case "defineStep":
            return { ...state, step: action.payload };
        case "reset":
            return { ...state, ...action.payload };
        default:
            throw new Error("Unknown action");
    }
}


function DateCounter() {
    // const [count, setCount] = useState(0);
    // const [step, setStep] = useState(1);
    const initialState = { count: 0, step: 1 };
    const [state, dispatch] = useReducer(reducer, initialState);

    const { count, step } = state;


    // This mutates the date object.
    const date = new Date("june 21 2027");
    date.setDate(date.getDate() + count);

    const decrement = function () {
        // setCount((count) => count - step);
        dispatch({ type: "decrement" });
    };

    const increment = function () {
        // setCount((count) => count + step);
        dispatch({ type: "increment" });
    };

    const defineCount = function (e) {
        // setCount(Number(e.target.value));
        dispatch({ type: "defineCount", payload: Number(e.target.value) });
    };

    const defineStep = function (e) {
        // setStep(Number(e.target.value));
        dispatch({ type: "defineStep", payload: Number(e.target.value) });
    };

    const reset = function () {
        // setCount(0);
        // setStep(1);
        dispatch({ type: "reset", payload: initialState })
    };

    return (
        <div className="counter">
            <div>
                <input
                    type="range"
                    min="0"
                    max="10"
                    value={step}
                    onChange={defineStep}
                />
                <span>{step}</span>
            </div>

            <div>
                <button onClick={decrement}>-</button>
                <input value={count} onChange={defineCount} />
                <button onClick={increment}>+</button>
            </div>

            <p>{date.toDateString()}</p>

            <div>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
export default DateCounter;
