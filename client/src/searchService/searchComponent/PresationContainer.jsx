import React, { useState } from 'react';
import PrestationModel from './PrestationModel';

const PresationContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="container mx-auto flex items-center justify-center h-screen">
            <button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                Show Categories
            </button>
            {isModalOpen && <PrestationModel onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

export default PresationContainer;
