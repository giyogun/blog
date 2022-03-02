import React, { Fragment, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import PostsContext from "../../store/postsContext";
// import useFilter from "../../useFilter";
import classes from "./Post.module.css";

const Post = () => {
  const ctx = useContext(PostsContext);
  const { blogPosts: posts, filterPosts } = ctx;
  const history = useHistory();
  const location = useLocation();

  const filterPostsHandler = (cat) => {
    filterPosts(cat);

    history.push({
      pathname: `${location.pathname}`,
      search: `?cat=${cat}`,
    });
  };

  return (
    <Fragment>
      {posts.map((post) => (
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
      ))}
    </Fragment>
  );
};

export default Post;
