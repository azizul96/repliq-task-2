import mongoose from "mongoose";


const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const connectToDB = async()=>{
  const connectionUrl = 'mongodb+srv://azizul53468:azizul53468@cluster0.c1vw2zf.mongodb.net/';

  mongoose.connect(connectionUrl, configOptions).then(()=>console.log('E-commerce database connected!')).catch((error)=>console.log(error.message))
}

export default connectToDB;