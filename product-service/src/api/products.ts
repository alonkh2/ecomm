import {
	adminOperation,
	jwtHandler,
	RequestWithContext,
	TypedRequestBody,
} from "base";
import express from "express";
import product from "../db/product";
import { AddProductRequet } from "./types/add-product-request";

const router = express.Router();

router.use(jwtHandler());

router.get("/", jwtHandler(adminOperation), (req: RequestWithContext, res) => {
	const products = product.find({});

	res.json(products);
});

router.post(
	"/add",
	jwtHandler(adminOperation),
	async (req: TypedRequestBody<AddProductRequet>, res) => {
		const { items, name, price } = req.body;

		const id = crypto.randomUUID();

		const newProduct = new product({
			id,
			items: items.map((item) => ({ ...item, reserved: [] })),
			name,
			price,
		});

		await newProduct.save();

		res.json({ id });
	}
);
