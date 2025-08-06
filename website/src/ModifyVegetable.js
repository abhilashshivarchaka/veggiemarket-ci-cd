import React, { useState } from 'react';
import './AdminDashboard.css';

function ModifyVegetable({ products, onUpdate }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleSelectChange = (e) => {
        const productId = e.target.value;
        const product = products.find(p => p._id === productId);
        setSelectedProduct(product);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct({ ...selectedProduct, [name]: value });
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        onUpdate(selectedProduct);
        setSelectedProduct(null);
    };

    return (
        <div className="modify-product">
            <h3>Modify Existing Vegetable</h3>
            <select onChange={handleSelectChange} value={selectedProduct ? selectedProduct._id : ''}>
                <option value="" disabled>Select a vegetable</option>
                {products.map(product => (
                    <option key={product._id} value={product._id}>{product.name}</option>
                ))}
            </select>
            {selectedProduct && (
                <form onSubmit={handleUpdateProduct}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={selectedProduct.name}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={selectedProduct.price}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={selectedProduct.image}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Update Vegetable</button>
                </form>
            )}
        </div>
    );
}

export default ModifyVegetable;