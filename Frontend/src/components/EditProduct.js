import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditProduct = ({ product, onEditProduct }) => {
    const [formData, setFormData] = useState({
        type: '',
        quantity: '',
        marketDate: '',
    });
    const [photo, setPhoto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setFormData({
            type: product.type,
            quantity: product.quantity,
            marketDate: new Date(product.marketDate).toISOString().split('T')[0],
        });
    }, [product]);

    const { type, quantity, marketDate } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onFileChange = (e) => setPhoto(e.target.files[0]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const data = new FormData();
            data.append('type', type);
            data.append('quantity', quantity);
            data.append('marketDate', marketDate);
            if (photo) data.append('photo', photo);

            try {
                const res = await axios.put(`http://localhost:5000/api/products/${product._id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onEditProduct(res.data);
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
            <form onSubmit={onSubmit} style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '10px', background: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', animation: 'fadeIn 1s ease-in-out, pulse 2s infinite' }}>
                <input
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={type}
                    onChange={onChange}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s', fontFamily: 'Arial, sans-serif', color: '#333' }}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={onChange}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s', fontFamily: 'Arial, sans-serif', color: '#333' }}
                />
                <input
                    type="date"
                    name="marketDate"
                    value={marketDate}
                    onChange={onChange}
                    required
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s', fontFamily: 'Arial, sans-serif', color: '#333' }}
                />
                <input
                    type="file"
                    name="photo"
                    onChange={onFileChange}
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', borderRadius: '5px', border: '1px solid #ddd', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)', transition: 'border-color 0.3s', fontFamily: 'Arial, sans-serif', color: '#333' }}
                />
                <button
                    type="submit"
                    style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '5px', boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)', transition: 'background-color 0.3s', cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}
                    onMouseEnter={e => e.target.style.backgroundColor = '#45a049'}
                    onMouseLeave={e => e.target.style.backgroundColor = '#4caf50'}
                >
                    Update Product
                </button>
            </form>
        </>
    );
};

export default EditProduct;
