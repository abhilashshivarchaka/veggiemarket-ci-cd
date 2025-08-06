import React, { useState } from 'react';
import './AdminDashboard.css';

function AddVegetable({ onAdd }) {
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

    const handleAddProduct = (e) => {
        e.preventDefault();
        onAdd(newProduct);
        setNewProduct({ name: '', price: '', image: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    return (
        <div className="add-product">
            <h3>Add New Vegetable</h3>
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Vegetable</button>
            </form>
        </div>
    );
}

export default AddVegetable;