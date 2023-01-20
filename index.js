const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port=process.env.PORT || 5000;
const app = express();
require('dotenv').config();
app.use(cors());



const uri = `mongodb+srv://Jalal:${process.env.DB_PASSWORD}@cluster0.xdvmoyr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dataCollection = client.db("customers-data").collection("data");

function run(){
    try{

        //test api
        app.get('/', function(req, res){
            res.send("Hello, world!");
        })

        //data get api
        app.get('/data',async(req,res)=>{
            const data =await dataCollection.find({}).toArray();
            res.send(data);
        })

    }catch(err){

    }
}

run();

app.listen(port,()=>{
    console.log('listening on port',port);
});