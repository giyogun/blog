import React, { useContext, useRef } from "react";
import { useHistory } from "react-router";
import classes from "./Sidebar.module.css";
import {
  FaFacebookSquare,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import PostsContext from "../../store/postsContext";

// const BASE_URL = "http://localhost:5000/api/posts";

const Sidebar = () => {
  const ctx = useContext(PostsContext);
  const { filterPosts } = ctx;

  const musicRef = useRef();
  const lifeRef = useRef();
  const styleRef = useRef();
  const sportsRef = useRef();
  const techRef = useRef();
  const cinemaRef = useRef();
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
          <li
            className={classes.sidebarListItem}
            ref={lifeRef}
            onClick={() => {
              history.push(`/?cat=${lifeRef.current.innerText}`);

              filterPosts(lifeRef.current.innerText);
            }}
          >
            Life
          </li>
          <li
            className={classes.sidebarListItem}
            ref={musicRef}
            onClick={() => {
              history.push(`/?cat=${musicRef.current.innerText}`);

              filterPosts(musicRef.current.innerText);
            }}
          >
            Music
          </li>
          <li
            className={classes.sidebarListItem}
            ref={styleRef}
            onClick={() => {
              history.push(`/?cat=${sportsRef.current.innerText}`);

              filterPosts(styleRef.current.innerText);
            }}
          >
            Style
          </li>
          <li
            className={classes.sidebarListItem}
            ref={sportsRef}
            onClick={() => {
              history.push(`/?cat=${sportsRef.current.innerText}`);
              filterPosts(sportsRef.current.innerText);
            }}
          >
            Sport
          </li>
          <li
            className={classes.sidebarListItem}
            ref={techRef}
            onClick={() => {
              history.push(`/?cat=${techRef.current.innerText}`);
              filterPosts(techRef.current.innerText);
            }}
          >
            Tech
          </li>
          <li
            className={classes.sidebarListItem}
            ref={cinemaRef}
            onClick={() => {
              history.push(`/?cat=${cinemaRef.current.innerText}`);

              filterPosts(cinemaRef.current.innerText);
            }}
          >
            Cinema
          </li>
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
