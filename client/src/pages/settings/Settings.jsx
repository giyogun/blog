import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import classes from "./Settings.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import useApiCall from "../../hooks/useApiCall";


const Settings = () => {
  const ls = JSON.parse(localStorage.getItem("user"));
  return (
    <div className={classes.settings}>
      <div className={classes.settingsWrapper}>
        <div className={classes.settingsTitle}>
          <span className={classes.settingsUpdateTitle}>
            Update Your Account
          </span>
          <span className={classes.settingsDeleteTitle}>Delete Account</span>
        </div>
        <form className={classes.settingsForm}>
          <label>Profile Picture</label>
          <div className={classes.settingsPP}>
            <img
              src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
            <label htmlFor="fileInput">
              <FaRegUserCircle className={classes.settingsPPIcon} />
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label>Username</label>
          <input type="text" placeholder={ls.username} />
          <label>Email</label>
          <input type="email" placeholder={ls.email} />
          <label>Password</label>
          <input type="password" />
          <button className={classes.settingsSubmit}>Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
