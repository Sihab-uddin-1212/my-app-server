require("dotenv").config();
const express = require('express')
const app = express()
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = 4000

app.use(cors());
app.use(express.json());

 
 
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.aoofufm.mongodb.net/?appName=Cluster0`;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // await client.connect();

    const db = client.db("food-data")
    const foodCollection = db.collection("menu")
    const AddFood = db.collection("add-menu")


    app.get('/all',async(req,res)=>{
      const cursor = foodCollection.find();
    const result = await cursor.toArray();
      res.send(result);
   
    })
    app.get('/least-menu',async(req,res)=>{
      const cursor = foodCollection.find().limit(6);
    const result = await cursor.toArray();
      res.send(result);
   
    })

    app.get("/item/:id",async(req,res)=>{
          const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await foodCollection.findOne(query);
      res.send(result);
    })

    


    app.post('/post-food',async(req,res)=>{
        const data = req.body;
        const result = await foodCollection.insertOne(data);
      res.send({
        success: true,
        result,
      });
    })

   
 
       

    
  
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
     
    // await client.close();
  }
}
run().catch(console.dir);


