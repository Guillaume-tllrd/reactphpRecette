import { Search } from 'lucide-react';
import React from 'react';

const Searchbar = () => {
    return (
        <div className='relative flex items-center max-w-md mx-auto my-4'>  
        {/* pour centrer mx-auto */}
            <Search className='absolute left-3 text-gray-500' />
            <input
                type="search"
                id="searchbar"
                placeholder="Search your recipe..."
                className='pl-10 w-full p-2 border border-gray-300 rounded-3xl  focus:outline-none forcus:ring-2 focus:border-orange-500 '
            />
        </div>
    );
};

export default Searchbar;
