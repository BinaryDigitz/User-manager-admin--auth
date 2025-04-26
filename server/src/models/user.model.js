import mongoose from 'mongoose'
import { JWT_SECRET} from '../config/env.js'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
    name: {
        type:String,
        minLenght: 3,
        maxLenght: 50,
        required: true
    },
    email: {
        type:String,
        minLenght: 3,
        maxLenght: 50,
        required: true,
        unique: true
    },
    password: {
        type:String,
        minLenght: 3,
        maxLenght: 250,
        required: true
    },
    role:{
        type:String,
        enum: ['user', 'manager', 'admin'],
        required:true,
    }

}, { timestamps: true, minimize: false})

userSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id, role: this.role}, JWT_SECRET, { expiresIn: '3d'})
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel