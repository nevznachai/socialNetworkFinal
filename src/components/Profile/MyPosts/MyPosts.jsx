import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../Common/FormsControls/FormsControls';
import s from './MyPosts.module.css';
import Post from './Post/Post';



const MyPosts = React.memo(props => {

  // console.log('render')

  let postsElement = [...props.posts].reverse().map((p) => <Post message={p.message} likesCount={p.likesCount} />)



  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <AddNewPostReduxForm onSubmit={onAddPost} />
      </div>
      <div className={s.posts}>
        {postsElement}
      </div>
    </div>
  )
}
)

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name={'newPostText'} validate={[required, maxLength10]} placeholder={'post something'} />
      </div>
      <div>
        <button>Add post</button>
        <button>Delete</button>
      </div>
    </form>
  )
}

let AddNewPostReduxForm = reduxForm({ form: 'ProfileAddPostForm' })(AddNewPostForm);



export default MyPosts;