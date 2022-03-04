import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import useApiCall from "../hooks/useApiCall";

const PostsContext = React.createContext({
  blogPosts: [],
  searchedPosts: [],
  isLoggedIn: false,
  post: {},
  login: () => {},
  logout: () => {},
  filterPosts: () => {},
  search: () => {},
  resetPosts: () => {},
  getPost: (id) => {},
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

const BASE_URL = "http://localhost:5000/api";

const capitalize = (text) => {
  const result = text.charAt(0).toUpperCase() + text.slice(1);

  return result;
};

export const PostsProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [singlePost, setSinglePost] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const getAllPosts = useCallback((data, a, b) => {
    setPosts(data);
  }, []);

  const getOnePost = useCallback((data, a, b, id) => {
    const single = data.find((item) => item._id === id);

    setSinglePost(single);
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
    },
    [history]
  );

  const { queryPosts } = useApiCall(getAllPosts);
  const { queryPosts: singlePostQuery } = useApiCall(getOnePost);
  const { queryPosts: postsSearch } = useApiCall(searchPosts);
  const { queryPosts: filterPosts } = useApiCall(filterAllPosts);
  const { queryPosts: userLogin } = useApiCall(loginApi);

  useEffect(() => {
    queryPosts({ method: "GET", url: `${BASE_URL}/posts` });
  }, [queryPosts]);

  const getPostHandler = (id) => {
    singlePostQuery({ method: "GET", url: `${BASE_URL}/posts` }, null, null, id);
  };

  // const [postsState, postsDispatch] = useReducer(postsReducer, {
  //   blogPosts: data,
  //   isLoggedIn: false,
  // });

  const loginHandler = (em, pass) => {
    userLogin({
      method: "POST",
      body: { email: em, password: pass },
      url: `${BASE_URL}/auth/login`,
    });
  };

  const logoutHandler = () => {
    // postsDispatch({ type: "LOGOUT" });
    setIsLoggedIn(false);
  };

  const filterPostsHandler = (category) => {
    // postsDispatch({ type: "FILTER", payload: category });
    filterPosts({ method: "GET", url: `${BASE_URL}/posts` }, category);
  };

  const searchPostsHandler = (enteredText) => {
    // postsDispatch({ type: "FILTER", payload: category });
    postsSearch({ method: "GET", url: `${BASE_URL}/posts` }, null, enteredText);
  };

  const resetPostsHandler = () => {
    // postsDispatch({ type: "RESET" });
    queryPosts({ method: "GET", url: `${BASE_URL}/posts` });
    setPosts1([]);
  };

  const contextData = {
    blogPosts: posts,
    searchedPosts: posts1,
    isLoggedIn: isLoggedIn,
    post: singlePost,
    login: loginHandler,
    logout: logoutHandler,
    filterPosts: filterPostsHandler,
    search: searchPostsHandler,
    resetPosts: resetPostsHandler,
    getPost: getPostHandler,
  };
  return (
    <PostsContext.Provider value={contextData}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
