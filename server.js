import app from './app.js';

process.on('uncaughtException', err => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	console.log(err);
	process.exit(1);
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

// process.on('SIGINT', () => {
// 	redisClient.quit(() => {
// 		console.log('Redis client closed');
// 		process.exit(0);
// 	});
// });

process.on('unhandledRejection', err => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
