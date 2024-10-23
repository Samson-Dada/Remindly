import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
		required: [true, "A reminder must have a title"],
	},
	description: {
		type: String,
		trim: true,
		required: [true, "A reminder must have a name"],
	},
	reminderDate: {
		type: Date,
		required: [true, "A reminder must have reminder date"],
	},
	status: {
		type: String,
		enum: ["pending", "completed", "canceled"],
		default: "pending",
	},
	createdDate: {
		type: Date,
		default: Date.now,
	},
	updatedDate: {
		type: Date,
		default: Date.now,
	},
	category: {
		type: String,
		trim: true,
		enum: ["general", "work", "personal", "health"],
		default: "general",
	},
	isNotified: {
		type: Boolean,
		default: false,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "A reminder must have user id"],
	},
});

const reminder = mongoose.model("reminders", ReminderSchema);
export default reminder;

// const reminderSchema = new mongoose.Schema({

//   priority: {
//     type: String,
//     enum: ['low', 'medium', 'high'],
//     default: 'medium',
//   },

//   repeatInterval: {
//     type: String,
//     enum: ['none', 'daily', 'weekly', 'monthly'],
//     default: 'none',
//   },
//   isArchived: {
//     type: Boolean,
//     default: false,
//   },
//   notificationMethod: {
//     type: String,
//     enum: ['none', 'email', 'SMS', 'push'],
//     default: 'none',
//   },

// });
