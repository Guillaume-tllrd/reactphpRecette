import React from 'react';
import { Menu } from 'lucide-react';
import { User } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-gray-100 p-4">
            <div className='flex justify-between items-center'>
                <Menu className="text-gray-700 w-6 h-6"/>
                <h1 className='text-orange-500 text-lg font-bold'>La cuisine qu'on aime</h1>
                <User className="text-gray-700 w-6 h-6"/>
            </div>
        </header>
    );
};

export default Header;
