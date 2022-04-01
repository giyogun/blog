import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router";
import PostsContext from "../../context/postsContext";
import styles from "../UI/DeleteModal.module.css";

const postInfo = JSON.parse(localStorage.getItem("postInfo"));
const userInfo = JSON.parse(localStorage.getItem("user"));

const Backdrop = () => {
  const ctx = useContext(PostsContext);

  return <div className={styles.backdrop} onClick={() => ctx.modal()} />;
};

const ModalOverlay = () => {
  const ctx = useContext(PostsContext);
  const [user, setUser] = useState(userInfo);
  const [post, setPost] = useState(postInfo);
  const [isSettings, setIsSettings] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/")[2];
  console.log(page);

  useEffect(() => {
    if (!page) {
      setMessage("your account");
      setIsSettings(true);
    } else {
      setMessage("this post");
      setIsPost(true);
    }
    console.log(1);
  }, [page]);

  const deleteHandler = () => {
    if (isPost) {
      ctx.deletePost({
        userId: post.userId,
        id: post._id,
      });
      ctx.modal();
      return;
    } else if (isSettings) {
      console.log(user);
      ctx.deregister({
        userId: user._id,
        id: user._id,
      });
      ctx.modal();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <p>{`Are you sure you want to delete ${message}?`}</p>
      </div>
      <footer className={styles.actions}>
        <button className={styles.btn} onClick={deleteHandler}>
          Yes
        </button>
        <button className={styles.btn} onClick={() => ctx.modal()}>
          No
        </button>
      </footer>
    </div>
  );
};

const DeleteModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, document.getElementById("backdrop"))}
      {ReactDOM.createPortal(
        <ModalOverlay hide={props.close} />,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default DeleteModal;
