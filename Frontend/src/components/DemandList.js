import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddDemand from './AddDemand';
import EditDemand from './EditDemand';

const DemandList = () => {
    const [demands, setDemands] = useState([]);
    const [editingDemand, setEditingDemand] = useState(null);

    useEffect(() => {
        const fetchDemands = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/demands');
                setDemands(res.data);
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        };
        fetchDemands();
    }, []);

    const handleAddDemand = (newDemand) => {
        setDemands([...demands, newDemand]);
    };

    const handleEditDemand = (updatedDemand) => {
        setDemands(demands.map(demand => (demand._id === updatedDemand._id ? updatedDemand : demand)));
        setEditingDemand(null);
    };

    const handleDeleteDemand = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                await axios.delete(`http://localhost:5000/api/demands/${id}`);
                setDemands(demands.filter(demand => demand._id !== id));
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

                .demand-card {
                    border: 1px solid #ccc;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    animation: fadeIn 0.5s ease-in-out;
                    transition: transform 0.3s;
                }

                .demand-card:hover {
                    transform: translateY(-5px);
                }

                .demand-card h3 {
                    color: #007B8F;
                    font-family: 'Arial, sans-serif';
                    margin-bottom: 0.5rem;
                }

                .demand-card p {
                    color: #333;
                    font-family: 'Arial, sans-serif';
                    margin-bottom: 0.5rem;
                }

                .demand-card button {
                    background-color: #007B8F;
                    color: #fff;
                    padding: 0.5rem;
                    margin-right: 0.5rem;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    font-family: 'Arial, sans-serif';
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }

                .demand-card button:hover {
                    background-color: #005f6f;
                }

                .demand-card button.delete {
                    background-color: #e53935;
                }

                .demand-card button.delete:hover {
                    background-color: #b71c1c;
                }
                `}
            </style>
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', background: 'linear-gradient(135deg, #a2e3ff 0%, #c8efff 100%)' }}>
                <h2 style={{ textAlign: 'center', color: '#007B8F', fontFamily: 'Arial, sans-serif' }}>Demand Postings</h2>
                <AddDemand onAddDemand={handleAddDemand} />
                <div style={{ marginTop: '2rem' }}>
                    {demands.map((demand) => (
                        <div key={demand._id} className="demand-card">
                            <h3>{demand.productType}</h3>
                            <p>Quantity Needed: {demand.quantityNeeded}</p>
                            <p>Delivery Date: {new Date(demand.deliveryDate).toLocaleDateString()}</p>
                            <p>Posted by: {demand.user.name}</p>
                            <p>Contact: {demand.user.mobileNumber}</p>
                            <button onClick={() => setEditingDemand(demand)}>
                                Edit
                            </button>
                            <button onClick={() => handleDeleteDemand(demand._id)} className="delete">
                                Delete
                            </button>
                        </div>
                    ))}
                    {editingDemand && <EditDemand demand={editingDemand} onEditDemand={handleEditDemand} />}
                </div>
            </div>
        </>
    );
};

export default DemandList;
