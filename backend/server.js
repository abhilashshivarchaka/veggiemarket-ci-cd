const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://mongo:27017/veggiemarket', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    description: String,
    image: String,
    category: String
});

const Order = mongoose.model('Order', {
    products: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number
    }],
    customer: {
        name: String,
        email: String,
        phone: String,
        address: String
    },
    orderId: String,
    status: { type: String, default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/api/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.json(newProduct);
});

app.post('/api/orders', async (req, res) => {
    const order = new Order({
        ...req.body,
        orderId: `ORD-${Date.now()}`
    });
    await order.save();
    console.log(`New order received: ${order.orderId}`);
    res.json({ success: true, orderId: order.orderId });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});