import React from 'react'
import SinglePost from '../../components/posts/SinglePost';
import Sidebar from '../../components/sidebar/Sidebar';
import classes from './Single.module.css';

const Single = () => {
  return (
    <div className={classes.single}>
      <SinglePost />
      <Sidebar />
    </div>
  )
}

export default Single
