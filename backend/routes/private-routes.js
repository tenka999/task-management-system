import {
  coverBook,
  uploadArticle,
  uploadGallery,
  uploadPdf,
  uploadProfile,
} from "../middlewares/cover-book.js";
import { Router } from "express";
import authMiddleWare from "../middlewares/auth.js";

const privateRouter = Router();

privateRouter.use(authMiddleWare);

export default privateRouter;
