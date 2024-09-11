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
    
    useEffect(() => {
        dispatch(fetchComment(recipe.id))
    },[recipe.id,commentaire])
    // le useeffect est déclenché qd on ajoute cad qd on joue commentaire qui est le 1er tableau et ensuite cela passe à commentsByrecipe et donc il faut jouer recipe.id pour faire afficher la data 
    
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