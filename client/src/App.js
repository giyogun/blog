import { Fragment, useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import EditorContainer from "./components/draftjs/EditorContainer";
import TopBar from "./components/topbar/TopBar";
import PostsContext from "./context/postsContext";
import Home from "./pages/home/Home";
import Navbar from "./pages/home/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import NewMeetupForm from "./pages/write/NewMeetupForm";
import Write from "./pages/write/Write";

function App() {
  const ctx = useContext(PostsContext);
  return (
    // <NewMeetupForm />
    // <Write />
    // <EditorContainer />
    <Fragment>
      {/* <TopBar /> */}
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register">
          {ctx.isLoggedIn ? <Redirect to="/settings" /> : <Register />}
        </Route>
        <Route path="/login">
          {!ctx.isLoggedIn ? <Login /> : <Redirect to="/write" />}
        </Route>
        <Route path="/settings">
          {ctx.isLoggedIn ? <Settings /> : <Redirect to="/login" />}
        </Route>
        <Route path="/posts/:postId">
          <Single />
        </Route>
        <Route path="/write">
          {ctx.isLoggedIn ? <NewMeetupForm /> : <Redirect to="/login" />}
        </Route>
        {/* <Route path="/write">
          {ctx.isLoggedIn ? <Write /> : <Redirect to="/login" />}
        </Route> */}
      </Switch>
      {/* <EditorContainer /> */}
      {/* <Navbar /> */}
    </Fragment>
  );
}

export default App;
