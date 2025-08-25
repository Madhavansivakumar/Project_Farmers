import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

const RegisterWrapper = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleRegistrationSuccess = (role) => {
        if (role === 'Farmer') {
            setSuccessMessage('Welcome!! Farmer you are Successfully Registered');
            navigate('/products'); // Navigate to ProductList page
        } else if (role === 'Entrepreneur') {
            setSuccessMessage('Welcome!! Entrepreneur you are Successfully Registered');
            navigate('/demands'); // Navigate to DemandList page
        }
    };

    return (
        <>
            <Register onRegistrationSuccess={handleRegistrationSuccess} />
            {successMessage && <p style={{ color: 'green', fontFamily: 'Arial, sans-serif' }}>{successMessage}</p>}
        </>
    );
};

export default RegisterWrapper;
