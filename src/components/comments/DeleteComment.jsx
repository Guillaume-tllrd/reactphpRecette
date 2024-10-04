import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../Redux/actions/comment.actions';

const DeleteComment = ({comment}) => {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleDeleteComment = () => {
        dispatch(deleteComment(comment.id))
    }

    return (
        <div>
        <button onClick={handleDeleteComment}>
            {user && user.role === "admin"  && 
            <Trash2 className='transition-transform transform hover:scale-110'/> }
        </button>
        </div>
    );
};

export default DeleteComment;