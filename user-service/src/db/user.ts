import mongoose, { Schema } from "mongoose";

const User = new Schema({
	id: String,
	username: String,
	email: String,
	name: String,
});

export default mongoose.model("User", User);
