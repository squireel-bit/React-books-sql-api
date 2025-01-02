const express = require("express")
const app = express()
const cors = require('cors');

require('dotenv').config()

app.use(cors());

app.use(express.json())


const bookRouter = require('./routes/book.router')

app.use("/api/books", bookRouter)

app.listen(process.env.PORT, () => console.log("Server is running on port 5000"))
