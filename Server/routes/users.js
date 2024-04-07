import express from "express";
const router = express.Router();
import * as controllerUser from "../controllers/hendleUsersControler.js";
router.get("/all-user", controllerUser.getAllUsers);
router.get("/user/:id", controllerUser.getUser);
router.put("/update-user", controllerUser.updateUser);
router.delete("/delete-user/:id", controllerUser.deleteUser);
router.post("/login", controllerUser.login);
router.post("/add-user", controllerUser.addUser);
router.post("/forgot-password", controllerUser.ForgotPassword);

// add friend
router.post("/add-friend", controllerUser.addFriend);
router.delete("/delete-friend", controllerUser.deleteFriend);
router.get("/get-friends/:id", controllerUser.getFriends);

// get data chat
router.post("/get-data-chat", controllerUser.getDataChat);

// user create a group
router.post("/create-department", controllerUser.createGroup);
router.delete("/delete-department", controllerUser.deleteGroup);
export default router;
