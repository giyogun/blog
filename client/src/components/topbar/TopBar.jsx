import React, { useContext, useRef } from "react";
import classes from "./TopBar.module.css";
import {
  FaFacebookSquare,
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaSearch,
} from "react-icons/fa";

import profilePic from "../assets/photo5776120754558056466.jpg";
import { Link, NavLink } from "react-router-dom";
import PostsContext from "../../store/postsContext";

const TopBar = () => {
  // const resetHandler = (data) => {
  //   // setFilteredPosts(data);
  // };

  const searchRef = useRef();
  const ctx = useContext(PostsContext);

  const searchPostsHandler = (e) => {
    e.preventDefault();
    const enteredText = searchRef.current.value;
    ctx.search(enteredText);
  };
  return (
    <div className={classes.top}>
      <div className={classes.topLeft}>
        <a href="https://instagram.com" rel="noreferrer" target="_blank">
          <FaInstagram className={classes.topIcon} />
        </a>
        <a href="https://pinterest.com" rel="noreferrer" target="_blank">
          <FaPinterest className={classes.topIcon} />
        </a>
        <a href="https://twitter.com" rel="noreferrer" target="_blank">
          <FaTwitter className={classes.topIcon} />
        </a>
        <a href="https://facebook.com" rel="noreferrer" target="_blank">
          <FaFacebookSquare className={classes.topIcon} />
        </a>
      </div>
      <div className={classes.topCenter}>
        <ul className={classes.topList}>
          <li className={classes.topListItem}>
            <NavLink
              to="/"
              exact
              activeClassName={classes.active}
              onClick={() => ctx.resetPosts()}
            >
              HOME
            </NavLink>
          </li>
          <li className={classes.topListItem}>
            <NavLink to="/home" activeClassName={classes.active}>
              ABOUT
            </NavLink>
          </li>
          <li className={classes.topListItem}>
            <NavLink to="/home" activeClassName={classes.active}>
              CONTACT
            </NavLink>
          </li>
          <li className={classes.topListItem}>
            <NavLink to="/write" activeClassName={classes.active}>
              WRITE
            </NavLink>
          </li>
          {ctx.isLoggedIn && (
            <li className={classes.topListItem} onClick={ctx.logout}>
              <NavLink to="/">LOGOUT</NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className={classes.topRight}>
        <div className={classes.dropdown}>
          {ctx.isLoggedIn ? (
            <img src={profilePic} alt="profile" className={classes.topImg} />
          ) : (
            <Link to="/login" className={classes.link}>
              LOGIN
            </Link>
          )}
          {ctx.isLoggedIn && (
            <div className={classes.topDropdownContent}>
              <Link to="/settings">Settings</Link>
            </div>
          )}
        </div>
        <form onSubmit={searchPostsHandler}>
          <div
            className={`${classes.searchContainer} ${classes.searchDropdown}`}
          >
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className={classes.searchInput}
              ref={searchRef}
            />
            <div className={classes.searchResults}>
              {ctx.searchedPosts.map((m) => (
                <Link
                  to={`/posts/${m._id}`}
                  key={m._id}
                  onClick={() => {
                    ctx.resetPosts();
                    searchRef.current.value = "";
                  }}
                >
                  {m.title}
                </Link>
              ))}
            </div>
            <FaSearch className={classes.topSearchIcon} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopBar;
