const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter your name"],
        maxLength:[30,"Name cannot exceed 30 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter you email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken:String,
    resetPasswordExpire: Date
});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
})


//JWT Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    });
};

// Compare if both the passwords match
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// Generating password reset token 
userSchema.methods.getResetPasswordToken = function(){
    //Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPasswordToken to user Schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    return resetToken;
}

module.exports = mongoose.model("User", userSchema);