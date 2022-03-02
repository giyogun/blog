import React from "react";
import classes from "./Register.module.css";
import { GrClose } from "react-icons/gr";
import { useHistory } from "react-router";

const Register = () => {
  const history = useHistory();
  return (
    <div className={classes.reg}>
      <span className={classes.regTitle}>Create Account</span>
      <form className={classes.regForm}>
        <label>Username</label>
        <input
          className={classes.regInput}
          type="text"
          placeholder="Enter your username..."
        />
        <label>Email</label>
        <input
          className={classes.regInput}
          type="email"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input className={classes.regInput} type="password" />
        <button className={classes.regButton}>Continue</button>
      </form>
      <p className={classes.regSignIn}>
        Already have an account?{" "}
        <button className={classes.signInBtn} onClick={() => history.push("/login")}>Sign in</button>
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
