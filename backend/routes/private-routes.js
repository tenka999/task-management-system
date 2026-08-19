import {
  coverBook,
  uploadArticle,
  uploadGallery,
  uploadPdf,
  uploadProfile,
} from "../middlewares/cover-book.js";
import { Router } from "express";
import authMiddleWare from "../middlewares/auth.js";
import userRoleController from "../controllers/user-role-controller.js";
import userController from "../controllers/user-controller.js";

const privateRouter = Router();

// privateRouter.use(authMiddleWare);

//#region user
privateRouter.get("/user", userController.getAllUsers);
privateRouter.get("/user/:id", userController.getAllUserById);
privateRouter.post("/user", userController.creaateRole);
privateRouter.put("/user/:id", userController.updateRole);
privateRouter.delete("/user/:id", userController.deleteUser);
//#endregion user

//#region role
privateRouter.get("/role", userRoleController.getAllRole);
privateRouter.get("/role/:id", userRoleController.getAllRoleById);
privateRouter.post("/role", userRoleController.creaateRole);
privateRouter.put("/role/:id", userRoleController.updateRole);
privateRouter.delete("/role/:id", userRoleController.deleteRole);
//#endregion role

export default privateRouter;
