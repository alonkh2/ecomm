import express from "express";
import { jwtHandler } from "base";

const app = express();

app.use(express.json());
app.use(jwtHandler);

app.get("/", (req, res) => {
	res.send("hello from notifications");
});

const PORT = process.env.NOTIFICATIONS_PORT || 5000;

app.listen(PORT, () => {
	console.log(`notification service is running on port ${PORT}`);
});
