import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';

// Base API URL
const API_URL = 'https://rentalequip-backend.onrender.com';

// Styles
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
    },
    productGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '15px',
    },
    productCard: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        textAlign: 'center',
    },
    productImage: {
        width: '100%', // Make the image responsive
        height: '150px', // Set a fixed height
        objectFit: 'cover', // Ensure the image covers the area
    },
    button: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 1000,
        width: '80%',
        maxHeight: '80%',
        overflowY: 'auto',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 999,
    },
    iconContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        margin: '20px 0', // Added margin for spacing
    },
    iconButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '24px',
    },
};

// Cart Component
const Cart = ({ cartItems, onRemoveFromCart, onQuantityChange, onCheckout, onClose }) => {
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.pricePerDay || 0) * (item.quantity || 1), 0);

    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        pinCode: '',
        mobileNumber: '',
    });

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle checkout form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission
        onCheckout(formData);
    };

    return (
        <>
            <div style={styles.modalOverlay} onClick={onClose}></div>
            <div style={styles.modal}>
                <button onClick={onClose} style={{ float: 'right', fontSize: '20px', cursor: 'pointer' }}>
                    &times; {/* Close icon */}
                </button>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>{item.name} (x{item.quantity || 1})</span>
                                <div>
                                    <button onClick={() => onQuantityChange(item._id, (item.quantity || 1) - 1)}>-</button>
                                    <button onClick={() => onQuantityChange(item._id, (item.quantity || 1) + 1)}>+</button>
                                </div>
                                <span>${(item.pricePerDay || 0) * (item.quantity || 1)}</span>
                                <button onClick={() => onRemoveFromCart(item._id)}>Remove</button>
                            </div>
                        ))}
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>

                        {/* Payment Form */}
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            <br />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                            <br />
                            <input
                                type="text"
                                name="pinCode"
                                placeholder="Pin Code"
                                value={formData.pinCode}
                                onChange={handleInputChange}
                                required
                            />
                            <br />
                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder="Mobile Number"
                                value={formData.mobileNumber}
                                onChange={handleInputChange}
                                required
                            />
                            <br />
                            <button type="submit">Make Payment</button>
                        </form>
                    </>
                )}
            </div>
        </>
    );
};

// Product Component
const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [userCarts, setUserCarts] = useState([]);

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

        const fetchUserCarts = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                try {
                    const response = await axios.get(`${API_URL}/cart/${userId}`);
                    setUserCarts(response.data.flatMap(cart => cart.products)); // Flattening products from all carts
                } catch (error) {
                    console.error('Error fetching user carts:', error);
                }
            }
        };

        fetchProducts();
        fetchUserCarts();
    }, []);

    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item._id === product._id);
            if (existingItem) {
                return prevCart.map(item => item._id === product._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        alert(`${product.name} added to cart!`);
    };

    const handleRemoveFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id));
    };

    const handleQuantityChange = (id, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(id);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item._id === id ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    const handleCheckout = async (formData) => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('User not logged in');
            return;
        }

        try {
            const amount = cart.reduce((sum, item) => sum + (item.pricePerDay || 0) * (item.quantity || 1), 0);

            const options = {
                key: 'rzp_test_ztFZKko9ufEjtq', // Replace with your Razorpay key ID
                amount: amount * 100, // Razorpay expects amount in paisa
                currency: 'INR',
                name: 'EquRent-dhanalakshmi',
                description: 'Payment for products',
                image: 'https://example.com/your_logo.png',
                handler: function (response) {
                    console.log('Payment successful:', response);
                    alert('Payment successful!');
                },
                prefill: {
                    name: formData.name,
                    contact: formData.mobileNumber,
                    email: '', // Add email if available
                },
                theme: {
                    color: '#F37254',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

            // Clear cart after successful payment
            setCart([]);
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    const handleViewCart = () => {
        setShowCart(true);
    };

    const handleCloseCart = () => {
        setShowCart(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Navbar />
            <div style={styles.iconContainer}>
                <button style={styles.iconButton} onClick={handleViewCart}>
                    <i className="fas fa-shopping-cart"></i> {/* Cart Icon */}
                </button>
                <button style={styles.iconButton} onClick={() => window.open('/previous-orders', '_blank')}>
                    <i className="fas fa-box"></i> {/* Orders Icon */}
                </button>
            </div>
            <div style={styles.container}>
                <h1>Product List</h1>
                <div style={styles.productGrid}>
                    {products.map(product => (
                        <div key={product._id} style={styles.productCard}>
                            <img src={product.image} alt={product.name} style={styles.productImage} /> {/* Display Product Image */}
                            <h2>{product.name}</h2>
                            <p>Price per day: ${product.pricePerDay}</p>
                            <button style={styles.button} onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
                {showCart && (
                    <Cart
                        cartItems={cart}
                        onRemoveFromCart={handleRemoveFromCart}
                        onQuantityChange={handleQuantityChange}
                        onCheckout={handleCheckout}
                        onClose={handleCloseCart}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Product;
