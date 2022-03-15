import React, { useContext } from "react";
import { useHistory } from "react-router";
import classes from "./Sidebar.module.css";
import {
  FaFacebookSquare,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import PostsContext from "../../context/postsContext";


const Sidebar = () => {
  const ctx = useContext(PostsContext);
  const { filterPosts, categories } = ctx;

  const history = useHistory();

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarItem}>
        <span className={classes.sidebarTitle}>ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Nunc dictum et felis nec laoreet. Suspendisse iaculis condimentum
          quam. Sed hendrerit in lacus in bibendum.{" "}
        </p>
      </div>
      <div className={classes.sidebarItem}>
        <span className={classes.sidebarTitle}>CATEGORIES</span>
        <ul className={classes.sidebarList}>
          {categories.map((c) => (
            <li
              key={c._id}
              className={classes.sidebarListItem}
              onClick={() => {
                history.push(`/?cat=${c.name}`);

                filterPosts(c.name);
              }}
            >
              {c.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.sidebarItem}>
        <span className={classes.sidebarTitle}>FOLLOW US</span>
        <div className={classes.sidebarSocial}>
          <a href="https://instagram.com" rel="noreferrer" target="_blank">
            <FaInstagram className={classes.sidebarIcon} />
          </a>
          <a href="https://pinterest.com" rel="noreferrer" target="_blank">
            <FaPinterest className={classes.sidebarIcon} />
          </a>
          <a href="https://twitter.com" rel="noreferrer" target="_blank">
            <FaTwitter className={classes.sidebarIcon} />
          </a>
          <a href="https://facebook.com" rel="noreferrer" target="_blank">
            <FaFacebookSquare className={classes.sidebarIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
