const express = require("express")
const notesRoutes = require("./routes/notesRoutes.js")


const app = express()

app.use(express.json())
app.use("/api/notes", notesRoutes)



app.listen(5001, () => {
  console.log("Server is running on port: 5001");
});


