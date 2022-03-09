import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import classes from "./SinglePost.module.css";
import { RiEditLine, RiDeleteBin5Line } from "react-icons/ri";
import { useHistory, useParams } from "react-router";
import PostsContext from "../../store/postsContext";
import useApiCall from "../../hooks/useApiCall";
import { Link } from "react-router-dom";

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

const ls = JSON.parse(localStorage.getItem("user"));

const SinglePost = () => {
  const params = useParams();
  const { postId } = params;
  const history = useHistory();
  const [post, setPost] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const publicFolder = "http://localhost:5000/images/";

  const ctx = useContext(PostsContext);
  const { isLoggedIn } = ctx;

  const getOnePost = useCallback((data) => {
    console.log(data);
    setPost(data.data);
    setCanEdit(ls.username === data.data.username);
  }, []);

  const { queryPosts: singlePostQuery } = useApiCall(getOnePost);

  console.log(ls);
  useEffect(() => {
    singlePostQuery({
      method: "GET",
      url: `http://localhost:5000/api/posts/${postId}`,
    });
  }, [singlePostQuery, postId]);

  const authorClickHandler = (name) => {
    ctx.filterPostsByUser(name);
    console.log(history);
  };

  const editPostHandler = () => {
    history.push(`/write?edit=${postId}`);
  };

  return (
    <Fragment>
      <div className={classes.singlePost}>
        <div className={classes.singlePostWrapper}>
          {post.photo && (
            <img
              className={classes.singlePostImg}
              src={publicFolder + post.photo}
              alt=""
            />
          )}
          <h1 className={classes.singlePostTitle}>
            {post.title}
            {isLoggedIn && canEdit && (
              <div className={classes.singlePostEdit}>
                <RiEditLine
                  className={classes.singlePostIcon}
                  onClick={editPostHandler}
                />
                <RiDeleteBin5Line className={classes.singlePostIcon} />
              </div>
            )}
          </h1>
          <div className={classes.singlePostInfo}>
            <span
              className={classes.singlePostAuthor}
              onClick={() => authorClickHandler(post.username)}
            >
              <Link to={`/?user=${post.username}`}>
                Author: <b>{post.username}</b>
              </Link>
            </span>
            <span className={classes.singlePostDate}>
              {postDateHandler(new Date(post.createdAt))}
            </span>
          </div>
          <p className={classes.fullPost}>{post.description}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default SinglePost;
