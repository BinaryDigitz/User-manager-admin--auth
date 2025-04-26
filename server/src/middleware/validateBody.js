import asyncHandler from "./asyncHandler.js";

export const validateSignUp =  async ( req, res, next) =>{
    
    try{
        const { name, email, password } = req.body
        
   
      if(!name) return res.status(400).json({ success: false, statusCode: 400, message: 'Please provide a valid name'})
      if(!email) return res.status(400).json({ success: false, statusCode: 400, message: 'Please provide a valid email'})
      if(!password) return res.status(400).json({ success: false, statusCode: 400, message: 'Please provide a valid password'})
   
   
       next()
   }
   catch(ex){
    console.log(ex.message);
    next(ex)
   }
}



export const validateSignIn = async ( req, res, next) =>{
    try{
        const { email, password } = req.body;
        if(!email) return res.status(400).json({ success: false, statusCode: 400, message: 'Please provide a valid email'})
        if(!password) return res.status(400).json({ success: false, statusCode: 400, message: 'Please provide a valid password'})
            next()

    }
    catch(ex){
        next(ex)
        console.log(ex.message);
        
    }
}