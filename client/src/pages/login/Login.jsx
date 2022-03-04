import React, { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import PostsContext from "../../store/postsContext";
import classes from "./Login.module.css";

const Login = () => {
  const ctx = useContext(PostsContext);
  const {error, clear} = ctx
  const history = useHistory();
  const email = useRef();
  const password = useRef();

  useEffect(()=>{
    if (error) {
      email.current.focus();
      setTimeout(() => {
        clear();
      }, 5000);
    }
  },[clear, error])

  const loginHandler = (e) => {
    e.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    ctx.login(enteredEmail, enteredPassword);
  };
  
  return (
    <div className={classes.login}>
      <span className={classes.loginTitle}>Login</span>
      <form className={classes.loginForm} onSubmit={loginHandler}>
        <label>Email</label>
        <input
          className={classes.loginInput}
          type="email"
          placeholder="Enter your email..."
          ref={email}
        />
        <label>Password</label>
        <input className={classes.loginInput} type="password" ref={password} />
        <button className={classes.loginButton}>Login</button>
      </form>
      <button
        className={classes.regButton}
        onClick={() => history.push("/register")}
      >
        Register
      </button>
      {error && <p className={classes.errorText}>{error}</p>}
    </div>
  );
};

export default Login;
