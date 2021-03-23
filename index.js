require("dotenv").config();
const express = require("express");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const app=express();
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const port = process.env.PORT || 4000;
//const dbUrl = "mongodb://127.0.0.1:27017";
app.use(express.json());

app.get("/",async(req,res)=>{
  try{
    let clientInfo = await mongoClient.connect(dbUrl);
    let db = clientInfo.db("student");
    let data = await db.collection("student").find().toArray();
    res.status(200).json(data);
    clientInfo.close();
  }
  catch(error){
    console.log(error);
  }
  }
);

app.post('/create-student',async(req,res)=>{  
    try{
      let client = await mongoClient.connect(dbUrl);
      let db = client.db('student');
      await db.collection('student').insertOne(req.body);
      res.status(200).json({message:"student created"});
      client.close();
    }
    catch(error){
      console.log(error);
    }
  }
);

/*app.put('/update-student/:id', async(req,res)=>{
  try{
  let client = await mongoClient.connect(dbUrl);
  let db = client.db('student');
  await db.collection('student')
  .findOneAndUpdate({_id:objectId(req.params.id)},
  {$set:req.body});
  res.status(200).json({message:"student updated"});
  client.close();
  }
  catch(error){
    console.log(error);
  }
});

app.put('/delete-student/:id', async(req,res)=>{
  try{
  let client = await mongoClient.connect(dbUrl);
  let db = client.db('student');
  await db.collection('student')
  .deleteOne({_id:objectId(req.params.id)},
  {$set:req.body});
  res.status(200).json({message:"student deleted"});
  client.close();
  }
  catch(error){
    console.log(error);
  }
});*/

app.listen(4000,()=>console.log('app listening at port 4000'));