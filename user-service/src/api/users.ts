import express from "express";
import { TypedRequestBody } from "./types/express";
import { RegisterRequest } from "./types/register-request";
import user from "../db/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/:uid", async (req, res) => {
	console.log(`user id request: ${req.params.uid}`);
	try {
		const id = req.params.uid;
		const existingUser = await user.findOne({ id });

		if (!existingUser) {
			res.status(404).json({ error: `no user with id ${id}` });
			return;
		}

		res.json({ existingUser });
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.post(
	"/register",
	async (req: TypedRequestBody<RegisterRequest>, res) => {
		try {
			const { email, name, password, username } = req.body;

			const existingUser = await user.findOne({
				$or: [{ email }, { username }],
			});

			if (existingUser) {
				res.status(400).json({
					error: "user with username/email already exists",
				});
				return;
			}

			const id = crypto.randomUUID();
			const newUser = new user({ email, username, id, name, password });

			await newUser.save();

			res.json({ id });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error });
		}
	}
);

router.delete("/:uid", async (req, res) => {
	try {
		const authorization = req.header("authorization");
		const token = authorization?.split(" ")?.[1];
		const id = req.params.uid;

		if (token) {
			try {
				const decoded = jwt.verify(token, process.env.SECRET_KEY || "");

				if (decoded !== id) {
					res.status(401).json({ error: "unauthorized" });
					return;
				}

				const existingUser = await user.findOne({ id });

				if (!existingUser) {
					res.status(401).json({ error: "unauthorized" });
				}

				user.deleteOne({ id });
			} catch (e) {
				res.status(401).json({ error: "unauthorized" });
			}
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

export default router;
