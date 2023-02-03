const express = require("express");
const logger = require("morgan")
const fs = require("fs")
const path = require("path");

const app = express()
const PORT = process.env.PORT || 8000


const logStream = fs.createWriteStream(path.join(__dirname, "access.log"))

app.use(logger("common", { stream: logStream }))
app.use(express.json())

const complaints = []
app.post("/complaints", (req, res) => {
    const { subject, description, catgory } = req.body;
    const newComplaints = {
        id: complaints.length + 1,
        subject,
        description,
        catgory,
        status: "open"
    }
    complaints.push(newComplaints)
    res.status(200).send({
        message: "Successful"
    })
})

app.put("/complaints/:id", (req, res) => {
    const { id } = req.params
    const complaint = complaints.filter(complain => complain.id === Number(id))
    complaint[0].status = "Closed"

    res.status(201).json({
        message: `Ticket with id: ${id} have been closed`
    })


})

app.get("/complaints", (_, res) => {
    res.send({
        data: complaints
    })
})


app.listen(PORT, () => {
    console.log("App is running fine")
})