import Reminder from '../models/reminderModel.js';
import validator from 'validator';
// import { isValidObjectId } from '../utils/handleValidation.js';
import compareObjectId from '../helper/compareObjectId.js';
import responseHandler from '../utils/handleResponse.js';
import { deleteOne } from './handlerFactory.js';
import AppError from '../utils/appError.js';

export const getAllReminder = async (req, res) => {
	try {
		const reminders = await Reminder.find();
		//  if (!reminders) {
		//    return res.status(404).json({
		//      status: 'failed',
		//      message: 'Reminders record not found'
		//    });
		//  }
		responseHandler.success(res, { reminders }, 'Data fetched successfully', 200);
	} catch (error) {
		res.status(500).json({
			status: 'error',
			message: 'An error occurred while retrieving the reminder',
		});
	}
};

export const getReminder = async (req, res, next) => {
	try {
		const { id } = req.params;
		const reminder = await Reminder.findById(id);

		if (!reminder) {
			return next(new AppError('No reminder found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: reminder,
		});
	} catch (error) {
		next(error);
	}
};

export const updateReminder = async (req, res, next) => {
	try {
		const { id } = req.params;

		const reminder = await Reminder.findById(id);
		console.log('reminder', reminder);

		if (!compareObjectId(req.user.id, reminder.createdBy)) {
			return next(new AppError(`You do not have permission to update this reminder`, 403));
		}
		const updatedReminder = await Reminder.findByIdAndUpdate(
			id,
			{ ...req.body, updatedDate: Date.now() },
			{
				new: true,
				runValidators: true,
			}
		);
		if (!updatedReminder) {
			return next(new AppError('No reminder found with that ID', 404));
		}
		return res.status(200).json({
			status: 'success',
			message: `Reminder successfully updated `,
			data: updatedReminder,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const deleteReminder = async (req, res, next) => {
	await deleteOne(Reminder, req, res, next);
};

//  END point specific for login user

export const createReminderByUser = async (req, res, next) => {
	try {
		const { id } = req.body;
		const newReminder = await Reminder.create(req.body);

		newReminder.updatedDate = undefined;

		res.status(201).json({
			status: 'success',
			data: { newReminder },
		});
	} catch (error) {
		next(error);
	}
};

export const getAllReminderByUser = async (req, res, next) => {
	try {
		const { userId } = req.params;

		const allReminder = await Reminder.find({ createdBy: userId });
		if (!allReminder || allReminder.length === 0) {
			return next(new AppError('No reminders found or created by this user.', 404));
		}
		const totalCount = allReminder.length;
		responseHandler.success(res, { totalCount, allReminder }, `${Reminder.modelName} fetched successfully`, 200);
	} catch (error) {
		next(error);
	}
};
export const deleteReminderByUser = async (req, res, next) => {
	try {
		const { userId, reminderId } = req.params;
		const reminderToDelete = await Reminder.findOne({ _id: reminderId, createdBy: userId });

		if (!reminderToDelete) {
			return next(new AppError('Reminder not found for this current user.', 404));
		}

		const deletedReminder = await Reminder.findByIdAndDelete(reminderToDelete._id);

		if (!deletedReminder) {
			return next(new AppError('An error occurred while deleting the reminder.', 400));
		}

		responseHandler.success(res, null, 'Reminder successfully deleted', 204);
		// return res.status(200).json({
		// 	status: 'success',
		// 	message: `Reminder successfully deleted.`,
		// });
	} catch (error) {
		next(error);
	}
};
