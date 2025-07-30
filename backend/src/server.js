const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")


const notesRoutes = require("./routes/notesRoutes.js")
const connectDB = require("./config/db.js")
const rateLimiter = require("./middleware/rateLimiter.js")



dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001



// middleware
app.use(cors({
  origin: "http://localhost:5173",
}))
app.use(express.json())
app.use(rateLimiter)



app.use((req, res, next) => {
  console.log(`Request method is ${req.method} & Request url is ${req.url}`)
  next()
})

app.use("/api/notes", notesRoutes)



connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
})



