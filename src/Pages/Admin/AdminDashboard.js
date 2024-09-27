import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const API_URL = 'https://rentalequip-backend.onrender.com'; // Your API URL

// AddProduct Component
const AddProduct = ({ onProductAdded }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [pricePerDay, setPricePerDay] = useState('');
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const price = parseFloat(pricePerDay);
            if (isNaN(price)) {
                setMessage('Price per Day must be a valid number.');
                return;
            }

            const response = await axios.post(`${API_URL}/add-product`, {
                name,
                category,
                pricePerDay: price,
                image,
            });

            setMessage('Product added successfully!');
            onProductAdded(response.data);
            resetForm();
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error adding product';
            setMessage(errorMsg);
        }
    };

    const resetForm = () => {
        setName('');
        setCategory('');
        setPricePerDay('');
        setImage('');
    };

    return (
        <div className="card">
            <h2 className="header">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <input
                    type="number"
                    className="input-field"
                    placeholder="Price per Day"
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                <button type="submit" className="button">Add Product</button>
            </form>
            {message && <p className="notification">{message}</p>}
        </div>
    );
};

// ProductList Component
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', category: '', pricePerDay: '', image: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${API_URL}/products`);
                setProducts(response.data);
            } catch (error) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData(product);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            setError('Error deleting product');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                const response = await axios.put(`${API_URL}/products/${editingProduct._id}`, formData);
                setProducts(products.map(product => product._id === response.data._id ? response.data : product));
                setEditingProduct(null);
            } else {
                const response = await axios.post(`${API_URL}/add-product`, formData);
                setProducts([...products, response.data]);
            }
            resetForm();
        } catch (error) {
            setError('Error saving product');
        }
    };

    const resetForm = () => {
        setFormData({ name: '', category: '', pricePerDay: '', image: '' });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="notification">{error}</p>;

    return (
        <div className="main-content">
            <h2 className="header">Product List</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input-field"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    className="input-field"
                    placeholder="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                />
                <input
                    type="number"
                    className="input-field"
                    placeholder="Price per Day"
                    value={formData.pricePerDay}
                    onChange={(e) => setFormData({ ...formData, pricePerDay: e.target.value })}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            setFormData({ ...formData, image: reader.result });
                        };
                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    }}
                />
                <button type="submit" className="button">{editingProduct ? 'Update Product' : 'Add Product'}</button>
            </form>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {products.map(product => (
                    <div key={product._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3>{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>Price per Day: ${product.pricePerDay}</p>
                            {product.image && <img src={product.image} alt={product.name} style={{ width: '100px' }} />}
                        </div>
                        <div>
                            <button className="button" onClick={() => handleEdit(product)}>Edit</button>
                            <button className="button" onClick={() => handleDelete(product._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Main AdminDashboard Component
const AdminDashboard = () => {
    const handleProductAdded = (newProduct) => {
        // Logic to handle when a new product is added (if needed)
    };

    return (
        <div className="flex">
            <div className="sidebar">
                <h2 className="header">Admin Panel</h2>
                <ul>
                    <li>Dashboard</li>
                    
                </ul>
            </div>
            <div className="main-content">
                <h1>Admin Dashboard</h1>
                <AddProduct onProductAdded={handleProductAdded} />
                <ProductList />
            </div>
        </div>
    );
};

export default AdminDashboard;
