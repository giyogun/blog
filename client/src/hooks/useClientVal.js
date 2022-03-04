import { useReducer, useState } from "react";

const initialState = { value: "", inputFieldIsTouched: false };

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return {
      value: action.payload,
      inputFieldIsTouched: state.inputFieldIsTouched,
    };
  }
  if (action.type === "BLUR") {
    return { value: state.value, inputFieldIsTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", inputFieldIsTouched: false };
  }

  return state;
};

const useClientVal = (validateValue) => {
  const [inputState, dispatchFunc] = useReducer(inputReducer, initialState);
  // const [enteredValue, setEnteredValue] = useState("");
  // const [inputFieldIsTouched, setInputFieldIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.inputFieldIsTouched;

  const inputChangeHandler = (e) => {
    dispatchFunc({ type: "CHANGE", payload: e.target.value });
    // setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    dispatchFunc({ type: "BLUR" });

    // setInputFieldIsTouched(true);
  };

  const reset = () => {
    dispatchFunc({ type: "RESET" });
    // setEnteredValue("");
    // setInputFieldIsTouched(false);
  };

  return {
    value: inputState.value,
    hasError,
    inputBlurHandler,
    inputChangeHandler,
    validity: valueIsValid,
    reset,
  };
};

export default useClientVal;
