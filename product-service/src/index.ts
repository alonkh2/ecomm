import express from "express";
import product from "./db/product";
import mongoose from "mongoose";
import cron from "node-cron";

const cleanUpReservations = async () => {
	const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

	await product.updateMany(
		{},
		{
			$pull: {
				"items.$[].reserved": {
					reservedSince: { $lt: fifteenMinutesAgo },
				},
			},
		}
	);
};

const app = express();

app.get("/", (req, res) => {
	res.send("hello from products");
});

const PORT = process.env.PRODUCT_PORT || 5003;

mongoose.connect("mongodb://mongo:27017/products").then(() => {
	console.log("products connected to mongo");

	cron.schedule("* * * * *", cleanUpReservations);

	cleanUpReservations().then(() => {
		console.log("old reservations removed");

		app.listen(PORT, () => {
			console.log(`products service is running on port ${PORT}`);
		});
	});
});
