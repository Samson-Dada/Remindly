const responseHandler = {
	success: (res, data = null, message = 'Request was successful', statusCode = 200) => {
		return res.status(statusCode).json({
			status: 'success',
			message: message,
			statusCode: statusCode,
			data: data,
		});
	},

	error: (res, message = 'Something went wrong', code = 500, errors = null) => {
		return res.status(code).json({
			status: 'error',
			message: message,
			code: code,
			errors: errors,
		});
	},

	failed: (res, message = 'Request failed', code = 400, errors = null) => {
		return res.status(code).json({
			status: 'fail',
			message: message,
			code: code,
			errors: errors,
		});
	},

	validationError: (res, message = 'Validation failed', code = 400, errors = []) => {
		return res.status(code).json({
			status: 'fail',
			message: message,
			code: code,
			errors: errors,
		});
	},
};

export default responseHandler;
