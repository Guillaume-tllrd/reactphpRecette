// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';
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
            <div key={index} className='border-b mx-4 my-2'>
              <div className='flex justify-between gap-2 pt-2'> 
                {/* la div qui permet d'opposer l'espace du nom et de la bulle avec le delete en utilisant le justify-between */}
                <div className='flex items-center gap-2'>
                  <div className='flex justify-center items-center -translate-y-2 h-10 w-10 rounded-full bg-orange-300'>
                    <span className='font-bold'>
                      {comment.username[0].toUpperCase()}
                    </span>
                  </div>
                  <h1 className='font-semibold'>{comment.username}</h1>
                </div>
                <div className='flex'>
                    <EditComment comment={comment}/>
                    <DeleteComment comment={comment}/> 
                </div>
                
              </div>
              <p>{comment.comment}</p>
              <p className='font-light text-sm py-2'>
                {new Date(comment.date).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className='px-5'>No comments yet.</p>
        )}
      </div>
    );
};

export default CommentsList;
