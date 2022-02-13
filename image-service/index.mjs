import express from "express";
import cors from "cors";

const app = express();

const port = process.env.port || 3700;

app.use(express.urlencoded({extended: true}));

app.use(cors({origin: "*"}));

app.get("/", (req, res) => {
    res.send({link : "https://picsum.photos/200"});
})

app.listen(port, ()=>{
    console.log("Image service running on port ", + port);
})