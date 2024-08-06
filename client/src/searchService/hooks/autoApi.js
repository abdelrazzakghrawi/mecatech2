// src/api/autoApi.js
import axios from 'axios';

export const fetchMarques = async () => {
    try {
        const response = await axios.get('http://localhost:3003/api/auto/marques');
        return response.data;
    } catch (error) {
        console.error('Error fetching marques:', error);
        throw error;
    }
};

export const fetchModels = async (marque) => {
    try {
        const response = await axios.get(`http://localhost:3003/api/auto/${marque}/models`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
    
};

export const fetchDetails = async (marque, model , years) => {
    try {
        console.log(`http://localhost:3003/api/auto/${marque}/${model} ${years}/details`)
        const response = await axios.get(`http://localhost:3003/api/auto/${marque}/${model}/${years}/details`);
        return response.data;
    } catch (error) {
        console.error('Error fetching details:', error);
        throw error;
    }
};