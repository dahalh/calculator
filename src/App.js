import "./App.css"
import { useState, useEffect } from "react";
import NumberFormat from "react-number-format";



const App = () => {

  const [preState, setPreState] = useState("");
  const [curState, setCurState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  // 
  const inputNum = e => {
    // making unable to press . more than once
    if (curState.includes(".") && e.target.innerText === ".") return

    if(total) {
      // Not continuing calculations after equals button is pressed
      setPreState("")
    }

    // Allowing more than one digit to be pressed i.e. double digits, triple digits etc.
    curState ? setCurState((pre) => pre + e.target.innerText) : setCurState(e.target.innerText);
    setTotal(false);
  };

  // everytime the current state changes, set input to current state
  useEffect(() => {
    setInput(curState)
  }, [curState])

  // setting input to 0 when app loads
  useEffect(() => {
    setInput("0");
  }, [])

  // If there is a previous number, calculate by calling the equals function and set the previous state to the current answer
  // If there are no numbers, return empty value
  const operatorType = e => {
    setTotal(false);
    setOperator(e.target.innerText);
    if( curState === "") return
    if(preState !== "") {
      equals();
    } else {
    setPreState(curState);
    setCurState("");
    }
  };

  // performing calculation when equals button is pressed
  const equals = e => {
    if(e?.target.innerText === "="){
    setTotal(true);
  }

  //calculation logic
  let cal 
  switch (operator) {
    case "/":
      cal = String(parseFloat(preState) / parseFloat(curState));
      break;
    case "+":
      cal = String(parseFloat(preState) + parseFloat(curState));
      break;
    case "X":
      cal = String(parseFloat(preState) * parseFloat(curState));
      break;
    case "-":
      cal = String(parseFloat(preState) - parseFloat(curState));
      break;
    default:
      return;
  }
  // set input to empty string, previous state to calculation that was just performed, set current state to empty for next calc
  setInput("");
  setPreState(cal);
  setCurState("");
  };

  // if the first character is negative, set the current state to substring after first character
  // else concat a negative sign to the current state
  const minusPlus = () => {
    if (curState.charAt(0) == "-"){
      setCurState(curState.substring(1));
    } else {
      setCurState("-" + curState);
    }
  };

  // Percentage calculation
  const percent = () => {
    preState ? setCurState(String(parseFloat(curState) / 100 * preState)) :
    setCurState(String(parseFloat(curState) / 100));
  };

  // Resetting to 0 when button is pressed
  const reset = () => {
    setPreState("");
    setCurState("");
    setInput('0');
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">{input !== "" || input === "0" ? (<NumberFormat value={input} displayType={"text"} thousandSeparator={true}/>
        ) : (<NumberFormat value={preState} displayType={"text"} thousandSeparator={true}/>)}</div>
        <div className="btn light-gray" onClick={reset}>AC</div>
        <div className="btn light-gray" onClick={percent}>%</div>
        <div className="btn light-gray" onClick={minusPlus}>+/-</div>
        <div className="btn orange" onClick={operatorType}>/</div>
        <div className="btn" onClick={inputNum}>7</div>
        <div className="btn" onClick={inputNum}>8</div>
        <div className="btn" onClick={inputNum}>9</div>
        <div className="btn orange" onClick={operatorType}>X</div>
        <div className="btn" onClick={inputNum}>4</div>
        <div className="btn" onClick={inputNum}>5</div>
        <div className="btn" onClick={inputNum}>6</div>
        <div className="btn orange" onClick={operatorType}>+</div>
        <div className="btn" onClick={inputNum}>1</div>
        <div className="btn" onClick={inputNum}>2</div>
        <div className="btn" onClick={inputNum}>3</div>
        <div className="btn orange" onClick={operatorType}>-</div>
        <div className="btn  zero" onClick={inputNum}>0</div>
        <div className="btn" onClick={inputNum}>.</div>
        <div className="btn" onClick={equals}>=</div>
      </div>
    </div>
  )
};

export default App;
