import express from "express";
import cors from "cors";

const app = express();
const port = process.env.port || 3800;


app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    res.send({link : "https://www.amazon.com/NVIDIA-RTX-3090-Founders-Graphics/dp/B08HR6ZBYJ/ref=sr_1_3?crid=2CA68GN8QMYPG&keywords=rtx+3090+founders&qid=1644693656&sprefix=rtx+3090+founders%2Caps%2C130&sr=8-3"})
});


app.listen(port, () => {
    console.log("Product service listening on port " + port)
})