import bcrypt from "bcrypt";

export const generatePasswordHash = async (password: string) => {
	const saltRounds = 10; // Define the cost factor for hashing
	return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
	inputPassword: string,
	hashedPassowrd: string
): Promise<boolean> => {
	return await bcrypt.compare(inputPassword, hashedPassowrd);
};
