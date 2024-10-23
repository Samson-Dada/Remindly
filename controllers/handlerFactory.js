// factory function here delegate responsibility or an action the method and pass a generic parameter

import AppError from "../utils/appError.js";
export const deleteOne = async (Model, req, res, next) => {
	try {
		const { id } = req.params;

		const document = await Model.findByIdAndDelete(id);
		if (!document) {
			return next(
				new AppError(`No ${Model.modelName} found with that ID`, 404)
			);
		}
		return res.status(204).json({
			status: "success",
			message: `${Model.modelName} deleted successfully`,
		});
	} catch (error) {
		next(error);
	}
};
