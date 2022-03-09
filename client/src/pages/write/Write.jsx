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

const Write = () => {
  const ls = JSON.parse(localStorage.getItem("user"));
  const ctx = useContext(PostsContext);
  const [selectedFile, setSelectedFile] = useState();
  const location = useLocation();
  const history = useHistory();
  const [post, setPost] = useState({});
  const [isEditState, setIsEditState] = useState(false);
  const postId = location.search.split("=")[1];
  const titleRef = useRef();
  const bodyRef = useRef();
  const publicFolder = "http://localhost:5000/images/";

  const uploadImage = useCallback((data) => {}, []);
  const { username } = ls;

  const getOnePost = useCallback(
    (data) => {
      if (data.statusText) {
        const x = data.data.username === username;
        if (!x) {
          history.push("/write");
        }
        setIsEditState(x);
        setPost(data.data);
      } else {
        history.push("/write");
      }
    },
    [history, username]
  );

  const { queryPosts: singlePostQuery } = useApiCall(getOnePost);
  const { queryPosts: uploadImageQuery } = useApiCall(uploadImage);

  useEffect(() => {
    if (postId) {
      singlePostQuery({
        method: "GET",
        url: `http://localhost:5000/api/posts/${postId}`,
      });
    }
  }, [singlePostQuery, postId]);

  console.log(username);

  const updatePostHandler = (e) => {
    e.preventDefault();
    const newTitle = titleRef.current.value;
    const newBody = bodyRef.current.value;
    if (isEditState) {
      console.log(1);
      ctx.updatePost({
        title: newTitle,
        description: newBody,
        id: post._id,
        username: post.username,
      });
    } else {
      const newPost = {
        title: newTitle,
        description: newBody,
        username: username,
      };
      if (selectedFile) {
        const data = new FormData();
        const filename = Date.now() + selectedFile.name;
        data.append("name", filename);
        data.append("file", selectedFile);
        newPost.photo = filename;
        uploadImageQuery({
          url: `http://localhost:5000/api/upload`,
          method: "POST",
          body: data,
        });
      }
      ctx.createPost(newPost);
    }
    console.log(isEditState);
  };

  const changeHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className={classes.write}>
      (
      <img
        src={
          isEditState
            ? publicFolder + post.photo
            : selectedFile
            ? URL.createObjectURL(selectedFile)
            : ""
        }
        alt=""
        className={classes.writeImg}
      />
      )
      <form className={classes.writeForm} onSubmit={updatePostHandler}>
        <div className={classes.writeFormGroup}>
          <label htmlFor="fileInput">
            <MdAddCircleOutline className={classes.writeIcon} />
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={changeHandler}
          />
          <input
            type="text"
            placeholder={!isEditState ? "Title" : ""}
            defaultValue={isEditState ? post.title : ""}
            ref={titleRef}
            className={classes.writeInput}
            autoFocus={true}
          />
        </div>
        <div className={classes.writeFormGroup}>
          <textarea
            placeholder={!isEditState ? "Tell your story..." : ""}
            defaultValue={isEditState ? post.description : ""}
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
