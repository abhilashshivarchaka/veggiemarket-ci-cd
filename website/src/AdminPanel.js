import React, { useState } from 'react';

const AdminPanel = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: JSON.stringify(product)
        })
        .then(res => res.json())
        .then(data => alert('Product added successfully!'));
    };

    return (
        <div className="admin-panel">
            <h2>Add New Vegetable</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Vegetable Name"
                    value={product.name}
                    onChange={(e) => setProduct({...product, name: e.target.value})}
                    required
                />
                <input
                    type="number"
                    placeholder="Price per kg"
                    value={product.price}
                    onChange={(e) => setProduct({...product, price: e.target.value})}
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={product.image}
                    onChange={(e) => setProduct({...product, image: e.target.value})}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AdminPanel;