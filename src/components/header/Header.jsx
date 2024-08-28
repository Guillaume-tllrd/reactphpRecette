import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import Searchbar from './Searchbar';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className="p-4">
            <div className='flex justify-between items-center'>
                <Menu className="=" />
                <h1 className='text-orange-500 text-3xl font-bold italic font-playfair text-center'>La cuisine qu'on aime</h1>
                <Link to='/login'><User className="text-gray-700 w-6 h-6"/></Link>
            </div>
            <Searchbar/>
            <Navbar/>
        </header>
    );
};

export default Header;
