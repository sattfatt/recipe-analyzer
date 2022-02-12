import express, { application } from "express";
import cors from "cors";


const app = express();
const port = process.env.port || 3600;
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));

app.post("/", (req, res)=> {
    res.send({fat: "10", carbs: "40", protein: "16", score: "670"});
});

app.listen(port, () => {
    console.log("nutrition service running on port ", port);
})