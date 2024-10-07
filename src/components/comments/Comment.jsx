import { useState } from 'react';
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';
import { useDispatch } from 'react-redux';
import { editCommentAction } from '../../Redux/actions/comment.actions';

const Comment = ({comment, index}) => {
    const [editToggle, setEditToggle] = useState(false);
    const [editContent, setEditContent] = useState(comment.comment);
    const dispatch = useDispatch();

    function handleEditToggle(){
        setEditToggle(!editToggle);
    }
    
    function handleEditForm(e){
        e.preventDefault();
        const commentData = {
            id : comment.id,
            comment: editContent,
            date: new Date().toISOString().split('T')[0],
        }
        dispatch(editCommentAction(commentData))
        // j'ai rajouté Action pour laction du dispatch pour ne pas confondre avec l'icone
        setEditToggle(false)
    }
    return (
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
                <div className='flex gap-1'>
                    <EditComment comment={comment} handleEditToggle={handleEditToggle}/>
                    <DeleteComment comment={comment}/> 
                </div>
                
              </div>
              {/* // pour éditer on remet dans un form avec textarea et on lui attavche une fonction */}
                {editToggle ?  (<form onSubmit={handleEditForm}>
          {/* ne pas oublier de mettre un onChange pour réupérer la valeur */}
                <textarea className='border w-full py-7' autoFocus={true} defaultValue={comment.comment}  onChange={e => setEditContent(e.target.value)}></textarea>
                <div className='flex justify-end'><button className='bg-rose-500 text-white px-5 p-2 rounded mt-2 hover:bg-rose-600' type='submit'>Edit</button></div>
                </form>) : (
              <p>{comment.comment}</p>)}
              <p className='font-light text-sm py-2'>
                {new Date(comment.date).toLocaleDateString()}
              </p>
            </div>
    );
};

export default Comment;