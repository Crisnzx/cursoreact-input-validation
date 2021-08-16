import useMyInput from '../hooks/useMyInput';

function validateName(enteredName) {
  return enteredName.trim() !== '';
}

function validateEmail(enteredEmail) {
  const emailRegex = /^[a-zA-Z0-9_\-.]+@[a-z]+\.[a-zA-Z]{2,5}$/;
  return emailRegex.test(enteredEmail);
}

const BasicForm = props => {
  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    userTouchedHandler: firstNameTouchedHandler,
    reset: resetFirstName,
  } = useMyInput(validateName);

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    userTouchedHandler: lastNameTouchedHandler,
    reset: resetLastName,
  } = useMyInput(validateName);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    userTouchedHandler: emailTouchedHandler,
    reset: resetEmail,
  } = useMyInput(validateEmail);

  const formIsValid = firstNameIsValid && lastNameIsValid && emailIsValid;

  function submitFormHandler(e) {
    e.preventDefault();

    if (!formIsValid) {
      firstNameTouchedHandler();
      lastNameTouchedHandler();
      emailTouchedHandler();
      return;
    }

    console.log(enteredFirstName, enteredLastName, enteredEmail);

    resetFirstName();
    resetLastName();
    resetEmail();
  }

  return (
    <form onSubmit={submitFormHandler}>
      <div className="control-group">
        <div className={`form-control ${firstNameHasError && 'invalid'}`}>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            onChange={firstNameChangeHandler}
            onBlur={firstNameTouchedHandler}
            value={enteredFirstName}
          />
          {firstNameHasError && (
            <p className="error-text">First name must be valid.</p>
          )}
        </div>
        <div className={`form-control ${lastNameHasError && 'invalid'}`}>
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            onChange={lastNameChangeHandler}
            onBlur={lastNameTouchedHandler}
            value={enteredLastName}
          />
          {lastNameHasError && (
            <p className="error-text">Last name must be valid.</p>
          )}
        </div>
      </div>
      <div className={`form-control ${emailHasError && 'invalid'}`}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailTouchedHandler}
          value={enteredEmail}
        />
        {emailHasError && <p className="error-text">Email must be valid.</p>}
      </div>
      <div className="form-actions">
        {/* We can disable the submit button using the "disabled" attribute */}
        {/* <button disabled={!formIsValid}>Submit</button> */}
        <button>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
