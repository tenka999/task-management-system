import loginUser from "../controllers/user-login-regis-controller.js";
import express from "express";
import { Router } from "express";

const publicRouter = Router();

//#region Auth
publicRouter.use("/login", loginUser.loginUser);
publicRouter.use("/register", loginUser.registerUser);
//#endregion Auth

export default publicRouter;
