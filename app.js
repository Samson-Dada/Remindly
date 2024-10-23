import express from 'express';

// import hpp from "hpp";

import AppError from './utils/appError.js';
import globalErrorHandler from './middleware/errorMiddleware.js';
import userRouter from './routes/userRoutes.js';
import reminderRouter from './routes/reminderRoute.js';
import dbConnection from './db/dbConnection.js';
import appMiddleware from './middleware/appMiddleware.js';

const app = express();


// Database call
dbConnection();

// GLOBAL MIDDLEWARES
appMiddleware(app, express);

// ROUTES
app.use('/api/v1/reminders', reminderRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
