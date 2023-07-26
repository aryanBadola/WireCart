const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//Creating Product -- ADMIN

exports.createProduct= catchAsyncErrors(async function(req,res,next){

    let images = [];

    if(typeof req.body.images === "string"){
        images.push(req.body.images);
    }
    else{
        images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.url,
        })
        
    }

    req.body.images = imagesLink;

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product,
    });
});

//Get all products

exports.getAdminProducts = catchAsyncErrors(async function(req,res,next){

    const products = await Product.find();

    res.status(200).json({ 
        success:true,
        products,
    });
});

//Get all products (ADMIN)

exports.getAllProducts = catchAsyncErrors(async function(req,res,next){

    
const resultPerPage = 8;
const productsCount = await Product.countDocuments();

const apiFeatures=new ApiFeatures(Product.find(),req.query)
.search()
.filter()
.pagination(resultPerPage);
const products = await apiFeatures.query;
res.status(200).json({ 
    success:true,
    products,
    productsCount,
    resultPerPage,
});
});

// Update a Product -- Admin

exports.updateProduct = catchAsyncErrors(async function(req,res,next){
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });
});

// Deleting a product

exports.deleteProduct = catchAsyncErrors(async function(req,res,next){
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",500));
    }

    //Deleting Images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        
    }

    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product deleted successfully"            
    });
});


// Get a single product details 

exports.getProductDetails = catchAsyncErrors(async function(req,res,next){
    const product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    
    res.status(200).json({
        success:true,
        product
    });
});


//Create new review or update the review
exports.createProductReview = catchAsyncErrors(async function(req,res,next){

    const {rating, comment, productId} = req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };

    const product = await Product.findById(productId);
    

    const isReviewed = product.reviews.find((rev)=>rev.user?.toString()===req.user?._id.toString());

    if(isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user?.toString()===req.user?._id.toString()){
                (rev.rating = rating),(rev.comment = comment);
            }
        })

    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating;
    });

    product.ratings = avg / product.reviews.length;



    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    });

});


// Get all review of a single product
exports.getProductReviews = catchAsyncErrors(async function(req,res,next){
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews,
    });
});

// Delete a review
exports.deleteReview = catchAsyncErrors(async function(req,res,next){

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    const reviews = product.reviews.filter((rev)=>rev._id.toString() !== req.query?.id.toString());

    let avg=0;
    reviews.forEach(rev=>{
        avg+=rev.rating;
    });
    let ratings = 0;
    if(reviews.length === 0){
        ratings=0;
    }
    else{
        ratings = avg / reviews.length;
    }
    
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numOfReviews,
    },
    {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
    });

});