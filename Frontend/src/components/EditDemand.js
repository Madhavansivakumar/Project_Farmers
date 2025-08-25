import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditDemand = ({ demand, onEditDemand }) => {
    const [formData, setFormData] = useState({
        productType: '',
        quantityNeeded: '',
        deliveryDate: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            productType: demand.productType,
            quantityNeeded: demand.quantityNeeded,
            deliveryDate: new Date(demand.deliveryDate).toISOString().split('T')[0],
        });
    }, [demand]);

    const { productType, quantityNeeded, deliveryDate } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const res = await axios.put(`http://localhost:5000/api/demands/${demand._id}`, formData);
                onEditDemand(res.data);
                navigate('/listings'); // Navigate to UnifiedListings page
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        }
    };

    return (
        <>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                `}
            </style>
            <form onSubmit={onSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '10px', background: 'linear-gradient(135deg, #ffeb99 0%, #ffd699 100%)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', animation: 'fadeIn 1s ease-in-out, pulse 2s infinite' }}>
                <input
                    type="text"
                    placeholder="Product Type"
                    name="productType"
                    value={productType}
                    onChange={onChange}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s', fontFamily: 'Arial, sans-serif', color: '#333' }}
                />
                <input
                    type="number"
                    placeholder="Quantity Needed"
                    name="quantityNeeded"
                    value={quantityNeeded}
                    onChange={onChange}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s', fontFamily: 'Arial, sans-serif', color: '#333' }}
                />
                <input
                    type="date"
                    name="deliveryDate"
                    value={deliveryDate}
                    onChange={onChange}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s', fontFamily: 'Arial, sans-serif', color: '#333' }}
                />
                <button
                    type="submit"
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#45a049'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#4caf50'}
                >
                    Update Demand
                </button>
            </form>
        </>
    );
};

export default EditDemand;
