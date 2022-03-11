import React, { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import classes from "./Settings.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { ImUser } from "react-icons/im";
import useApiCall from "../../hooks/useApiCall";

const Settings = () => {
  const ls = JSON.parse(localStorage.getItem("user"));
  const { profilePic } = ls;
  const [selectedFile, setSelectedFile] = useState(null);
  const [ppIsValid, setPpIsValid] = useState(!!profilePic);
  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const publicFolder = "http://localhost:5000/images/";

  const userUpdate = useCallback((res) => {
    if (res.statusText === "OK") {
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.reload();
    }
  }, []);

  const uploadImg = useCallback((res) => {
    console.log(res);
  }, []);

  const { queryPosts } = useApiCall(userUpdate);
  const { queryPosts: uploadImageQuery } = useApiCall(uploadImg);

  const picChangeHandler = (e) => {
    const x = e.target.files[0].name;
    const y = /\.(jpg|JPG|jpeg|JPEG|png|PNG|)$/;

    if (x.match(y)) {
      setSelectedFile(e.target.files[0]);
      setPpIsValid(true)
    } else {
      window.alert("Only images allowed");
    }
  };

  const updateInfoHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const newUserInfo = { userId: ls._id };

    if (!!email) {
      newUserInfo.email = email;
    }
    if (!!username) {
      newUserInfo.username = username;
    }
    if (!!password) {
      newUserInfo.password = password;
    }

    if (selectedFile) {
      const data = new FormData();
      const filename = Date.now() + selectedFile.name;
      data.append("name", filename);
      data.append("file", selectedFile);
      newUserInfo.profilePic = filename;
      uploadImageQuery({
        url: `http://localhost:5000/api/upload`,
        method: "POST",
        body: data,
      });
    }

    const canMakePostReq = !!email || !!username || !!password || selectedFile;

    if (canMakePostReq) {
      queryPosts({
        url: `http://localhost:5000/api/users/${ls._id}`,
        method: "PUT",
        body: newUserInfo,
      });
    }
    console.log(ppIsValid);
  };

  let picSrc = publicFolder + ls.profilePic;

  if (selectedFile) {
    picSrc = URL.createObjectURL(selectedFile);
  }
  return (
    <div className={classes.settings}>
      <div className={classes.settingsWrapper}>
        <div className={classes.settingsTitle}>
          <span className={classes.settingsUpdateTitle}>
            Update Your Account
          </span>
          <span className={classes.settingsDeleteTitle}>Delete Account</span>
        </div>
        <form className={classes.settingsForm} onSubmit={updateInfoHandler}>
          <label>Profile Picture</label>
          <div className={classes.settingsPP}>
            {ppIsValid ?
            <img src={picSrc} alt="" /> : <ImUser className={classes.ppIcon} />}
            <label htmlFor="fileInput">
              <FaRegUserCircle className={classes.settingsPPIcon} />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={picChangeHandler}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={ls.username} ref={usernameRef} />
          <label>Email</label>
          <input type="email" placeholder={ls.email} ref={emailRef} />
          <label>Password</label>
          <input type="password" ref={passwordRef} />
          <button className={classes.settingsSubmit}>Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
