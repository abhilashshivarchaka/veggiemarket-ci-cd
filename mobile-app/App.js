import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, Alert } from 'react-native';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => setProducts(response.data));
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

        axios.post('http://localhost:5000/api/orders', orderData)
            .then(response => {
                Alert.alert(
                    'Order Placed',
                    `Your Order ID: ${response.data.orderId}`,
                    [{ text: 'OK' }]
                );
                setCart([]);
            });
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Fresh Vegetables</Text>
            <FlatList
                data={products}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <View style={{ margin: 10 }}>
                        <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
                        <Text>{item.name}</Text>
                        <Text>₹{item.price}</Text>
                        <Button title="Add to Cart" onPress={() => addToCart(item)} />
                    </View>
                )}
            />
            <View style={{ marginTop: 20 }}>
                <Text>Your Cart ({cart.length})</Text>
                <Button title="Place Order" onPress={placeOrder} />
            </View>
        </View>
    );
};

export default App;