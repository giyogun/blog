import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styles from "../UI/DeleteModal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.hide} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <p>Are you sure you want to delete this post?</p>
      </div>
      <footer className={styles.actions}>
        <button className={styles.btn} onClick={props.onDelete}>
          Yes
        </button>
        <button className={styles.btn} onClick={props.hide}>
          No
        </button>
      </footer>
    </div>
  );
};

const DeleteModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop hide={props.close} />,
        document.getElementById("backdrop")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay hide={props.close} onDelete={props.deletePost} />,
        document.getElementById("overlay")
      )}
    </>
  );
};

export default DeleteModal;
