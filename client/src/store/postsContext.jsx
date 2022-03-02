import React, { useReducer } from "react";
import data from "../components/assets/data";

// const BASE_URL = "http://localhost:5000/api";

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

  // if (action.type === "START") {
  //   return {
  //     blogPosts: action.payload,
  //     isLoggedIn: state.isLoggedIn,
  //   };
  // }

  return state;
};

export const PostsProvider = (props) => {
  const [postsState, postsDispatch] = useReducer(postsReducer, {
    blogPosts: data,
    isLoggedIn: false,
  });

  const loginHandler = () => {
    postsDispatch({ type: "LOGIN" });
    // console.log(dbPosts);
    // const x = new Date(allPosts[0].createdAt);
    // const now = new Date();
    // const curr = now.getTime();
    // const postDate = x.getTime();
    // const diff = curr - postDate;
    // // const inHours = diff * 0.0000002778;
    // const inHours = diff * 0.0000002778;
    // const inDays = inHours * 0.041667;
    // let displayedDate;
    // displayedDate = `${Math.floor(inHours)} ${
    //   inHours >= 2 ? "hours" : "hour"
    // } ago`;

    // if (inHours > 24) {
    //   displayedDate = `${Math.floor(inDays)} ${
    //     inDays >= 2 ? "days" : "day"
    //   } ago`;
    // }
    // console.log(`${x.getDay()-1}-${x.getMonth()+1}-${x.getFullYear()}`);
    // console.log(diff * 0.0000002778);
    // console.log(diff);
    // console.log(displayedDate);
    // console.log(allPosts);
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

  // const appStart = async () => {
  //   const response = await axios.get(`${BASE_URL}/posts`);
  //   // const response = await axios.get('/posts');
  //   // console.log(response.data);
  //   postsDispatch({ type: "START", payload: response.data });
  // };

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
