import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("hello from orders")
});

const PORT = process.env.ORDERS_PORT || 5001;

app.listen(PORT, () => {
    console.log(`order service is running on port ${PORT}`)
});