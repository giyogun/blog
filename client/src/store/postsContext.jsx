import React, { useReducer } from "react";
import data from "../components/assets/data";

const PostsContext = React.createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  filterPosts: () => {},
  resetPosts: () => {},
});


const postsReducer = (state, action) => {
  if (action.type === "FILTER") {
    const filteredPosts = data.filter((m) =>
      m.category.includes(action.payload)
    );

    return {
      blogPosts: filteredPosts,
      isLoggedIn: state.isLoggedIn,
    };
  }

  if (action.type === "LOGIN") {
    return {
      blogPosts: state.blogPosts,
      isLoggedIn: true,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      blogPosts: state.blogPosts,
      isLoggedIn: false,
    };
  }

  if (action.type === "RESET") {
    return {
      blogPosts: data,
      isLoggedIn: state.isLoggedIn,
    };
  }

  return state;
};

export const PostsProvider = (props) => {
  const [postsState, postsDispatch] = useReducer(postsReducer, {
    blogPosts: data,
    isLoggedIn: false,
  });

  const loginHandler = () => {
    postsDispatch({ type: "LOGIN" });
  };

  const logoutHandler = () => {
    postsDispatch({ type: "LOGOUT" });
  };

  const filterPostsHandler = (category) => {
    postsDispatch({ type: "FILTER", payload: category });
  };


  const resetPostsHandler = () => {
    postsDispatch({ type: "RESET" });
  };

  const contextData = {
    blogPosts: postsState.blogPosts,
    isLoggedIn: postsState.isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    filterPosts: filterPostsHandler,
    resetPosts: resetPostsHandler,
  };
  return (
    <PostsContext.Provider value={contextData}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
