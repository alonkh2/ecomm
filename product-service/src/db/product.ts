import mongoose, { Schema } from "mongoose";

const Product = new Schema({
	id: { type: String, required: true },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	items: [
		{
			size: { type: Number, required: true },
			stockAmount: { type: Number, required: true },
			reserved: [
				{
					reservationId: {
						type: String,
						required: true,
					},
					quantity: {
						type: Number,
						required: true,
					},
					reservedSince: {
						type: Date,
						default: Date.now,
					},
				},
			],
		},
	],
});

export default mongoose.model("Product", Product);
