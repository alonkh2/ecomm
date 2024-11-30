import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { generatePasswordHash } from "../utils/encryption-utils";
const User = new Schema({
	id: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
});

User.pre(
	"save",
	async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
		if (!this.isModified("password")) return next();

		try {
			this.password = await generatePasswordHash(this.password)
			next();
		} catch (err) {
			next(err as mongoose.CallbackError);
		}
	}
);

export default mongoose.model("User", User);
