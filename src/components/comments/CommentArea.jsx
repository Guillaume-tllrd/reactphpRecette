import { MessageSquareText } from 'lucide-react';
import CommentForm from './commentForm';
import Comment from './comment';

const CommentArea = ({recipe}) => {
    return (
        <div className='py-5'>
            <div className='flex gap-1 mx-4'>
                <MessageSquareText className='text-lg text-amber-700' />
                <h1 className='font-scope text-2xl'> Comments()</h1>
                </div>
            <CommentForm recipe={recipe} />
            <Comment/>
        </div>
    );
};

export default CommentArea;