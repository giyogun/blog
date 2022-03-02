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
import useApiCall from "../../useApiCall";
// import data from "../assets/data";

const SinglePost = () => {
  const [post, setPost] = useState({});
  const params = useParams();
  const { postId } = params;

  const getSpecificPost = useCallback(
    (data) => {
      const x = data.find((item) => item._id === postId);
      setPost(x);
    },
    [postId]
  );

  const { queryPosts, postDateHandler } = useApiCall(getSpecificPost);
  const ctx = useContext(PostsContext);
  const { isLoggedIn } = ctx;

  // const post = dbPosts.find((item) => item._id === +postId);

  useEffect(() => {
    queryPosts("http://localhost:5000/api/posts");
  }, [queryPosts]);

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
