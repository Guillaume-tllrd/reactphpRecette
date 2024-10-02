import { useState } from 'react';
import DeleteComment from './DeleteComment';
import EditComment from './EditComment';

const Comment = ({comment, index}) => {
    const [editToggle, setEditToggle] = useState(false);
    const [editContent, setEditContent] = useState(comment.comment);

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
                <div className='flex'>
                    <EditComment comment={comment} handleEditToggle={handleEditToggle}/>
                    <DeleteComment comment={comment}/> 
                </div>
                
              </div>
              {/* // pour éditer on remet dans un form avec textarea et on lui attavche une fonction */}
                {editToggle ?  (<form onSubmit={handleEditForm}>
          {/* ne pas oublier de mettre un onChange pour réupérer la valeur */}
                <textarea autoFocus={true} defaultValue={comment.comment}  onChange={e => setEditContent(e.target.value)}></textarea>
                <button type='submit'>Edit</button>
                </form>) : (
              <p>{comment.comment}</p>)}
              <p className='font-light text-sm py-2'>
                {new Date(comment.date).toLocaleDateString()}
              </p>
            </div>
    );
};

export default Comment;