import { useState } from 'react';

export default function useMyInput(validateInput) {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateInput(enteredValue);
  const hasError = isTouched && !valueIsValid;

  function valueChangeHandler(e) {
    // console.log(e.nativeEvent.inputType === 'deleteContentBackward');
    setIsTouched(false);
    setEnteredValue(e.target.value);
  }

  function userTouchedHandler() {
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
    userTouchedHandler,
    reset,
  };
}
