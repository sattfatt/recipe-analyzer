import express from "express";
import data from "./FakeData.mjs";
import cors from "cors";

const app = express();
const port = process.env.port || 3500;


app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    res.send(data);
});

app.listen(port, () => {
    console.log('Recipe Scraper running on port ' + port);
})