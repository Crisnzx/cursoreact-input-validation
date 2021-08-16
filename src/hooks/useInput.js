import { useState } from 'react';

export default function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = isTouched && !valueIsValid;

  function valueChangeHandler(e) {
    setEnteredValue(e.target.value);
  }

  function inputBlurHandler() {
    setIsTouched(true);
  }

  function reset() {
    setIsTouched(false);
    setEnteredValue('');
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}
