import Sidenav from '../components/back-end/Sidenav';
import AddRecipe from '../components/back-end/AddRecipe';
import Logo from '../components/back-end/Logo';

const CreateRecipe = () => {
    return (
        <div className="flex h-screen bg-amber-100">
            <Sidenav />
            <div className="flex flex-col w-full">
                <div className="flex justify-center items-center mt-4 md:translate-x-28">
                    <Logo />
                </div>
                <div className="flex justify-center items-center">
                    <AddRecipe />
                </div>
            </div>
        </div>
    );
};

export default CreateRecipe;
