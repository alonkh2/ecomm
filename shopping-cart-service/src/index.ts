import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("hello from shopping cart")
});

const PORT = process.env.SHOPPING_CART_PORT || 5000;

app.listen(PORT, () => {
    console.log(`shopping cart service is running on port ${PORT}`)
});