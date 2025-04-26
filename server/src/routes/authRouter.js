import { Router } from "express";
import { validateSignIn, validateSignUp } from "../middleware/validateBody.js";
import { createUser, loginUser } from "../controllers/auth.controllers.js";

const authRouter = Router()

authRouter.post('/sign-up',validateSignUp, createUser)

authRouter.post('/sign-in',validateSignIn, loginUser)




export default authRouter