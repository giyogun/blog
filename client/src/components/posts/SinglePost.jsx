import React, { Fragment, useContext } from "react";
import classes from "./SinglePost.module.css";
import { RiEditLine, RiDeleteBin5Line } from "react-icons/ri";
import { useParams } from "react-router";
import PostsContext from "../../store/postsContext";

const SinglePost = () => {
  const ctx = useContext(PostsContext);
  const { blogPosts, isLoggedIn } = ctx;
  const params = useParams();
  const { postId } = params;

  const post = blogPosts.find((item) => item.id === +postId);

  return (
    <Fragment>
      <div className={classes.singlePost}>
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
      </div>
    </Fragment>
  );
};

export default SinglePost;
