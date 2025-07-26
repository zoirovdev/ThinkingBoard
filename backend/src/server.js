const express = require("express")
const notesRoutes = require("./routes/notesRoutes.js")
const connectDB = require("./config/db.js")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001


connectDB()

app.use(express.json())
app.use("/api/notes", notesRoutes)



app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});


