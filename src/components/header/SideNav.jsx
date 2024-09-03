import { useSelector } from 'react-redux';
import { X, EggFried, Utensils, CakeSlice, Sandwich, ChefHat } from 'lucide-react'; // Importing X icon from lucide-react
import { Link } from "react-router-dom"
const Sidenav = ({toggleMenuBurger, visible}) => {

    const user = useSelector((state) => state.userReducer)

    return (
        <>
            <div className={`fixed top-0 bg-white left-0 h-full transition-transform duration-500 ease-out ${visible ? 'translate-x-0' : '-translate-x-full'} w-60 p-4 shadow-lg z-50`}>
                <button onClick={toggleMenuBurger} className="absolute top-4 right-4 text-black hover:text-gray-400">
                    <X className="w-6 h-6" />
                </button>
                <nav className="mt-12">
                    <ul className="space-y-4">
                        {user && user.id ? (<li className='flex h-[48px] bg-gray-200 items-center justify-center gap-2 text-center font-bold p-2 mb-10 '><ChefHat/> Welcome back {user.firstname}! </li>) : (<li className='flex h-[48px] bg-gray-200 items-center justify-center gap-2 text-center font-bold p-2 mb-10 '> Welcome !</li>) }
                        

                       <li className='flex h-[48px] items-center hover:bg-slate-200 hover:text-orange-500'><Link className='flex gap-2 pl-2 text-lg' to='/'> <EggFried/> Breakfast</Link></li>

                       <li className='flex h-[48px] bg-gray-50 items-center hover:bg-slate-200 hover:text-white'><Link className='flex gap-2 pl-2 text-lg' to='/'> <Utensils/>Main</Link></li>

                       <li className='flex h-[48px] items-center hover:bg-slate-200 hover:text-orange-500'><Link className='flex gap-2 pl-2 text-lg' to='/'> <CakeSlice/> Dessert</Link></li>

                       <li className='flex h-[48px] bg-gray-50 items-center hover:bg-slate-200 hover:text-white'><Link className='flex gap-2 pl-2 text-lg' to='/'> <Sandwich/>Appetizer</Link></li>
                    </ul>
                    
                </nav>
            </div>

           
        </>
    );
};

export default Sidenav;
