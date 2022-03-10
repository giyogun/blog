import React, { Fragment } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import DeleteModal from "../../components/UI/DeleteModal";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <Fragment>
      <Header />
      <div className={classes.home}>
        <Posts />
        <Sidebar />
      </div>
      {/* <DeleteModal /> */}
    </Fragment>
  );
};

export default Home;
