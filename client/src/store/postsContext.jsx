import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import useApiCall from "../useApiCall";

const PostsContext = React.createContext({
  blogPosts: [],
  searchedPosts: [],
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  filterPosts: () => {},
  search: () => {},
  resetPosts: () => {},
});

// const postsReducer = (state, action) => {
//   if (action.type === "FILTER") {
//     const filteredPosts = data.filter((m) =>
//       m.category.includes(action.payload)
//     );

//     return {
//       blogPosts: filteredPosts,
//       isLoggedIn: state.isLoggedIn,
//     };
//   }

//   if (action.type === "LOGIN") {
//     return {
//       blogPosts: state.blogPosts,
//       isLoggedIn: true,
//     };
//   }
//   if (action.type === "LOGOUT") {
//     return {
//       blogPosts: state.blogPosts,
//       isLoggedIn: false,
//     };
//   }

//   if (action.type === "RESET") {
//     return {
//       blogPosts: data,
//       isLoggedIn: state.isLoggedIn,
//     };
//   }

//   // if (action.type === "START") {
//   //   return {
//   //     blogPosts: action.payload,
//   //     isLoggedIn: state.isLoggedIn,
//   //   };
//   // }

//   return state;
// };

const BASE_URL = "http://localhost:5000/api/posts";

const capitalize = (text) => {
  const result = text.charAt(0).toUpperCase() + text.slice(1);

  return result;
};

export const PostsProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const getAllPosts = useCallback((data) => {
    setPosts(data);
  }, []);

  const filterAllPosts = useCallback((data, cat) => {
    const filteredPosts = data.filter((m) => m.categories.includes(cat));

    setPosts(filteredPosts);
  }, []);

  const searchPosts = useCallback((data, cat, title) => {
    const posts = data.filter((m) => m.title.includes(capitalize(title)));

    setPosts1(posts);
  }, []);

  const loginApi = useCallback(
    (data) => {
      console.log(data);
      setIsLoggedIn(!!data);
      history.push("/write");
      // if(data){
      //   setIsLoggedIn(true);
      // }
    },
    [history]
  );

  const { queryPosts } = useApiCall(getAllPosts);
  const { queryPosts: postSearch } = useApiCall(searchPosts);
  const { queryPosts: filterPosts } = useApiCall(filterAllPosts);
  const { queryPosts: userLogin } = useApiCall(loginApi);

  useEffect(() => {
    queryPosts(BASE_URL);
  }, [queryPosts]);

  // const [postsState, postsDispatch] = useReducer(postsReducer, {
  //   blogPosts: data,
  //   isLoggedIn: false,
  // });

  const loginHandler = (em, pass) => {
    userLogin("http://localhost:5000/api/auth/login", null, null, {
      method: "POST",
      body: { email: em, password: pass },
    });
  };

  const logoutHandler = () => {
    // postsDispatch({ type: "LOGOUT" });
    setIsLoggedIn(false);
  };

  const filterPostsHandler = (category) => {
    // postsDispatch({ type: "FILTER", payload: category });
    filterPosts(BASE_URL, category);
  };

  const searchPostsHandler = (enteredText) => {
    // postsDispatch({ type: "FILTER", payload: category });
    postSearch(BASE_URL, null, enteredText);
  };

  const resetPostsHandler = () => {
    // postsDispatch({ type: "RESET" });
    queryPosts(BASE_URL);
    setPosts1([]);
  };

  const contextData = {
    blogPosts: posts,
    searchedPosts: posts1,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    filterPosts: filterPostsHandler,
    search: searchPostsHandler,
    resetPosts: resetPostsHandler,
  };
  return (
    <PostsContext.Provider value={contextData}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
