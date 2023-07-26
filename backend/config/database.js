const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDatabase = function(){mongoose.connect(process.env.DB_URI,{useNewUrlParser:true, useUnifiedTopology:true})
.then(function(data){
    console.log(`Database connected with ${data.connection.host}`);
});
}


module.exports=connectDatabase;