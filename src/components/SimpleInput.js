import { useState } from 'react';
import ErrorMsg from './ErrorMsg';

const SimpleInput = props => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const inputNameIsInvalid = enteredNameTouched && !enteredNameIsValid;

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const emailRegex = /^[a-zA-Z0-9_\-\.]+@[a-z]+\.[a-zA-Z]{2,5}$/;
  const enteredEmailIsValid = emailRegex.test(enteredEmail);
  const inputEmailIsInvalid = enteredEmailTouched && !enteredEmailIsValid;

  const formIsValid = enteredNameIsValid && enteredEmailIsValid;

  function submitFormHandler(e) {
    e.preventDefault();
    setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!formIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    setEnteredName('');
    setEnteredEmail('');
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  }

  return (
    <form onSubmit={submitFormHandler}>
      <div className={`form-control ${inputNameIsInvalid && 'invalid'}`}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onBlur={e => {
            setEnteredNameTouched(true);
          }}
          onChange={e => {
            setEnteredName(e.target.value);
          }}
          value={enteredName}
        />
        {inputNameIsInvalid && <ErrorMsg>Name must not be empty.</ErrorMsg>}
      </div>

      <div className={`form-control ${inputEmailIsInvalid && 'invalid'}`}>
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          onBlur={e => {
            setEnteredEmailTouched(true);
          }}
          onChange={e => {
            setEnteredEmail(e.target.value);
          }}
          value={enteredEmail}
        />
        {inputEmailIsInvalid && <ErrorMsg>Email must be valid.</ErrorMsg>}
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
