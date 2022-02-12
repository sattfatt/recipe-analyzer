import express from "express";
import cors from "cors";

const app = express();
const port = process.env.port || 3800;


app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    res.send("")
});


app.listen(port, () => {
    console.log("Product service listening on port " + port)
})