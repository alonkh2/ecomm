import mongoose, { Schema } from "mongoose";

const Product = new Schema({
	id: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
});

export default mongoose.model("Product", Product);
