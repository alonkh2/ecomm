import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
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
			const saltRounds = 10; // Define the cost factor for hashing
			this.password = await bcrypt.hash(this.password, saltRounds);
			next();
		} catch (err) {
			next(err as mongoose.CallbackError);
		}
	}
);

export default mongoose.model("User", User);
