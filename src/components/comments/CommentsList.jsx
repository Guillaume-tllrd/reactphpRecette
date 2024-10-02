import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Comment from './Comment';
// import { fetchComment } from '../../Redux/actions/comment.actions';

const CommentsList = ({comments}) => {
    // const dispatch = useDispatch();
    // const comments = useSelector((state) => state.commentReducer.commentsByRecipe);
    // console.log(comments)
    
    // useEffect(() => {
    //     dispatch(fetchComment(recipe.id))
    // },[dispatch, recipe])
    

    return (
        <div>
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            // faire une partie comment
            <Comment comment={comment} key={index} />
          ))
        ) : (
          <p className='px-5'>No comments yet.</p>
        )}
      </div>
    );
};

export default CommentsList;
