import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import useApiCall from "../hooks/useApiCall";

const PostsContext = React.createContext({
  blogPosts: [],
  searchedPosts: [],
  isLoggedIn: false,
  // post: {},
  error: null,
  categories: [],
  updatePost: () => {},
  getCategories: function () {},
  clear: () => {},
  login: () => {},
  logout: () => {},
  filterPosts: () => {},
  search: () => {},
  resetPosts: () => {},
  filterPostsByUser: () => {},
  register: () => {},
});

const BASE_URL = "http://localhost:5000/api";

const capitalize = (text) => {
  const result = text.charAt(0).toUpperCase() + text.slice(1);

  return result;
};

const ls = localStorage.getItem("user");

export const PostsProvider = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [cats, setCats] = useState([]);
  // const [singlePost, setSinglePost] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(!!ls);
  const history = useHistory();

  const getAllCats = useCallback((data) => {
    setCats(data.data);
  }, []);

  const updatePostFunc = useCallback((data) => {
    console.log(data);
  }, []);

  const getAllPosts = useCallback((data) => {
    console.log(data);
    setPosts(data.data);
  }, []);

  const getPostsByUser = useCallback((data) => {
    setPosts(data.data);
  }, []);

  const filterAllPosts = useCallback((data, cat) => {
    const filteredPosts = data.data.filter((m) => m.categories.includes(cat));

    setPosts(filteredPosts);
  }, []);

  const searchPosts = useCallback((data, cat, title) => {
    const posts = data.data.filter((m) => m.title.includes(capitalize(title)));

    setPosts1(posts);
  }, []);

  const loginApi = useCallback(
    (data) => {
      if (data.statusText) {
        setIsLoggedIn(true);
        history.push("/write");
      } else {
        setErrorMessage(data);
      }
    },
    [history]
  );

  const registration = (data) => {
    if (!data.statusText) {
      setErrorMessage(data);
    }
  };

  const { queryPosts: registerQuery } = useApiCall(registration);

  const { queryPosts } = useApiCall(getAllPosts);
  const { queryPosts: updatePostQuery } = useApiCall(updatePostFunc);
  const { queryPosts: getCats } = useApiCall(getAllCats);
  const { queryPosts: queryPostByUser } = useApiCall(getPostsByUser);
  const { queryPosts: postsSearch } = useApiCall(searchPosts);
  const { queryPosts: filterPosts } = useApiCall(filterAllPosts);
  const { queryPosts: userLogin } = useApiCall(loginApi);

  useEffect(() => {
    queryPosts({ method: "GET", url: `${BASE_URL}/posts` });
  }, [queryPosts]);

  useEffect(() => {
    getCats({ method: "GET", url: `${BASE_URL}/categories` });
  }, [getCats]);

  const getPostsByUserHandler = (name) => {
    queryPostByUser({
      method: "GET",
      url: `http://localhost:5000/api/posts?user=${name}`,
    });
  };

  const updatePostHandler = (config) => {
    updatePostQuery({
      method: "PUT",
      url: `http://localhost:5000/api/posts/${config.id}`,
      body: config
    });
  };

  const registrationHandler = (username, email, password) => {
    registerQuery({
      url: `${BASE_URL}/auth/register`,
      method: "POST",
      body: {
        username,
        email,
        password,
      },
    });
  };

  const loginHandler = (username, pass) => {
    userLogin({
      method: "POST",
      body: { username, password: pass },
      url: `${BASE_URL}/auth/login`,
    });
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const filterPostsHandler = (category) => {
    filterPosts({ method: "GET", url: `${BASE_URL}/posts` }, category);
  };

  const searchPostsHandler = (enteredText) => {
    postsSearch({ method: "GET", url: `${BASE_URL}/posts` }, null, enteredText);
  };

  const resetPostsHandler = () => {
    queryPosts({ method: "GET", url: `${BASE_URL}/posts` });
    setPosts1([]);
  };

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const getCategoriesHandler = () => {
    getCats({ method: "GET", url: `${BASE_URL}/categories` });
  };

  const contextData = {
    blogPosts: posts,
    searchedPosts: posts1,
    isLoggedIn: isLoggedIn,
    // post: singlePost,
    error: errorMessage,
    categories: cats,
    updatePost: updatePostHandler,
    getCategories: getCategoriesHandler,
    clear: clearErrorMessage,
    login: loginHandler,
    logout: logoutHandler,
    filterPosts: filterPostsHandler,
    search: searchPostsHandler,
    resetPosts: resetPostsHandler,
    filterPostsByUser: getPostsByUserHandler,
    // getPost: getPostHandler,
    register: registrationHandler,
  };
  return (
    <PostsContext.Provider value={contextData}>
      {props.children}
    </PostsContext.Provider>
  );
};

export default PostsContext;
