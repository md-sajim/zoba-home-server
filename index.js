const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.Port || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME_KEY}:${process.env.USER_SUCORATY_KEY}@cluster0.c8jqolf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        const userClaction = client.db('zoba_home').collection("users");
        app.post('/user', async (req, res) => {
            const user = req.body;
            const result = await userClaction.insertOne(user);
            res.send(result)
        })
        app.get('/user', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await userClaction.findOne(query);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.log)



app.get("/", async (req, res) => {
    res.send("our home server is running")
});
app.listen(port, () => console.log(`our zoba home servic port:${port}`))
