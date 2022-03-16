import express, { application } from "express";
import cors from "cors";
import getNutritionData from "./nutrition.mjs";


const app = express();
const port = process.env.port || 3600;
app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cors({
    origin: '*'
}));

app.post("/", (req, res)=> {

    getNutritionData(req.body.ingredients, req.body.servings).then((data) => {
        res.status(200).send(data)
    }).catch((error) => {
        res.status(404).send({fat: "na", carbs: "na", protein: "na", score: "na"})
        console.error(error)
    })

    //res.send({fat: "10", carbs: "40", protein: "16", score: "670"});
});

app.listen(port, () => {
    console.log("nutrition service running on port ", port);
})