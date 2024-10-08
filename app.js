import express from "express";

import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
// import hpp from "hpp";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./middleware/errorHandler.js";
// import tourRouter from "./routes/tourRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
// app.use(
// 	hpp({
// 		whitelist: [
// 			"duration",
// 			"ratingsQuantity",
// 			"ratingsAverage",
// 			"maxGroupSize",
// 			"difficulty",
// 			"price",
// 		],
// 	})
// );

// Test middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	// console.log(req.headers);
	next();
});

// 3) ROUTES
// app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
