import express, { NextFunction, Request, Response, Express } from "express";
import jwt from "jsonwebtoken";

const jwtHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = req.headers.authorization?.split(" ")?.pop();

	if (!accessToken) {
		console.error("Access token not present!");
		res.status(400).json({ error: "Access token not present!" });
		return;
	}

	const accessTokenPayload = jwt.verify(
		accessToken as string,
		process.env.ACCESS_TOKEN_KEY || ""
	) as jwt.JwtPayload;

	if (!accessTokenPayload) {
		res.status(401).send("Unauthorized");
	}

	req.userId = accessTokenPayload.userId;

	next();
};

export const useJwtHandler = (app: Express) => {
	app.use(jwtHandler);
}
