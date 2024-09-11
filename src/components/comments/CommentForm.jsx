import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addComment, fetchComment } from '../../Redux/actions/comment.actions';

const CommentForm = ({recipe}) => {
    const user = useSelector((state) => state.userReducer);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchComment(recipe.id))
    // },[dispatch, recipe])
    // console.log(recipe.id);
    async function handleFormSubmit(e){
        e.preventDefault();

        const data = {
            user_id: user.id,
            username: user.username,
            recipe_id: recipe.id,
            date:  new Date().toISOString().split('T')[0],
            comment: comment,
        };
        try{
            await dispatch(addComment(data));
            dispatch(fetchComment(recipe.id));
            setComment("");
            // window.location.reload();
            
        } catch(error){
            console.error("Failed to post the comment", error);
        }
        

        
    }

    return (
            <div className='flex flex-col justify-center'>
                {user && user.id ? (
                    <div className='mx-4'>
                    <p className='text-center'>Post your comments! 🥰</p>
                    <form onSubmit={handleFormSubmit}>
                        <textarea className='border w-full py-7' value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <div type="submit" className='flex justify-end'><button className='bg-rose-500 text-white px-5 p-2 rounded mt-2 hover:bg-rose-600'>Post</button></div>
                    </form>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center py-2  border  mx-5 my-4'>
                    <p>Log in to post your comments.</p>
                    <Link to='/login'><button className='bg-rose-500 text-white px-5 py-1  rounded mt-2 hover:bg-rose-600'>Log in</button></Link>
                </div>
            )}
            
        </div>
    );
};

export default CommentForm;