import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className='w-full h-20 bg-gray-600 flex items-center'>
                <ul className='flex justify-center items-center gap-5 mx-auto'>
                    <li className='flex items-center'><Instagram className="text-white w-6 h-6 cursor-pointer transition-transform transform hover:scale-110 hover:text-pink-500" /></li>
                    <li className='flex items-center'><Twitter className="text-white w-6 h-6 cursor-pointer transition-transform transform hover:scale-110 hover:text-blue-300" /></li>
                    <li className='flex items-center'><Facebook className="text-white w-6 h-6 cursor-pointer transition-transform transform hover:scale-110 hover:text-blue-700" /></li>
                </ul>
            </div>
            <div className='bg-gray-800 py-4 '>
                <div className='flex flex-wrap justify-around text-white text-sm '>
        {/* Quick Links */}
                    <div>
                        <h3 className='font-bold mb-2'>Quick Links</h3>
                        <ul>
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>

        {/* Newsletter Signup */}
        <div>
            <h3 className='font-bold mb-2'>Newsleter</h3>
            <form>
                <input type="email" placeholder="Enter your email" className='p-2 rounded text-gray-800 focus:border-orange-500 '/>
                <button className='bg-rose-500 text-white p-2 rounded mt-2 hover:bg-rose-600'>Sign Up</button>
            </form>
        </div>

        {/* Popular Categories */}
        <div>
            <h3 className='font-bold mb-2'>Popular Categories</h3>
            <ul>
                <li><Link to='/recipes/breakfast' className="hover:underline">Breakfast</Link></li>
                <li><Link to='/recipes/main' className="hover:underline">Main</Link></li>
                <li><Link to='/recipes/dessert' className="hover:underline">Dessert</Link></li>
                <li><Link to='/recipes/appetizer' className="hover:underline">Appetizer</Link></li>
            </ul>
        </div>

        {/* Recent Posts */}
        <div>
            <h3 className='font-bold mb-2'>Recent Recipes</h3>
            <ul>
                <li><a href="#" className="hover:underline">Recipe 1</a></li>
                <li><a href="#" className="hover:underline">Recipe 2</a></li>
                <li><a href="#" className="hover:underline">Recipe 3</a></li>
            </ul>
        </div>
        
    </div>
    <p className='text-center pt-3 text-sm text-white'> © 2024 Guillaume TILLARD, Onlineformapro</p>
</div>

        </footer>
    );
};

export default Footer;
