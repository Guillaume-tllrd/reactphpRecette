import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    // Style object for active state
 
    return (
        <div className='flex justify-around items-center font-scope'>
            <ul className='relative flex space-x-4'>
                <li>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            `relative ${isActive ? 'nav-active' : 'text-gray-500'} p-2`
                        }
                        
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/recipes'
                       className={({ isActive }) =>
                            `relative ${isActive ? 'nav-active' : 'text-gray-500'} p-2`
                        }
                    >
                        Recipes
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/articles'
                        className={({ isActive }) =>
                            `relative ${isActive ? 'nav-active' : 'text-gray-500'} p-2`
                        }
                    >
                        Articles
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/favoris'
                        className={({ isActive }) =>
                            `relative ${isActive ? 'nav-active' : 'text-gray-500'} p-2`}

                    >
                        Liked
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
