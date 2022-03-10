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
  createPost: () => {},
  updatePost: () => {},
  deletePost: () => {},
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

const ls = JSON.parse(localStorage.getItem("user"));

export const PostsProvider = (props) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [posts1, setPosts1] = useState([]);
  const [cats, setCats] = useState([]);
  // const [singlePost, setSinglePost] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(!!ls);
  const history = useHistory();

  const getAllCats = useCallback((res) => {
    if (res.statusText === "OK") {
      setCats(res.data);
    }
  }, []);

  const createPostFunc = useCallback(
    (res) => {
      if (res.statusText === "OK") {
        console.log(res);
        history.replace("/posts/" + res.data._id);
      }
    },
    [history]
  );
  const updatePostFunc = useCallback((res) => {
    if (res.statusText === "OK") {
      history.replace("/posts/" + res.data._id);
    }
    console.log(res);
  }, [history]);

  const getAllPosts = useCallback((res) => {
    console.log(res);
    if (res.statusText === "OK") {
      setPosts(res.data);
    }
  }, []);

  const getPostsByUser = useCallback((res) => {
    if (res.statusText === "OK") {
      setPosts(res.data);
    }
  }, []);

  const deleteSinglePost = useCallback(
    (res) => {
      if (res.statusText === "OK") {
        console.log("Post Deleted");
        history.replace("/");
      }
      console.log(res);
    },
    [history]
  );

  const filterAllPosts = useCallback((res, cat) => {
    const filteredPosts = res.data.filter((m) => m.categories.includes(cat));

    setPosts(filteredPosts);
  }, []);

  const searchPosts = useCallback((res, cat, title) => {
    const posts = res.data.filter((m) => m.title.includes(capitalize(title)));

    setPosts1(posts);
  }, []);

  const loginApi = useCallback(
    (res) => {
      if (res.statusText === "OK") {
        localStorage.setItem("user", JSON.stringify(res.data));

        setIsLoggedIn(true);
        history.push("/write");
      } else {
        setErrorMessage(res);
      }
    },
    [history]
  );

  const registration = (res) => {
    if (!res.statusText === "OK") {
      setErrorMessage(res);
    }
  };

  const { queryPosts: registerQuery } = useApiCall(registration);

  const { queryPosts } = useApiCall(getAllPosts);
  const { queryPosts: createPostQuery } = useApiCall(createPostFunc);
  const { queryPosts: updatePostQuery } = useApiCall(updatePostFunc);
  const { queryPosts: getCats } = useApiCall(getAllCats);
  const { queryPosts: queryPostByUser } = useApiCall(getPostsByUser);
  const { queryPosts: postsSearch } = useApiCall(searchPosts);
  const { queryPosts: filterPosts } = useApiCall(filterAllPosts);
  const { queryPosts: userLogin } = useApiCall(loginApi);
  const { queryPosts: deletePostQuery } = useApiCall(deleteSinglePost);

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

  const createPostHandler = (config) => {
    createPostQuery({
      method: "POST",
      url: `http://localhost:5000/api/posts/`,
      body: config,
    });
  };

  const updatePostHandler = (config) => {
    updatePostQuery({
      method: "PUT",
      url: `http://localhost:5000/api/posts/${config.id}`,
      body: config,
    });
  };

  const deletePostHandler = (config) => {
    deletePostQuery({
      method: "DELETE",
      url: `http://localhost:5000/api/posts/${config.id}`,
      body: config,
    });
    console.log(config.username);
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
    localStorage.removeItem("user");
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
    createPost: createPostHandler,
    updatePost: updatePostHandler,
    deletePost: deletePostHandler,
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
