import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import PostsContext from "../../store/postsContext";
import classes from "./Login.module.css";

const Login = () => {
  // const [lsValue, setLsValue] = useState({});
  const ctx = useContext(PostsContext);
  const { error, clear } = ctx;
  // const { isLoggedIn } = ctx;
  const history = useHistory();
  const username = useRef();
  const password = useRef();

  useEffect(() => {
    if (error) {
      username.current.focus();
      setTimeout(() => {
        clear();
      }, 5000);
    }
  }, [clear, error]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     localStorage.setItem("user", lsValue)
  //   }
  // }, [isLoggedIn, lsValue]);

  const loginHandler = (e) => {
    e.preventDefault();
    const enteredUsername = username.current.value;
    const enteredPassword = password.current.value;

    ctx.login(enteredUsername, enteredPassword);
    // setLsValue(enteredUsername);
  };

  return (
    <div className={classes.login}>
      <span className={classes.loginTitle}>Login</span>
      <form className={classes.loginForm} onSubmit={loginHandler}>
        <label>Username</label>
        <input
          className={classes.loginInput}
          type="text"
          placeholder="Enter your username..."
          ref={username}
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
