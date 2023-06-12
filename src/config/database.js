import mongoose from "mongoose";


export const connect = async () => {

    await mongoose.connect("mongodb+srv://SK:mongo@cluster0.gwigoss.mongodb.net/")
}
