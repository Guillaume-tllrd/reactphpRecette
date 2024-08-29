import React, { useState } from 'react';
import { X } from 'lucide-react'; // Importing X icon from lucide-react

const Sidenav = ({toggleMenuBurger, visible}) => {

    return (
        <>
            <div className={`fixed top-0 bg-white left-0 h-full transition-transform duration-500 ease-out ${visible ? 'translate-x-0' : '-translate-x-full'} w-60 p-4 shadow-lg z-50`}>
                <button onClick={toggleMenuBurger} className="absolute top-4 right-4 text-black hover:text-gray-400">
                    <X className="w-6 h-6" />
                </button>
                <nav className="mt-12">
                    <ul className="space-y-4">
                        <li>
                            <a href="" className="block text-lg hover:text-gray-400">Contact Us</a>
                        </li>
                        <li>
                            <a href="" className="block text-lg hover:text-gray-400">Breakfast</a>
                        </li>
                        <li>
                            <a href="" className="block text-lg hover:text-gray-400">Main</a>
                        </li>
                        <li>
                            <a href="" className="block text-lg hover:text-gray-400">Dessert</a>
                        </li>
                        <li>
                            <a href="" className="block text-lg hover:text-gray-400">Appetizer</a>
                        </li>
                    </ul>
                </nav>
            </div>

           
        </>
    );
};

export default Sidenav;
