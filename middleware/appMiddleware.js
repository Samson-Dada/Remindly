import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';

function appMiddleware(app, express) {
	// Set security HTTP headers
	app.use(helmet());

	// Development logging
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	// To check for production / development env

	if (process.env.NODE_ENV === 'development') {
		console.log('development');
	} else if (process.env.NODE_ENV === 'production') {
		console.log('production');
	}

	// Limit requests from same API
	const limiter = rateLimit({
		max: 100,
		windowMs: 60 * 60 * 1000,
		message: 'Too many requests from this IP, please try again in an hour!',
	});
	app.use('/api', limiter);

	// Body parser, reading data from body into req.body
	app.use(express.json({ limit: '10kb' }));

	// Data sanitization against NoSQL query injection
	app.use(mongoSanitize());

	// Data sanitization against XSS
	app.use(xss());

	// allow CORS with options

	const corsOptions = {
		origin: ' http://127.0.0.1:600',
		methods: ['GET', 'POST'],
		//allowedHeaders: ['Content-Type', 'Authorization'], // Allow only these headers
	};

	app.use(cors(corsOptions));

	///////////Test middleware
	app.use((req, res, next) => {
		req.requestTime = new Date().toISOString();
		// console.log(req.headers);
		next();
	});

	// Prevent parameter pollution
	// app.use(
	// 	hpp({
	// 		whitelist: [
	//
	// 		],
	// 	})
	// );
}

export default appMiddleware;
