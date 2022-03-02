import React from "react";
import classes from "./Write.module.css";
import { MdAddCircleOutline } from "react-icons/md";

const Write = () => {
  return (
    <div className={classes.write}>
      <img
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
        className={classes.writeImg}
      />
      <form className={classes.writeForm}>
        <div className={classes.writeFormGroup}>
          <label htmlFor="fileInput">
            <MdAddCircleOutline className={classes.writeIcon} />
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} />
          <input
            type="text"
            placeholder="Title"
            className={classes.writeInput}
            autoFocus={true}
          />
        </div>
        <div className={classes.writeFormGroup}>
          <textarea
            placeholder="Tell your story..."
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
