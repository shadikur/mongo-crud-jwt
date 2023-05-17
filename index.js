require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5003

const demoData = [
    {
        name: "Shuvo",
        age: 29
    },
    {
        name: "Dipa",
        age: 28
    }
]

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {

    res.status(200).send({ text: "API server is running" })
})

app.get("/test/", (req, res) => {
    const name = req.query.name;
    const filter = demoData.find(data => data.name === name);
    if (filter) {
        res.send(filter)
    } else {
        res.send({})
    }
})

app.listen(port, () => {
    console.log(`Api server is running on port ${port}`);
})