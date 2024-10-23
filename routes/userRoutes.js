import express from "express";
// import userController from "./../controllers/userController.js";
import {
	register,
	login,
	forgotPassword,
	resetPassword,
	protect,
	updatePassword,
} from "./../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.patch("/updateMyPassword", protect, updatePassword);

// router.patch("/updateMe", protect, userController.updateMe);
// router.delete("/deleteMe", protect, userController.deleteMe);

// router
// 	.route("/:id")
// 	.get(userController.getUser)
// 	.patch(userController.updateUser)
// 	.delete(userController.deleteUser);

export default router;
