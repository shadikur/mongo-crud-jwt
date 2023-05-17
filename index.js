require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jasonwebtoken');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


//-----------Mongo----------



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pwfe9mm.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const democollection = client.db(process.env.DB_NAME).collection("democollection");

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        app.post("/user", async (req, res) => {
            const userData = req.body;
            const result = await democollection.insertOne(userData);
            res.send(result);
        })

        app.get("/viewall", async (req, res) => {
            const query = await democollection.find({}).toArray();
            res.send(query)
        })

        app.get("/view/:id", async (req, res) => {
            const id = req.params.id;
            const queryData = { _id: new ObjectId(id) }
            const result = await democollection.findOne(queryData)
            res.send(result)
        })

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

//-----------Mongo----------

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