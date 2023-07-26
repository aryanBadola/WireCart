const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");

//Registering a user
exports.registerUser = catchAsyncErrors(async function(req,res,next){
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    })
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    });

    sendToken(user,200,res);

});

// Logging a user

exports.loginUser = catchAsyncErrors(async function(req,res,next){
    const {email, password} = req.body;

    //Checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter email and password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user,200,res);
    
});


// Logging Out a User

exports.logout = catchAsyncErrors(async function(req,res,next){
    res.cookie("token",null,{
        expiresIn:Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
})


// Forgot Password

exports.forgotPassword = catchAsyncErrors(async function(req,res,next){
    const user = await User.findOne({email:req.body.email});

    if(!user)
    {
        return next(new ErrorHandler("User not found",404));
    }

    //Get ResetPassword Token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is : \n\n${resetPasswordUrl}\n\n If you have not requested this email, then please ignore it.`;

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message
        });

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully.`
        });
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
        
    }
    
})


//Get user detail
exports.getUserDetails = catchAsyncErrors(async function(req,res,next){
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});


//Update Password
exports.updatePassword = catchAsyncErrors(async function(req,res,next){

    const user = await User.findById(req.user.id);

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
});


// Update user profile

exports.updateProfile = catchAsyncErrors(async function(req,res,next){
    
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
    }

    if(req.body.avatar !== ""){
        const user = await User.findById(req.body.id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    })

    newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
    }

    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    })

})

// Get all users

exports.getAllUsers = catchAsyncErrors(async function(req,res,next){
    const users = await User.find();

    res.status(200).json({
        success:true,
        users,
    })
})


//Get single user (admin)
exports.getSinglelUser = catchAsyncErrors(async function(req,res,next){
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,404));
    }

    res.status(200).json({
        success:true,
        user,
    });
});

// Update user role -- Admin

exports.updateRole = catchAsyncErrors(async function(req,res,next){
    
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        message:"User updated successfully."
    })

})

// Delete user -- Admin

exports.deleteUser = catchAsyncErrors(async function(req,res,next){
    
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with ${req.params.id}`,404));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
  

    await user.remove();
    res.status(200).json({
        success:true,
        message:"User deleted successfully."
    })

})




