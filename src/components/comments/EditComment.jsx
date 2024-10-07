import { Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';

const EditComment = ({comment, handleEditToggle}) => {
    const user = useSelector((state) => state.userReducer);
    
    return (
        <div>
            {user && user.id == comment.user_id &&
            <button onClick={handleEditToggle} className="rounded-md border p-1 hover:bg-gray-100">
            {/* si l'utilisateur connecté est égal à l'id du comment alors tu m'affiches "pencil" pour edit */}
            
            <Pencil className='w-5'/>
            </button>} 
        </div>
    );
};

export default EditComment;