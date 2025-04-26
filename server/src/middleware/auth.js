import asyncHandler from "./asyncHandler.js";
import { JWT_SECRET } from '../config/env.js'
import jwt from 'jsonwebtoken'

export const authAdmin =  ( req, res, next) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1]
    }
    try{
       
    if(!token) return res.json({ success:false, message: 'UNAUTHORIZED: Please Provide a token', statusCode: 401})
    
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if(!decodedToken) return res.json({ success: false, message: 'FORBIDDEN, Login again', statusCode: 403})
        
    if( decodedToken.role !== 'admin') return res.status(403).json({ success:false, message:'FORBIDDEN: Please check your Role'})
    req.body = decodedToken
    next()
    }catch(ex){
        next(ex)
        console.log(ex.message);
        
    }
}
export const authManager =  ( req, res, next) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1]
    }
    try{
       
    if(!token) return res.json({ success:false, message: 'UNAUTHORIZED: Please Provide a token', statusCode: 401})
    
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if(!decodedToken) return res.json({ success: false, message: 'FORBIDDEN, Login again', statusCode: 403})

    if( decodedToken.role === 'user') return res.status(403).json({ success:false, message:'FORBIDDEN: Please check your Role'})
    req.body = decodedToken
    next()
    }catch(ex){
        next(ex)
        console.log(ex.message);
        
    }
}
export const authUser =  ( req, res, next) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1]
    }
    try{
       
    if(!token) return res.json({ success:false, message: 'UNAUTHORIZED: Please Provide a token', statusCode: 401})
    
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if(!decodedToken) return res.json({ success: false, message: 'FORBIDDEN, Login again', statusCode: 403})
    
    req.body = decodedToken
    next()
    }catch(ex){
        next(ex)
        console.log(ex.message);
        
    }
}

