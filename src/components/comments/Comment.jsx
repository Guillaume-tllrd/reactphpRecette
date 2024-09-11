import React from 'react';

const Comment = () => {
    return (
        <div className=' border-b mx-4 my-2'>
            <div className='flex gap-2'>
                <div className='flex justify-center items-center -translate-y-2 h-10 w-10 rounded-full bg-orange-300'><span className='font-bold'>B</span></div>
                <h1 className='font-semibold'>Username</h1>
            </div>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ad voluptatem necessitatibus dignissimos. Neque, facilis error aspernatur eaque beatae.?</p>
            <p className='font-light text-sm py-2'>01/02/97 16:15</p>
        </div>
    );
};

export default Comment;