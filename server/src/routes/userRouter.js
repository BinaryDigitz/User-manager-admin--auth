import { Router } from "express";
import { authUser, authAdmin, authManager } from "../middleware/auth.js";

const userRouter = Router()

// Access by Admins only
userRouter.get('/admin',authAdmin, (req, res) => res.status(200).json({ success: true, message: 'Welcome Admin'}) )

//Access by Admin and manager 
userRouter.get('/manager',authManager, (req, res) => res.status(200).json({ success: true, message: 'Welcome manager'}) )


// Access by everyone
userRouter.get('/',authUser, (req, res) => {
    console.log(req.body);
    
    res.status(200).json({ success: true, message: 'Welcome user'}) 
})




export default userRouter;