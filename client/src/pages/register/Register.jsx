import React from "react";
import classes from "./Register.module.css";
import { GrClose } from "react-icons/gr";
import { useHistory } from "react-router";
import useClientVal from "../../hooks/useClientVal";

const Register = () => {
  const history = useHistory();
  const validityArg = (value) => value.trim() !== "";

  const emailCheck = /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;

  const {
    value: username,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    validity: nameValueIsValid,
    reset: resetnameStates,
  } = useClientVal(validityArg);

  const {
    value: email,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    inputChangeHandler: emailChangeHandler,
    validity: emailValueIsValid,
    reset: resetEmailStates,
  } = useClientVal((value) => value.trim() !== "" && emailCheck.test(value));

  let emailError = <p>Email cannot be empty!</p>;

  if (email.trim() !== "") {
    if (!emailCheck.test(email)) {
      emailError = <p>Please enter a valid email</p>;
    }
  }

  let formIsValid = false;
  if (nameValueIsValid && emailValueIsValid) {
    formIsValid = true;
  }
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!formIsValid) return;
  };

  const emailClasses = !emailHasError
    ? classes.regInput
    : `${classes.regInput} ${classes.invalid}`;

  return (
    <div className={classes.reg}>
      <span className={classes.regTitle}>Create Account</span>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.regForm}>
          <div className={classes.regInput}>
            <label>Username</label>
            <input
              // className={classes.regInput}
              type="text"
              placeholder="Enter your username..."
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={username}
              // required
            />
            {nameHasError && <p>Please enter a username!</p>}
          </div>
          <div className={emailClasses}>
            <label>Email</label>
            <input
              // className={emailClasses}
              type="email"
              placeholder="Enter your email..."
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={email}
              // required
            />
            {emailHasError && emailError}
          </div>
          <div className={classes.regInput}>
            <label>Password</label>
            <input className={classes.regInput} type="password" required />
          </div>
          <button className={classes.regButton}>Continue</button>
        </div>
      </form>
      <p className={classes.regSignIn}>
        Already have an account?{" "}
        <button
          className={classes.signInBtn}
          onClick={() => history.push("/login")}
        >
          Sign in
        </button>
      </p>
      <GrClose
        className={classes.closeBtn}
        onClick={() => history.push("/login")}
      />
      {/* <button className={classes.regButton}>Register</button> */}
    </div>
  );
};

export default Register;
