import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import PostsContext from "../../store/postsContext";
// import useFilter from "../../useFilter";
import classes from "./Post.module.css";

// const BASE_URL = "http://localhost:5000/api";

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

const Post = () => {
  const ctx = useContext(PostsContext);

  const history = useHistory();

  const publicFolder = "http://localhost:5000/images/"

  const filterPostsHandler = (cat) => {
    ctx.filterPosts(cat);
    history.push(`?cat=${cat}`);
  };

  return (
    <Fragment>
      {ctx.blogPosts.map((post) => (
        <div className={classes.post} key={post._id}>
          {post.photo && (
            <img className={classes.postImg} src={publicFolder + post.photo} alt="" />
          )}
          <div className={classes.postInfo}>
            <div className={classes.postCats}>
                {post.categories.map((c) => (
                  <span
                    key={Math.random()}
                    className={classes.postCat}
                    onClick={() => filterPostsHandler(c)}
                  >
                    {c}
                  </span>
                ))}
              {/* <span
                // key={c._id}
                className={classes.postCat}
                onClick={() => filterPostsHandler(post.categories[0])}
              >
                {post.categories[0]}
              </span> */}
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
    </Fragment>
  );
};

export default Post;
