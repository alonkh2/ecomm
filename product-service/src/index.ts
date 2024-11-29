import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("hello from products")
});

const PORT = process.env.PRODUCT_PORT || 5003;

app.listen(PORT, () => {
    console.log(`products service is running on port ${PORT}`)
});