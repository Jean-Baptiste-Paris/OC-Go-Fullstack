const express = require("express")
const mongoose = require("mongoose")
const stuffRoutes = require("./routes/stuff")

const Thing = require("./models/Thing")

const app = express()
mongoose
    .connect(
        "mongodb+srv://bob:s0wtG65XcN0801Q5@cluster0.xjgeyuo.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch(() => console.log("Connexion à MongoDB échouée"))

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
})

app.use("/api/stuff", stuffRoutes)

module.exports = app
