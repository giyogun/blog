import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

import { Link } from "react-router-dom";
import PostsContext from "../../store/postsContext";
import data from "../assets/data";
// import useFilter from "../../useFilter";
import classes from "./Post.module.css";
import useApiCall from "../../useApiCall";

const BASE_URL = "http://localhost:5000/api";

// const postDateHandler = (x) => {
//   let displayedDate;
//   const now = new Date();
//   const curr = now.getTime();
//   const postDate = x.getTime();
//   const diff = curr - postDate;
//   const inMins = diff * 0.00001667;
//   const inHours = diff * 0.0000002778;
//   const inDays = inHours * 0.041667;
//   displayedDate = `${Math.floor(inMins)} ${
//     inMins >= 2 ? "minutes" : "minute"
//   } ago`;
//   if (inMins > 60) {
//     displayedDate = `${Math.floor(inHours)} ${
//       inHours >= 2 ? "hours" : "hour"
//     } ago`;
//   }

//   if (inHours > 24) {
//     displayedDate = `${Math.floor(inDays)} ${inDays >= 2 ? "days" : "day"} ago`;
//   }

//   if (inDays > 6) {
//     displayedDate = `${x.getDay() - 1}/${x.getMonth() + 1}/${x.getFullYear()}`;
//   }

//   return displayedDate;
// };

const Post = () => {
  // const ctx = useContext(PostsContext);
  const [allPosts, setAllPosts] = useState([]);

  // const { blogPosts: posts, filterPosts } = ctx;
  const history = useHistory();
  const location = useLocation();

  const getAllPosts = useCallback((data) => {
    setAllPosts(data);
  }, []);

  const filterAllPosts = useCallback((data, cat) => {
    const filteredPosts = data.filter((m) => m.categories.includes(cat));

    setAllPosts(filteredPosts);
  }, []);

  const { queryPosts, postDateHandler } = useApiCall(getAllPosts);
  const { queryPosts: filterPosts } = useApiCall(filterAllPosts);

  useEffect(() => {
    queryPosts(`${BASE_URL}/posts`);
  }, [queryPosts]);

  const filterPostsHandler = (cat) => {
    // filterPosts(cat);
    filterPosts(`${BASE_URL}/posts`, cat);

    history.push({
      pathname: `${location.pathname}`,
      search: `?cat=${cat}`,
    });
  };

  return (
    <Fragment>
      {allPosts.map((post) => (
        <div className={classes.post} key={post._id}>
          <img className={classes.postImg} src={post.photo} alt="" />
          <div className={classes.postInfo}>
            <div className={classes.postCats}>
              <span
                className={classes.postCat}
                onClick={() => filterPostsHandler(post.categories[0])}
              >
                {post.categories[0]}
              </span>
              <span
                className={classes.postCat}
                onClick={() => filterPostsHandler(post.categories[1])}
              >
                {post.categories[1]}
              </span>
            </div>
            <Link to={`/posts/${post._id}`}>
              <span className={classes.postTitle}>{post.title}</span>
            </Link>
            <hr />
            <span className={classes.postDate}>
              {postDateHandler(new Date(post.createdAt))}
            </span>

            <p className={classes.postDesc}>{post.description}</p>
          </div>
        </div>
      ))}
      {/* {data.map((post) => (
        <div className={classes.post} key={post.id}>
          <img className={classes.postImg} src={post.image} alt="" />
          <div className={classes.postInfo}>
            <div className={classes.postCats}>
              <span
                className={classes.postCat}
                onClick={() => filterPostsHandler(post.category[0])}
              >
                {post.category[0]}
              </span>
              <span
                className={classes.postCat}
                onClick={() => filterPostsHandler(post.category[1])}
              >
                {post.category[1]}
              </span>
            </div>
            <Link to={`/posts/${post.id}`}>
              <span className={classes.postTitle}>{post.title}</span>
            </Link>
            <hr />
            <span className={classes.postDate}>{post.time}</span>

            <p className={classes.postDesc}>{post.body}</p>
          </div>
        </div>
      ))} */}
    </Fragment>
  );
};

export default Post;
