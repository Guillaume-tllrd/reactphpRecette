import React from 'react';
import Sidenav from '../components/back-end/Sidenav';
import Logo from '../components/back-end/Logo';

const Dashboard = () => {
    return (
        <div className="flex h-screen bg-amber-100">
        <Sidenav />
        <div className="flex flex-col w-full">
            <div className="flex justify-center items-center mt-4 md:translate-x-28">
                <Logo />
            </div>
            
        </div>
    </div>
    );
};

export default Dashboard;