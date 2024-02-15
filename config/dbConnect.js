import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};
export default connectMongoDB;
