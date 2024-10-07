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
            {(user && (user.role === "admin" || user.id === comment.user_id)) && (
        <button onClick={handleDeleteComment} className="rounded-md border p-1 hover:bg-gray-100">
                <Trash2 className="w-5"/>
        </button>)}
        </div>
    );
};

export default DeleteComment;