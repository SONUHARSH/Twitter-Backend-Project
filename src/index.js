import express from "express"
import {connect} from "./config/database.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api",router)


app.listen(6000, async ()=> {
    console.log("server Started at 6000");
     // mongo db connection establishment
  
    connect();

    console.log("Mongo DB connected");


    /*
    Tweet.create({
        content: "This is my first tweet",
        likes: 25,
        noOfRetweets: 5,
        comment: "This is my firts comment"
    })
    */

    
})