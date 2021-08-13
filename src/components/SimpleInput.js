import { useState } from 'react';
import ErrorMsg from './ErrorMsg';

const SimpleInput = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const inputNameIsInvalid = enteredNameTouched && !enteredNameIsValid;
  const formIsValid = enteredNameIsValid;

  function changeInputHandler(e) {
    setEnteredName(e.target.value);
  }

  function blurInputHandler(e) {
    setEnteredNameTouched(true);
  }

  function submitFormHandler(e) {
    e.preventDefault();
    setEnteredNameTouched(true);

    if (!enteredNameIsValid) {
      return;
    }

    console.log(enteredName);
    setEnteredName('');
    setEnteredNameTouched(false);
  }

  return (
    <form onSubmit={submitFormHandler}>
      <div className={`form-control ${inputNameIsInvalid && 'invalid'}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={blurInputHandler}
          onChange={changeInputHandler}
          value={enteredName}
        />
        {inputNameIsInvalid && <ErrorMsg>Name must not be empty.</ErrorMsg>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SimpleInput;
