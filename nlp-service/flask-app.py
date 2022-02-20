from flask import Flask, request
from flask import jsonify
from flask_cors import CORS
import spacy

nlp = spacy.load("./model-last")

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def onGet():
    doc = nlp(request.args['text'])
    tools = []
    for ent in doc.ents:
        tools.append(ent.text)
    return jsonify({'tools' : tools})

app.run(debug=True, port=8000)