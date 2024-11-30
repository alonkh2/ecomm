import { JobContext } from "./job-context";
import jwt, { JwtPayload } from "jsonwebtoken";

export const createToken = (context: JobContext) => {
	return jwt.sign(context, process.env.SECRET_KEY || "");
};

export const decodeToken = (token: string): JobContext => {
    return jwt.verify(token, process.env.SECRET_KEY || '') as JobContext;
}