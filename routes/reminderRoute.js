import express from 'express';
import {
	getAllReminder,
	createReminderByUser,
	getReminder,
	updateReminder,
	deleteReminder,
	getAllReminderByUser,
	deleteReminderByUser,
} from '../controllers/reminderController.js';
import { protect, restrictTo } from '../controllers/authController.js';

const reminderRouter = express();

reminderRouter.route('/').get(protect, restrictTo('admin'), getAllReminder);
reminderRouter.route('/').post(createReminderByUser);

// route with parameter
reminderRouter
	.route('/:id')
	.get(getReminder)
	.delete(deleteReminder)
	.patch(protect, updateReminder);

reminderRouter.route('/users/:userId').get(getAllReminderByUser);
reminderRouter.route('/users/:userId/:reminderId').delete(deleteReminderByUser);
export default reminderRouter;
