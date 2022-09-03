import mongoose from "mongoose";
import validator from "validator";

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
        minlength: [6, "at least 6 chars"]
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

const User = mongoose.model("User", userSchema);
export default User;