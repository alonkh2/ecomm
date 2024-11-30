import express, { NextFunction, Request, Response, Express } from "express";
import jwt from "jsonwebtoken";
import { decodeToken } from "./jwt-utils";
import { JobContext } from "./job-context";

export const jwtHandler = async (
	req: RequestWithContext,
	res: Response,
	next: NextFunction
) => {
	const accessToken = req.headers.authorization?.split(" ")?.pop();

	if (!accessToken) {
		console.error("Access token not present!");
		res.status(400).json({ error: "Access token not present!" });
		return;
	}

	console.error(process.env.SECRET_KEY);

	const accessTokenPayload = decodeToken(accessToken);

	if (!accessTokenPayload) {
		res.status(401).send("Unauthorized");
	}

	req.jobContext = accessTokenPayload;

	console.log(req);

	next();
};

export interface RequestWithContext extends Request {
	jobContext?: JobContext;
}

export * from "./jwt-utils";
export * from "./job-context";
