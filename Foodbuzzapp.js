const express = require("express")
const path = require("path")
const fs = require("fs")
const app = express()
var mongoose = require("mongoose")
const bodyparser = require("body-parser")
mongoose.connect("mongodb://localhost/contactFoodbuzz", {
    useNewUrlParser: true
})
const port = 80

// Define mongoose schema 
var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    address: String
    
  });

  const Contact = mongoose.model('Contact', contactSchema);  

app.use("/css", express.static("css"))
app.use(express.urlencoded())

app.get("/", (req, res) => {
    const put = {}
    res.status(200).sendFile(path.join(__dirname,"FoodBuzz.html"))
})

app.get("/", (req, res) => {
    const put = {}
    res.status(200).sendFile(path.join(__dirname,"FoodBuzz.html"))
})


app.post("/", (req, res) => {
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        console.log("Items saved to the database")
        res.send("This item has been saved to the database")
    }).catch((err)=>{
        console.error("Error saving items to database:", err)
        res.status(400).send("Item was not send to the database")
    })
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})