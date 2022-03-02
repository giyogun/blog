import React, { useContext } from "react";
import { useHistory } from "react-router";
import PostsContext from "../../store/postsContext";
import classes from "./Login.module.css";

const Login = () => {
  const ctx = useContext(PostsContext);
  const history = useHistory();
  const loginHandler = () => {
    // props.onLogin();
    ctx.login();
    history.push("/write");
  };
  return (
    <div className={classes.login}>
      <span className={classes.loginTitle}>Login</span>
      <form className={classes.loginForm}>
        <label>Email</label>
        <input
          className={classes.loginInput}
          type="email"
          placeholder="Enter your email..."
        />
        <label>Password</label>
        <input className={classes.loginInput} type="password" />
        <button className={classes.loginButton} onClick={loginHandler}>
          Login
        </button>
      </form>
      <button
        className={classes.regButton}
        onClick={() => history.push("/register")}
      >
        Register
      </button>
    </div>
  );
};

export default Login;
