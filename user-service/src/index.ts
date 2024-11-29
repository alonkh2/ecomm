import express from "express";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
	res.send("hello from orders");
});

const PORT = process.env.USER_PORT || 5005;

mongoose.connect("mongodb://mongo:27017/users").then(() => {
	console.log("connected to mongo");
	app.listen(PORT, () => {
		console.log(`order service is running on port ${PORT}`);
	});
});
