import asyncHandler from "./asyncHandler.js";
import { JWT_SECRET } from '../config/env.js'
import jwt from 'jsonwebtoken'

const auth = asyncHandler( async ( req, res, next) =>{
    const token = req.headers.cookies
    if(!token) return res.json({ success:false, message: 'UNAUTHORIZED', statusCode: 401})
    
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if(!decodedToken) return res.json({ success: false, message: 'FORBIDDEN, Login again', statusCode: 403})
    
    req.body.userId = decodedToken.userId
    next()
})

export default auth;