// src/components/SearchBarButton.js

import React from 'react';

const pickCar = ({ onOpen }) => {
    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center">
                <button onClick={onOpen} className="bg-white text-black px-4 py-2 border-2">
                    Choisissez un véhicule
                </button>
            </div>
        </div>
    );
};

export default pickCar;
