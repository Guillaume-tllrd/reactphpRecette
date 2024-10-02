import { Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';

const EditComment = ({comment}) => {
    const user = useSelector((state) => state.userReducer);
    
    return (
        <div>
            {/* si l'utilisateur connecté est égal à l'id du comment alors tu m'affiches "pencil" pour edit */}
            {user && user.id == comment.user_id &&
            <Pencil/>} 
        </div>
    );
};

export default EditComment;