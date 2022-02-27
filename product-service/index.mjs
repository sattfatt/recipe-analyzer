import express from "express";
import cors from "cors";
import product_service from "./service.mjs";

const app = express();
const port = process.env.port || 3800;
const PRODUCT_SERVICE_URI = "https://cs-361-product-search.herokuapp.com/" //?source={source}&item={item_name}"


app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {

    // send request to product service by Travis
    product_service("amazon", req.query.product).then((result)=> {
        res.status(200).send({link : result});
    });
});


app.listen(port, () => {
    console.log("Product service listening on port " + port)
})