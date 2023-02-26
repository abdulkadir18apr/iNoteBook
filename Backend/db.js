const mongoose=require('mongoose');
const mongooseURI="mongodb://localhost:27017"

const connectToMongo=async()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log("Connected to Monngoo Suceessfully")

    })
}
module.exports=connectToMongo


