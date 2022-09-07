import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email" ],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide  a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password minimum 6 characters"],
        select: false
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "LastName"
    }, 
    location: {
        type: String,
        maxlength: 20,
        trim: true,
        default: "my city"
    }
})

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.createJWT = function() {
    return jwt.sign({user: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = bcrypt.compare(candidatePassword, this.password)
    return isMatch
}


const User = mongoose.model("User", userSchema);
export default User;