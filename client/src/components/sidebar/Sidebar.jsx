import React, { useContext, useRef } from "react";
import classes from "./Sidebar.module.css";
import {
  FaFacebookSquare,
  FaTwitter,
  FaPinterest,
  FaInstagram,
} from "react-icons/fa";
import PostsContext from "../../store/postsContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const ctx = useContext(PostsContext);
  const musicRef = useRef();
  const lifeRef = useRef();
  const styleRef = useRef();
  const sportsRef = useRef();
  const techRef = useRef();
  const cinemaRef = useRef();

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
          <li className={classes.sidebarListItem} ref={lifeRef}>
            <Link
              to="/"
              onClick={() => {
                ctx.filterPosts(lifeRef.current.innerText);
              }}
            >
              Life
            </Link>
          </li>
          <li className={classes.sidebarListItem} ref={musicRef}>
            <Link
              to="/"
              onClick={() => {
                ctx.filterPosts(musicRef.current.innerText);
              }}
            >
              Music
            </Link>
          </li>
          <li className={classes.sidebarListItem} ref={styleRef}>
            <Link
              to="/"
              onClick={() => {
                ctx.filterPosts(styleRef.current.innerText);
              }}
            >
              Style
            </Link>
          </li>
          <li className={classes.sidebarListItem} ref={sportsRef}>
            <Link
              to="/"
              onClick={() => {
                ctx.filterPosts(sportsRef.current.innerText);
              }}
            >
              Sport
            </Link>
          </li>
          <li className={classes.sidebarListItem} ref={techRef}>
            <Link
              to="/"
              onClick={() => {
                ctx.filterPosts(techRef.current.innerText);
              }}
            >
              Tech
            </Link>
          </li>
          <li className={classes.sidebarListItem} ref={cinemaRef}>
            <Link
              to="/"
              onClick={() => {
                ctx.filterPosts(cinemaRef.current.innerText);
              }}
            >
              Cinema
            </Link>
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
