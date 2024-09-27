import React, { useState } from 'react';

const ProductManagement = ({ products, setProducts }) => {
  const [newProduct, setNewProduct] = useState({ productName: '', productPrice: '', productCategory: '', productImage: '' });
  const [editProductId, setEditProductId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, productImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrEditProduct = () => {
    if (editProductId) {
      console.log('Editing product:', newProduct.productName, newProduct.productPrice, newProduct.productImage);
      setProducts(products.map((product) => (product.id === editProductId ? { ...newProduct, id: editProductId } : product)));
    } else {
      console.log('Adding new product:', newProduct.productName, newProduct.productPrice, newProduct.productImage);
      setProducts([...products, { id: products.length + 1, ...newProduct }]);
    }
    setNewProduct({ productName: '', productPrice: '', productCategory: '', productImage: '' });
    setEditProductId(null);
  };

  const handleEditProduct = (product) => {
    setNewProduct(product);
    setEditProductId(product.id);
    console.log('Preparing to edit product:', product.productName, product.productPrice, product.productImage);
  };

  const handleDeleteProduct = (id) => {
    console.log('Deleting product with ID:', id);
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div>
      <h2>{editProductId ? 'Edit Product' : 'Add New Product'}</h2>
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        className="input-field"
        value={newProduct.productName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="productPrice"
        placeholder="Rent Per Day"
        className="input-field"
        value={newProduct.productPrice}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="productCategory"
        placeholder="Product Category"
        className="input-field"
        value={newProduct.productCategory}
        onChange={handleInputChange}
      />
      <input
        type="file"
        name="productImage"
        className="input-field"
        onChange={handleImageChange}
      />
      {newProduct.productImage && (
        <img src={newProduct.productImage} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
      )}
      <button className="button" onClick={handleAddOrEditProduct}>
        {editProductId ? 'Update Product' : 'Add Product'}
      </button>

      <div className="card">
        <h2>Products List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productCategory}</td>
                <td>
                  <img src={product.productImage} alt="Product" style={{ width: '50px', height: '50px' }} />
                </td>
                <td>
                  <button onClick={() => handleEditProduct(product)}>Edit</button>
                  <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
