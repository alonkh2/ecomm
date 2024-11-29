import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("hello from payments")
});

const PORT = process.env.PAYMENT_PORT || 5002;

app.listen(PORT, () => {
    console.log(`payment service is running on port ${PORT}`)
});