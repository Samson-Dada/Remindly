import jwt from "jsonwebtoken";
import config from "../config.js";
import cookieSetting from "../utils/handleUserCookie.js";

const signToken = (id) => {
	return jwt.sign({ id }, config.jwtSecret, {
		expiresIn: config.jwtExpires,
	});
};

export const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	cookieSetting(res, token);
	// const cookieOptions = {
	// 	expires: new Date(
	// 		Date.now() + config.jwtCookiesExpires * 24 * 60 * 60 * 1000
	// 	),
	// 	httpOnly: true,
	// };
	// if (config.nodeEnv === "production") cookieOptions.secure = true;

	// res.cookie("jwt", token, cookieOptions);

	// Remove password from output
	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};
