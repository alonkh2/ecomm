import { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			userId?: string; // Or the appropriate type for `userId`
		}
	}
}
