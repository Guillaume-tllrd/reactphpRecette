import { MessageSquareText } from 'lucide-react';
import CommentForm from './commentForm';
import { useDispatch, useSelector } from 'react-redux';
import CommentsList from './CommentsList';
import { useEffect } from 'react';
import { fetchComment } from '../../Redux/actions/comment.actions';

const CommentArea = ({recipe}) => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.commentReducer.commentsByRecipe);
    const commentaire = useSelector((state) => state.commentReducer.comments)
    console.log(commentaire);
    
    useEffect(() => {
        dispatch(fetchComment(recipe.id))
    },[commentaire])
    // une fois que commentaire change ca met automatiquement le comentaire a jour par contre qd on refresh ca nous marque tous les comment reunie donc il faurdiat mettre ensuite dispatch, recipe.id en dependance
    return (
        <div className='py-5'>
            <div className='flex gap-1 mx-4'>
                <MessageSquareText className='text-lg text-amber-700' />
                <h1 className='font-scope text-2xl'> Comments({comments.length == null ? 0 : comments.length})</h1>
                </div>
            <CommentForm recipe={recipe} />
            <CommentsList comments={comments}/>
        </div>
    );
};

export default CommentArea;