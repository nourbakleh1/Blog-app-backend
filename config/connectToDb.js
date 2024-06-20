const mongoose=require("mongoose");

module.exports=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CLOUD_URI);
        console.log("connected to mongoDB ^-^");
    }
    catch(error){
        console.log("connection faild to mongoDB!",error);
    }
}