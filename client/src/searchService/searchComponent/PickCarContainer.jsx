// src/components/SearchBarContainer.js

import React, { useState } from 'react';
import SearchBarButton from './PickCar';
import SearchBarModal from './PickCarModel';

const PickCarContainer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <SearchBarButton onOpen={handleOpen} />
            <SearchBarModal isOpen={isOpen} onClose={handleClose} />
        </div>
    );
};

export default PickCarContainer;
