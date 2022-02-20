import express from "express";
import data from "./FakeData.mjs";
import cors from "cors";
import puppeteer from "puppeteer";
import fetch from "node-fetch";

const app = express();
const port = process.env.port || 3500;

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*'
}));

const scrape_recipe = async (url) => {

    // create a browser and open a new page
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();

    // go to the url
    await page.goto(url);

    // data containers
    const ingredients = [];
    const preperation = [];
    const quantities = [];
    const units = [];
    
    
    // parse out ingredients and quantities and units and steps
    const ingredientsElement = await page.$('.field--type-ingredient');
    const children = await ingredientsElement.$$(':scope>*');
    const stepsElement = await page.$('.field--name-recipe-instructions > div:nth-child(2) > ol:nth-child(1)');
    const stepsText = await stepsElement.evaluate(el=>el.innerText);
    const steps = stepsText.split("\n");
    
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        const [quantEl, nameEl] = await element.$$(':scope>*');
        const name = await nameEl.evaluate(el => el.innerText)
        const [ing, prep] = name.split("(");
        ingredients.push(ing.trim());
        preperation.push(prep?prep.replace(/\)+$/g, ""):"none");
        const temp = await quantEl.evaluate(el => el.innerText);
        const [num, unit] = temp.split(" ");
        quantities.push(num);
        units.push(unit ? unit : "count")
    }
    
    // parse out appliances/tools (thinking about using spacy for this.)
    let tools = [];

    for (const step of steps) {
        const response = await fetch(`http://localhost:8000/?text=${step}`, {method:"GET"});
        const tool = await response.json()
        
        tools = tools.concat(tool.tools)
    }

    tools = Array.from(new Set(tools))

    browser.close();
    return { "ingredients": ingredients, "quantities": quantities, "units": units, "preparation": preperation, "tools":tools, "steps":steps};
}




app.get("/", (req, res) => {
    scrape_recipe(req.query.url).then((data) => {
        res.send(data);
    }).catch(error => {
        console.error(error)
        res.send({ "error": "Recipe scraper service could not parse given url properly" })
    });
});

app.listen(port, () => {
    console.log('Recipe Scraper running on port ' + port);
})