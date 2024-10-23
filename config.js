import env from "dotenv";
// import connectDb from 'mongoose';

env.config({ path: "./config.env" });

export default {
	port: process.env.PORT || 8000,
	dBConnection: process.env.DATABASE_LOCAL,
	secretToken: process.env.JWT_SECRET,
	jwtSecret: process.env.JWT_SECRET,
	nodeEnv: process.env.NODE_ENV,
	jwtExpires: process.env.JWT_EXPIRES_IN,
	jwtCookiesExpires: process.env.JWT_COOKIE_EXPIRES_IN,
	//   production_env: process.env.NODE_DEVELOPMENT_ENV,
	//   development_env: process.env.NODE_PRODUCTION_ENV
};
const localDb = process.env.DATABASE_LOCAL;
