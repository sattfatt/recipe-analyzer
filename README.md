# recipe-analyzer
A simple recipe analyzer built with React frontend and a few microservices

### Image Service
~~To start the image service do: `node index.mjs` in the image-service directory~~
(NO LONGER NEEDED)

### Nutrition Service
To start the nutrition service do: `node index.mjs` in the nutrition-service directory

### Recipe Scraper Service
To start this service do: `node server.mjs` in the recipe-scraper-service directory (idk why I named it differently. okay? jeez.)

### UI
To start the main react ui do: `npm start` in the recipe-analyzer-ui directory

### NLP service
To start the nlp service do: `python flask-app.py` in the nlp-service directory.
To train the model, add training and validation data to /nlp_service/nlp-train.py, then run `retrain.ps1`

### User Data Service
To start this service do: `node index.mjs` in the user-data-service directory.

### Authentication Service
You will need this code from: [Here](https://github.com/JackLaBarba/recipe_flow/tree/master/auth-service)


### Node version
`16.13.1`
