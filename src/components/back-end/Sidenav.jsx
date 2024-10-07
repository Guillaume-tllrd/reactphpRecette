import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, X, House, CookingPot, Newspaper, ChefHat, Undo2 } from 'lucide-react';
import { useState } from 'react';
const Sidenav = () => {
    const user = useSelector((state) => state.userReducer)
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

    function toggleSidebar(){
        setVisible(!visible)
    }
    useEffect(() => {
        if (user.role !== "admin") {
            navigate("/"); 
        }
    }, [user, navigate]); // Utiliser useEffect est plus approprié qu'une fonction pour vérifier les permissions d'accès dès que le composant est monté. Pas besoin d'appeler une fonction dans le JSX
    
    return (
        <>
        <button onClick={toggleSidebar} className='md:hidden fixed top-4 left-4 hover:text-gray-400'><Menu/></button>
        <div className={`fixed h-full  bg-white w-60 p-4 shadow-lg transform transition-transform duration-500 ${
                visible ? 'translate-x-0' : '-translate-x-full' // Cacher la sidebar en dehors de l'écran quand elle est masquée
            } md:translate-x-0 md:block`}>
            <button  className="md:hidden absolute top-4 right-4 text-black hover:text-gray-400">
                    <X onClick={toggleSidebar} className="w-6 h-6" />
                </button>
            <nav className="mt-12">
                <ul >
                    <li className='flex h-[48px] bg-gray-200 items-center justify-center gap-2 text-center font-bold p-2 mb-10 '><ChefHat/> Hello {user.username}!</li>

                    <li className='flex h-[48px] items-center hover:bg-slate-200 hover:text-orange-500'><Link className='flex gap-2 pl-2 ' to='/'> <Undo2/>Back to the site</Link></li>

                    <li className='flex h-[48px] bg-gray-50 items-center hover:bg-slate-200 hover:text-white'><Link className='flex gap-2 pl-2' to='/dashboard'><House/> Dashboard</Link></li>

                    <li className='flex h-[48px] items-center hover:bg-slate-200 hover:text-orange-500'><Link className='flex gap-2 pl-2' to='/createRecipe'><CookingPot/>Create recipe</Link></li>

                    <li className='flex h-[48px] bg-gray-50 items-center hover:bg-slate-200 hover:text-white'><Link className='flex gap-2 pl-2' to='/createArticle'><Newspaper/>Create article</Link></li>
                    <li></li>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default Sidenav;