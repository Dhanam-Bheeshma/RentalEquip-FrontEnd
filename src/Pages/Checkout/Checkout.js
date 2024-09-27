import React, { useState, useEffect } from 'react';
import './checkout.css'; 
import axios from 'axios';

// const API_URL = 'https://rent-bk-siva.onrender.com';
const API_URL = 'http://localhost:5000';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(0);
  const [address, setAddress] = useState({
    name: '',
    address: '',
    phoneNo: '',
    pincode: '',
  });

  const fetchUserCarts = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await axios.get(`${API_URL}/cart/${userId}`);
        const cartItems = response.data.products;  // Access the 'products' array from the cart response

        if (cartItems && cartItems.length > 0) {
          const userProducts = await Promise.all(cartItems.map(async (item) => {
            const productResponse = await axios.get(`${API_URL}/product/${item.id}`);
            const product = productResponse.data;
            return {
              id: product._id,
              name: product.name,
              price: product.price,
              quantity: item.quantity,
              total: product.price * item.quantity,
            };
          }));

          setProducts(userProducts);

          const totalValue = userProducts.reduce((acc, product) => acc + product.total, 0);
          setTotalCartValue(totalValue);
        }
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserCarts();
  }, []);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && products.length > 0 && totalCartValue > 0) {
      try {
        const response = await axios.post(`${API_URL}/checkout`, {
          userId,
          products,
          address,
        });
        console.log('Order placed successfully:', response.data);
      } catch (error) {
        console.error('Error proceeding to payment:', error);
      }
    } else {
      console.log('Please ensure cart and address details are correct.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout Page</h1>
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-bold mb-2">Products</h2>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.id} className="flex justify-between mb-2">
                <span className="text-lg">{product.name}</span>
                <span className="text-lg">Quantity: {product.quantity}</span>
                <span className="text-lg">Price: ${product.price.toFixed(2)}</span>
                <span className="text-lg">Total: ${product.total.toFixed(2)}</span>
              </li>
            ))
          ) : (
            <li className="text-lg">No products in the cart.</li>
          )}
        </ul>
      </div>
      <div className="flex justify-between mb-4 font-bold">
        <span className="text-2xl">Total Cart Value:</span>
        <span className="text-2xl">${totalCartValue.toFixed(2)}</span>
      </div>
      <div className="flex flex-col mb-4">
        <h2 className="text-2xl font-bold mb-2">Address</h2>
        <form>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="name">Name</label>
            <input
              className="block w-full p-2 border border-gray-300 rounded"
              type="text"
              id="name"
              name="name"
              value={address.name}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="address">Address</label>
            <input
              className="block w-full p-2 border border-gray-300 rounded"
              type="text"
              id="address"
              name="address"
              value={address.address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="phoneNo">Phone No</label>
            <input
              className="block w-full p-2 border border-gray-300 rounded"
              type="text"
              id="phoneNo"
              name="phoneNo"
              value={address.phoneNo}
              onChange={handleAddressChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="pincode">Pincode</label>
            <input
              className="block w-full p-2 border border-gray-300 rounded"
              type="text"
              id="pincode"
              name="pincode"
              value={address.pincode}
              onChange={handleAddressChange}
            />
          </div>
        </form>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleProceedToPayment}
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
