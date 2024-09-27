// ProductManagement.js
import React from 'react';

const ProductManagement = ({ products, setProducts }) => {
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleEdit = (id) => {
    // Implement your edit logic here
    // You might want to set the selected product in the state for editing
  };

  return (
    <div className="card">
      <h2>Products List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>
                <img src={product.productImage} alt="Product" style={{ width: '50px', height: '50px' }} />
              </td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
