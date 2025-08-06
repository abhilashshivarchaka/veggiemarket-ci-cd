import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import AddVegetable from './AddVegetable';
import ModifyVegetable from './ModifyVegetable';
import WelcomePage from './WelcomePage';

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [activePage, setActivePage] = useState('welcome');

    useEffect(() => {
        fetch('http://localhost:5001/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const handleAddProduct = (newProduct) => {
        fetch('http://localhost:5001/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct)
        })
        .then(res => res.json())
        .then(data => {
            setProducts([...products, data]);
        });
    };

    const handleUpdateProduct = (updatedProduct) => {
        fetch(`http://localhost:5001/api/products/${updatedProduct._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct)
        })
        .then(res => res.json())
        .then(data => {
            setProducts(products.map(p => p._id === data._id ? data : p));
        });
    };

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <button onClick={() => setActivePage('welcome')}>Welcome</button>
                <button onClick={() => setActivePage('add')}>Add New Vegetable</button>
                <button onClick={() => setActivePage('modify')}>Modify Existing Vegetable</button>
            </div>
            <div className="content">
                {activePage === 'welcome' && <WelcomePage />}
                {activePage === 'add' && <AddVegetable onAdd={handleAddProduct} />}
                {activePage === 'modify' && <ModifyVegetable products={products} onUpdate={handleUpdateProduct} />}
            </div>
        </div>
    );
}

export default AdminDashboard;