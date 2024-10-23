import mongoose from "mongoose";
import config from "../config.js";

export default function() {
	mongoose
		.connect(config.dBConnection, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(function() {
			console.log("Database connection successful");
		})
		.catch(function(error) {
			console.log(`Database connection failed, REASON: ${error.message}`);
		});
}
