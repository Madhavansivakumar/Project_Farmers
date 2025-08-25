import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnifiedListings = () => {
    const [listings, setListings] = useState({ demands: [], products: [] });

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/unified');
                setListings(res.data);
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        };
        fetchListings();
    }, []);

    return (
        <>
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .demand-card {
                    border: 1px solid #ccc;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    background: #fff3cd;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    animation: fadeIn 0.5s ease-in-out;
                    transition: transform 0.3s;
                }

                .demand-card:hover {
                    transform: translateY(-5px);
                }

                .demand-card h3 {
                    color: #856404;
                    font-family: 'Arial, sans-serif';
                    margin-bottom: 0.5rem;
                }

                .demand-card p {
                    color: #333;
                    font-family: 'Arial, sans-serif';
                    margin-bottom: 0.5rem;
                }

                .product-card {
                    border: 1px solid #ccc;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    background: #f8d7da;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    animation: fadeIn 0.5s ease-in-out;
                    transition: transform 0.3s;
                }

                .product-card:hover {
                    transform: translateY(-5px);
                }

                .product-card h3 {
                    color: #721c24;
                    font-family: 'Arial, sans-serif';
                    margin-bottom: 0.5rem;
                }

                .product-card p {
                    color: #333;
                    font-family: 'Arial, sans-serif';
                    margin-bottom: 0.5rem;
                }

                .product-card img {
                    width: 100px;
                    height: auto;
                    border-radius: 4px;
                    margin-bottom: 1rem;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                `}
            </style>
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', background: 'linear-gradient(135deg, #a2e3ff 0%, #c8efff 100%)' }}>
                <h2 style={{ textAlign: 'center', color: '#007B8F', fontFamily: 'Arial, sans-serif' }}>Unified Listings</h2>
                <div style={{ marginTop: '2rem' }}>
                    <h3>Demand Postings</h3>
                    {listings.demands.map((demand) => (
                        <div key={demand._id} className="demand-card">
                            <h3>{demand.productType}</h3>
                            <p>Quantity Needed: {demand.quantityNeeded}</p>
                            <p>Delivery Date: {new Date(demand.deliveryDate).toLocaleDateString()}</p>
                            <p>Posted by: {demand.user.name}</p>
                            <p>Contact: {demand.user.mobileNumber}</p>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <h3>Product Listings</h3>
                    {listings.products.map((product) => (
                        <div key={product._id} className="product-card">
                            <h3>{product.type}</h3>
                            <p>Quantity: {product.quantity}</p>
                            <p>Market Date: {new Date(product.marketDate).toLocaleDateString()}</p>
                            {product.photo && <img src={`http://localhost:5000/${product.photo}`} alt={product.type} />}
                            <p>Posted by: {product.user.name}</p>
                            <p>Contact: {product.user.mobileNumber}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default UnifiedListings;
