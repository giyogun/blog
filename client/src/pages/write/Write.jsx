import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./Write.module.css";
import { MdAddCircleOutline } from "react-icons/md";
import { useHistory, useLocation } from "react-router";
import useApiCall from "../../hooks/useApiCall";
import PostsContext from "../../store/postsContext";

const ls = localStorage.getItem("user");

const Write = () => {
  const ctx = useContext(PostsContext);
  const location = useLocation();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [canEdit, setCanEdit] = useState(false);
  const postId = location.search.split("=")[1];
  const titleRef = useRef();
  const bodyRef = useRef();

  const getOnePost = useCallback(
    (data) => {
      if (data.statusText) {
        const x = data.data.username === ls;
        if (!x) {
          history.push("/write");
        }
        setCanEdit(x);
        setPost(data.data);
      } else {
        history.push("/write");
      }
    },
    [history]
  );

  console.log(postId);

  const { queryPosts: singlePostQuery } = useApiCall(getOnePost);

  useEffect(() => {
    if (postId) {
      singlePostQuery({
        method: "GET",
        url: `http://localhost:5000/api/posts/${postId}`,
      });
    }
  }, [singlePostQuery, postId]);

  const updatePostHandler = (e) => {
    e.preventDefault();
    const newTitle = titleRef.current.value;
    const newBody = bodyRef.current.value;
    if (canEdit) {
      console.log(1);
      ctx.updatePost({
        title: newTitle,
        description: newBody,
        id: post._id,
        username: post.username,
      });
    }
  };

  return (
    <div className={classes.write}>
      <img
        src={
          canEdit
            ? post.photo
            : "https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        }
        alt=""
        className={classes.writeImg}
      />
      <form className={classes.writeForm} onSubmit={updatePostHandler}>
        <div className={classes.writeFormGroup}>
          <label htmlFor="fileInput">
            <MdAddCircleOutline className={classes.writeIcon} />
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <input
            type="text"
            placeholder={!canEdit ? "Title" : ""}
            defaultValue={canEdit ? post.title : ""}
            ref={titleRef}
            className={classes.writeInput}
            autoFocus={true}
          />
        </div>
        <div className={classes.writeFormGroup}>
          <textarea
            placeholder={!canEdit ? "Tell your story..." : ""}
            defaultValue={canEdit ? post.description : ""}
            ref={bodyRef}
            type="text"
            className={`${classes.writeInput} ${classes.writeText}`}
          ></textarea>
        </div>
        <button className={classes.writeSubmit}>Publish</button>
      </form>
    </div>
  );
};

export default Write;
