import { Request } from "express";

export type JobContext = {
	userId: string;
	isAdmin?: boolean;
};

export type ContextHandler = <T extends Request>(
	jobContext: JobContext,
	req: T
) =>
	| {
			authorizationStatus: false;
			reasonPhrase: string;
	  }
	| { authorizationStatus: true };
