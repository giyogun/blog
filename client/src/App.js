import { Fragment, useContext} from "react";
import { Redirect, Route, Switch } from "react-router";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import PostsContext from "./store/postsContext";

function App() {
  const ctx = useContext(PostsContext);

  return (
    <Fragment>
      <TopBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        {/* <Route path="/posts" exact>
          <Home />
        </Route> */}
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/settings">
          {ctx.isLoggedIn ? <Settings /> : <Redirect to="/login" />}
        </Route>
        <Route path="/posts/:postId">
          <Single />
        </Route>
        <Route path="/write">
          {ctx.isLoggedIn ? <Write /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
