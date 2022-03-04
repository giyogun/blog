import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import classes from "./SinglePost.module.css";
import { RiEditLine, RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router";
import PostsContext from "../../store/postsContext";
import useApiCall from "../../hooks/useApiCall";

const postDateHandler = (x) => {
  let displayedDate;
  const now = new Date();
  const curr = now.getTime();
  const postDate = x.getTime();
  const diff = curr - postDate;
  const inMins = diff * 0.00001667;
  const inHours = diff * 0.0000002778;
  const inDays = inHours * 0.041667;
  displayedDate = `${Math.floor(inMins)} ${
    inMins >= 2 ? "minutes" : "minute"
  } ago`;
  if (inMins > 60) {
    displayedDate = `${Math.floor(inHours)} ${
      inHours >= 2 ? "hours" : "hour"
    } ago`;
  }

  if (inHours > 24) {
    displayedDate = `${Math.floor(inDays)} ${inDays >= 2 ? "days" : "day"} ago`;
  }

  if (inDays > 6) {
    displayedDate = `${x.getDay() - 1}/${x.getMonth() + 1}/${x.getFullYear()}`;
  }

  return displayedDate;
};

const SinglePost = () => {
  const params = useParams();
  const { postId } = params;
  // const [post, setPost] = useState({});
  // const [posts, setPosts] = useState([]);

  const ctx = useContext(PostsContext);
  const { isLoggedIn, getPost, post } = ctx;
  // const getAllPosts = useCallback((data) => {
  //   // setPosts(data);
  //   const singlePost = data.find((item) => item._id === postId);

  //   // ctx.getPost(postId)
  //   console.log(postId)

  //   setPost(singlePost);
  // }, [postId]);

  // const { queryPosts } = useApiCall(getAllPosts);

  useEffect(() => {
    //   queryPosts({ method: "GET", url: `http://localhost:5000/api/posts` });
    getPost(postId);
  }, [getPost, postId]);

  // setSinglePost(post);
  return (
    <Fragment>
      <div className={classes.singlePost}>
        <div className={classes.singlePostWrapper}>
          <img className={classes.singlePostImg} src={post.photo} alt="" />
          <h1 className={classes.singlePostTitle}>
            {post.title}
            {isLoggedIn && (
              <div className={classes.singlePostEdit}>
                <RiEditLine className={classes.singlePostIcon} />
                <RiDeleteBin5Line className={classes.singlePostIcon} />
              </div>
            )}
          </h1>
          <div className={classes.singlePostInfo}>
            <span className={classes.singlePostAuthor}>
              Author: <b>{post.username}</b>
            </span>
            <span className={classes.singlePostDate}>
              {postDateHandler(new Date(post.createdAt))}
            </span>
          </div>
          <p className={classes.fullPost}>{post.description}</p>
        </div>
      </div>
      {/* <div className={classes.singlePost}>
        <div className={classes.singlePostWrapper}>
          <img className={classes.singlePostImg} src={post.image} alt="" />
          <h1 className={classes.singlePostTitle}>
            {post.title}
            {isLoggedIn && (
              <div className={classes.singlePostEdit}>
                <RiEditLine className={classes.singlePostIcon} />
                <RiDeleteBin5Line className={classes.singlePostIcon} />
              </div>
            )}
          </h1>
          <div className={classes.singlePostInfo}>
            <span className={classes.singlePostAuthor}>
              Author: <b>{post.author}</b>
            </span>
            <span className={classes.singlePostDate}>{post.time}</span>
          </div>
          <p className={classes.fullPost}>{post.body}</p>
        </div>
      </div> */}
    </Fragment>
  );
};

export default SinglePost;
