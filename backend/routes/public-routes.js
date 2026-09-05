import loginUser from "../controllers/auth-controller.js";
import express from "express";
import { Router } from "express";

const publicRouter = Router();

//#region Auth
publicRouter.use("/login", loginUser.loginUser);
publicRouter.use("/register", loginUser.registerUser);
//#endregion Auth

publicRouter.use("/workspace-logo", express.static("uploads/workspace-logo"));

export default publicRouter;
