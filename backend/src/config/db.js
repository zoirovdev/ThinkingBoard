const mongoose = require("mongoose")


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MONGODB CONNECTED SUCCESFULLY!")
  } catch (error) {
    console.error("Error connecting to MONGODB", error)
  }
}


module.exports = connectDB
