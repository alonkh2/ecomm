import express from "express";
import { RegisterRequest } from "./types/register-request";
import user from "../db/user";
import {
	jwtHandler,
	RequestWithContext,
	createToken,
	TypedRequestBody,
} from "base";
import { LoginRequest } from "./types/login-request";
import { comparePasswords } from "../utils/encryption-utils";

const router = express.Router();

router.get(
	"/:uid",
	jwtHandler((context, req) => {
		if (req.params.uid !== context.userId && !context.isAdmin) {
			return {
				authorizationStatus: false,
				reasonPhrase:
					"non admin user cannot get users other than itself",
			};
		}

		return { authorizationStatus: true };
	}),
	async (req: RequestWithContext, res) => {
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
	}
);

router.get("/", async (req, res) => {
	const users = await user.find({});

	res.json({ users });
});

router.post("/login", async (req: TypedRequestBody<LoginRequest>, res) => {
	try {
		const { username, password } = req.body;

		const existingUser = await user.findOne({
			username,
		});

		if (!existingUser) {
			console.error("username does not exist");

			res.status(400).json({
				error: "username does not exist",
			});
			return;
		}

		if (!(await comparePasswords(password, existingUser.password))) {
			console.error("password is incorrect!");

			res.status(401).json({
				error: "password is incorrect!",
			});
			return;
		}

		console.error(process.env.SECRET_KEY);

		const token = createToken({
			userId: existingUser.id,
			isAdmin: existingUser.isAdmin,
		});

		res.json({ token });
	} catch (error) {
		console.error(error);
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
		const id = req.params.uid;

		try {
			console.log(id);
			const existingUser = await user.findOne({ id });

			console.log(existingUser);

			if (!existingUser) {
				res.status(401).json({
					error: "user with this id does not exist",
				});
			}

			await user.deleteOne({ id });
			res.json({ status: "success" });
		} catch (e) {
			res.status(401).json({ error: "unauthorized" });
		}
	} catch (error) {
		res.status(500).json({ error });
	}
});

export default router;
