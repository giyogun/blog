import React, { useContext, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import "./Navbar.css";
import {
  FaFacebookSquare,
  FaInstagram,
  FaPinterest,
  FaSearch,
  FaTwitter,
} from "react-icons/fa";
import PostsContext from "../../context/postsContext";
import { ImUser } from "react-icons/im";

const Navbar = () => {
  const ctx = useContext(PostsContext);
  const ls = JSON.parse(localStorage.getItem("user"));
  const publicFolder = "http://localhost:5000/images/";
  const searchRef = useRef();
  let profilePic = <ImUser className="topImg" />;

  if (ls) {
    if (ls.profilePic) {
      profilePic = (
        <img
          src={publicFolder + ls.profilePic}
          alt="profile"
          className="topImg"
        />
      );
    }
  }

  const [x, setX] = useState("topnav");
  const clickHandle = () => {
    if (x === "topnav") {
      setX("topnav responsive");
    } else {
      setX("topnav");
    }
  };

  const searchPostsHandler = (e) => {
    e.preventDefault();
    const enteredText = searchRef.current.value;
    ctx.search(enteredText);
  };

  const removeBarHandler = () => {
    setX("topnav");
  };

  return (
    <div className={x}>
      <Link className="icon" onClick={clickHandle}>
        &#9776;
      </Link>
      <div className="topLeft">
        <a href="https://instagram.com" rel="noreferrer" target="_blank">
          <FaInstagram className="topIcon" />
        </a>
        <a href="https://pinterest.com" rel="noreferrer" target="_blank">
          <FaPinterest className="topIcon" />
        </a>
        <a href="https://twitter.com" rel="noreferrer" target="_blank">
          <FaTwitter className="topIcon" />
        </a>
        <a href="https://facebook.com" rel="noreferrer" target="_blank">
          <FaFacebookSquare className="topIcon" />
        </a>
      </div>
      <div className="topCenter">
        <NavLink
          to="/"
          exact
          activeClassName="active"
          onClick={() => {
            ctx.resetPosts();
            removeBarHandler();
          }}
        >
          HOME
        </NavLink>
        {/* <NavLink to="/home" activeClassName="active">
          ABOUT
        </NavLink> */}
        <NavLink
          to="/write"
          activeClassName="active"
          onClick={removeBarHandler}
        >
          WRITE
        </NavLink>
        <div className="dropdown">
          <button className="dropbtn">
            Dropdown <IoIosArrowDropdownCircle />
          </button>
          <div className="dropdown-content">
            <Link to="#">Link 1</Link>
            <Link to="#">Link 2</Link>
            <Link to="#">Link 3</Link>
          </div>
        </div>
        {/* {ctx.isLoggedIn && (
          <NavLink
            to="/"
            onClick={() => {
              ctx.logout();
            }}
          >
            LOGOUT
          </NavLink>
        )} */}
      </div>
      <div className="topRight">
        <div className="profileDropdown">
          {ctx.isLoggedIn ? (
            profilePic
          ) : (
            <Link to="/login" className="link">
              LOGIN
            </Link>
          )}
          {ctx.isLoggedIn && (
            <div className="topDropdownContent">
              <Link to="/settings" onClick={removeBarHandler}>
                Settings
              </Link>
              <Link
                to="/"
                onClick={() => {
                  ctx.logout();
                  removeBarHandler();
                }}
              >
                Logout
              </Link>
            </div>
          )}
        </div>
        <form onSubmit={searchPostsHandler}>
          <div className={`searchContainer searchDropdown`}>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              className="searchInput"
              ref={searchRef}
            />
            <FaSearch
              className="topSearchIcon"
              onClick={() => setX("topnav responsive")}
            />
            <div className="searchResults">
              {ctx.searchedPosts.map((m) => (
                <Link
                  to={`/posts/${m._id}`}
                  key={m._id}
                  onClick={() => {
                    removeBarHandler();
                    ctx.resetPosts();
                    searchRef.current.value = "";
                  }}
                >
                  {m.title}
                </Link>
              ))}
            </div>
          </div>
        </form>
      </div>
      {/* <NavLink to="/about">About</NavLink> */}
      {/* <Link to="#" className="icon" onClick={clickHandle}>
        &#9776;
      </Link> */}
    </div>
  );
};

export default Navbar;
