import { Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';

const EditComment = ({comment, handleEditToggle}) => {
    const user = useSelector((state) => state.userReducer);
    
    return (
        <div>
            <button onClick={handleEditToggle}>
            {/* si l'utilisateur connecté est égal à l'id du comment alors tu m'affiches "pencil" pour edit */}
            {user && user.id == comment.user_id &&
            <Pencil className='transition-transform transform hover:scale-110'/>} 
            </button>
        </div>
    );
};

export default EditComment;