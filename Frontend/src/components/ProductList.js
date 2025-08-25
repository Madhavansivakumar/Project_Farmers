import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error(err.response ? err.response.data : err.message);
            }
        };
        fetchProducts();
    }, []);
  
    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };
  
    const handleEditProduct = (updatedProduct) => {
        setProducts(products.map(product => (product._id === updatedProduct._id ? updatedProduct : product)));
        setEditingProduct(null);
    };

    const handleDeleteProduct = async (id) => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                setProducts(products.filter(product => product._id !== id));
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

                .product-card {
                    border: 1px solid #ccc;
                    padding: 1rem;
                    margin-bottom: 1rem;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    animation: fadeIn 0.5s ease-in-out;
                    transition: transform 0.3s;
                }

                .product-card:hover {
                    transform: translateY(-5px);
                }

                .product-card h3 {
                    color: #007B8F;
                    font-family: 'Arial, sans-serif';
                    margin-bottom: 0.5rem;
                }

                .product-card p {
                    color: #333;
                    font-family: 'Arial, sans-serif';
                    margin-bottom: 0.5rem;
                }

                .product-card button {
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

                .product-card button:hover {
                    background-color: #005f6f;
                }

                .product-card button.delete {
                    background-color: #e53935;
                }

                .product-card button.delete:hover {
                    background-color: #b71c1c;
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
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem', background: 'linear-gradient(135deg, #a2c4ff 0%, #c8e5ff 100%)' }}>
                <h2 style={{ textAlign: 'center', color: '#1f4e79', fontFamily: 'Arial, sans-serif' }}>Product Listings</h2>
                <AddProduct onAddProduct={handleAddProduct} />
                <div style={{ marginTop: '2rem' }}>
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <h3>{product.type}</h3>
                            <p>Quantity: {product.quantity}</p>
                            <p>Market Date: {new Date(product.marketDate).toLocaleDateString()}</p>
                            {product.photo && <img src={`http://localhost:5000/${product.photo}`} alt={product.type} />}
                            <p>Posted by: {product.user.name}</p>
                            <p>Contact: {product.user.mobileNumber}</p>
                            <button onClick={() => setEditingProduct(product)}>
                                Edit
                            </button>
                            <button onClick={() => handleDeleteProduct(product._id)} className="delete">
                                Delete
                            </button>
                        </div>
                    ))}
                    {editingProduct && <EditProduct product={editingProduct} onEditProduct={handleEditProduct} />}
                </div>
            </div>
        </>
    );
};

export default ProductList;
