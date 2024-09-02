import { Link } from 'react-router-dom';
import { Menu, User, LogOut } from 'lucide-react';
import Searchbar from './Searchbar';
import Navbar from './Navbar';
import { useState } from 'react';
import Sidenav from './Sidenav';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionLogOut } from '../../Redux/actions/user.action';

const Header = () => {
    const [visible, setVisible] = useState(false);
    const user = useSelector((state) => state.userReducer)

    const dispatch = useDispatch();

    function toggleMenuBurger() {
        setVisible(!visible);
    }
    // on peut la mettre directement auclick en faisant une action flechée à l'intérieur
    // function logout() {
    //     dispatch(getSessionLogOut());
    // }
    return (
        <>
            <header className="p-4">
                <div className='flex justify-between items-center'>
                    <Menu onClick={toggleMenuBurger} className="hover:cursor-pointer" />
                    <h1 className='text-orange-500 text-3xl font-bold italic font-playfair text-center'>
                        La cuisine qu'on aime
                    </h1>
                    {/* ne pas oublier de mettre user.id sinon ca vérifie si user est non vide, il faut également le mettre dans le store pour un rendu sans refresh */}
                    {user && user.id ? (<button className="text-gray-700 w-6 h-6 transition-transform transform hover:scale-110"   onClick={() => dispatch(getSessionLogOut())} ><LogOut/></button>) : (
                        <Link to='/login'>
                        <User className="text-gray-700 w-6 h-6 transition-transform transform hover:scale-110" />
                    </Link>
                    )}
                </div>
                <Searchbar />
                <Navbar />
            </header>

            <Sidenav visible={visible} toggleMenuBurger={toggleMenuBurger} />
            {/* pour que la transition de durée se fasse, il ne faut pas mettre la condition visble pour le composant */}
        </>
    );
};

export default Header;
