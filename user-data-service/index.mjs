import mongoose from "mongoose";
import {addUserHistory, createUserData, getUserData, ProfileModel as Profile} from "./model.mjs";
import express from "express";
import cors from "cors";
import {config} from "dotenv";
import bodyParser from 'body-parser'

config();

const db = mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("successfully connected to the db")
})
.catch(error=>console.error(error))

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());

app.get("/userdata", (req, res) => {
    getUserData({"email" : req.query.email}).then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.status(404).json(error);
    })
});


app.post("/update", (req, res) => {
    addUserHistory(req.body.email, req.body.data).then((result) => {
        res.status(200).send("Update Success.");    
    }).catch((error) => {
        res.status(404).json(error);
    })
});

app.post("/create", (req, res) => {
    const {name, email} = req.body;
    createUserData(name, email).then((result) => {
        res.status(200).send("Created user.");
    }).catch((error)=>{
        res.status(403).json(error);
    });
})

app.listen(process.env.API_PORT, () => {
    console.log('User data service running on port ' + process.env.API_PORT);
})