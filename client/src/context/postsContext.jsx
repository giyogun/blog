import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import useApiCall from "../hooks/useApiCall";

const PostsContext = React.createContext({
  blogPosts: [],
  blogPost: {},
  searchedPosts: [],
  isLoggedIn: false,
  isLoading: true,
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
  const [isLoggedIn, setIsLoggedIn] = useState(!!ls);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const getAllCats = useCallback((res) => {
    if (res.statusText === "OK") {
      setCats(res.data);
    }
  }, []);

  const { queryPosts: getCats } = useApiCall(getAllCats);

  const createPostFunc = useCallback(
    (res) => {
      if (res.statusText === "OK") {
        history.replace("/posts/" + res.data._id);
        setIsLoading(false);
      }
    },
    [history]
  );

  const { queryPosts: createPostQuery } = useApiCall(createPostFunc);

  const updatePostFunc = useCallback(
    (res) => {
      if (res.statusText === "OK") {
        history.replace("/posts/" + res.data._id);
        setIsLoading(false);
      }
    },
    [history]
  );

  const { queryPosts: updatePostQuery } = useApiCall(updatePostFunc);

  const getAllPosts = useCallback((res) => {
    if (res.statusText === "OK") {
      const reverse = res.data.reverse();
      setPosts(reverse);
      setIsLoading(false);
    }
  }, []);

  const { queryPosts } = useApiCall(getAllPosts);

  const getPostsByUser = useCallback((res) => {
    if (res.statusText === "OK") {
      const reverse = res.data.reverse();
      setPosts(reverse);
    }
  }, []);

  const { queryPosts: queryPostByUser } = useApiCall(getPostsByUser);

  const deleteSinglePost = useCallback(
    (res) => {
      if (res.statusText === "OK") {
        console.log("Post Deleted");
        queryPosts({ method: "GET", url: `${BASE_URL}/posts` });
        history.replace("/");
        setIsLoading(false);
      }
    },
    [history, queryPosts]
  );

  const { queryPosts: deletePostQuery } = useApiCall(deleteSinglePost);

  const filterAllPosts = useCallback((res, cat) => {
    const filteredPosts = res.data.filter((m) => m.categories.includes(cat));

    setPosts(filteredPosts);
    setIsLoading(false);
  }, []);

  const { queryPosts: filterPosts } = useApiCall(filterAllPosts);

  const searchPosts = useCallback((res, cat, title) => {
    const posts = res.data.filter((m) => m.title.includes(capitalize(title)));

    setPosts1(posts);
  }, []);

  const { queryPosts: postsSearch } = useApiCall(searchPosts);

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

  const { queryPosts: userLogin } = useApiCall(loginApi);

  const registration = (res) => {
    // if (!res.statusText === "OK") {
    setErrorMessage(res);
    setIsLoading(false);
    // }
  };

  const { queryPosts: registerQuery } = useApiCall(registration);


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
    setIsLoading(true);
    createPostQuery({
      method: "POST",
      url: `http://localhost:5000/api/posts/`,
      body: config,
    });
  };

  const updatePostHandler = (config) => {
    setIsLoading(true);
    updatePostQuery({
      method: "PUT",
      url: `http://localhost:5000/api/posts/${config.id}`,
      body: config,
    });
  };

  const deletePostHandler = (config) => {
    setIsLoading(true);
    deletePostQuery({
      method: "DELETE",
      url: `http://localhost:5000/api/posts/${config.id}`,
      body: config,
    });
  };

  const registrationHandler = (username, email, password) => {
    setIsLoading(true);
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
    setIsLoading(true);
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
    isLoading: isLoading,
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
