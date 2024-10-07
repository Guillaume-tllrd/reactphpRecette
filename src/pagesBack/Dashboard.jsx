import Sidenav from '../components/back-end/Sidenav';
import Logo from '../components/back-end/Logo';
import RecipeTable from '../components/back-end/RecipeTable';


const Dashboard = () => {
    
    return (
        <div className="flex h-screen bg-amber-100">
        <Sidenav />
        <div className="flex flex-col w-full ">
            <div className="flex flex-col justify-center items-center mt-4 md:ml-64 mr-4">
                <Logo />
                <RecipeTable />
            </div>

        </div>
    </div>
    );
};

export default Dashboard;