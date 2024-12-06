import express, { NextFunction, Request, Response, Express } from "express";
import jwt from "jsonwebtoken";
import { decodeToken } from "./jwt-utils";
import { ContextHandler, JobContext } from "./job-context";

export const jwtHandler = <T extends RequestWithContext>(
	contextHandler?: ContextHandler
) => {
	return async (req: T, res: Response, next: NextFunction) => {
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
			return;
		}

		if (contextHandler) {
			const contextResult = contextHandler(accessTokenPayload, req);

			if (!contextResult.authorizationStatus) {
				res.status(401).json({ error: contextResult.reasonPhrase });
				return;
			}
		}

		req.jobContext = accessTokenPayload;

		console.log(req);

		next();
	};
};

export const adminOperation: ContextHandler = (context) => {
	if (context.isAdmin) {
		return { authorizationStatus: true };
	}

	return {
		authorizationStatus: false,
		reasonPhrase: "operation is only permitted for admin users",
	};
};

export interface RequestWithContext extends Request {
	jobContext?: JobContext;
}

export * from "./jwt-utils";
export * from "./job-context";
export * from "./express";
