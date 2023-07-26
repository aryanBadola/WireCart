const dotenv = require("dotenv");
const app = require("./app");
const connectDatabase=require("./config/database");
const cloudinary = require("cloudinary");




// Handling uncaught exception
process.on("uncaughtException",function(err){
  console.log(`Error message: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
})



//config
dotenv.config({path:"backend/config/config.env"})


//

//MongoDB database connecting
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


const server = app.listen(process.env.PORT,function(){
  console.log(`Server is running on port ${process.env.PORT}`);
});


// Unhandled Promise Rejections

process.on("unhandledRejection",function(err){
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(function(){
    process.exit(1);
  });
});