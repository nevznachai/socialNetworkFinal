import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div>
      <div className={s.posts}>
        <div className={s.item}>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Anonymous.svg/1481px-Anonymous.svg.png' />
          {props.message}
        </div>
        <div>
          <span>like</span>
          {props.likesCount}
        </div>
      </div>
    </div>
  )
}


export default Post;