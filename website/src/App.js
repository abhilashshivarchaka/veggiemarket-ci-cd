import React, { useState, useEffect } from 'react';
import './App.css';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

function App() {
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const placeOrder = () => {
        const orderData = {
            products: cart.map(item => ({
                productId: item._id,
                quantity: 1
            })),
            customer: {
                name: "Customer Name",
                email: "customer@example.com",
                phone: "1234567890",
                address: "123 Main St"
            }
        };

        fetch('http://localhost:5001/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        })
        .then(res => res.json())
        .then(data => {
            alert(`Order placed! Your Order ID: ${data.orderId}`);
            setCart([]);
        });
    };

    return (
        <div className="App">
            {isAdminLoggedIn ? (
                <AdminDashboard />
            ) : (
                <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
            )}
        </div>
    );
}

export default App;