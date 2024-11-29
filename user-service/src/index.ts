import express from "express";
import mongoose from "mongoose";
import router from "./api/users";

const app = express();
app.use(express.json());
app.use("/users/", router);

const PORT = process.env.USER_PORT || 5005;

mongoose.connect("mongodb://mongo:27017/users").then(() => {
	console.log("connected to mongo");
	app.listen(PORT, () => {
		console.log(`user service is running on port ${PORT}`);
	});
});

export default app;
