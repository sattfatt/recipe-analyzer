import spacy
from spacy.tokens import DocBin
import random
import copy

nlp = spacy.blank('en');

'''
Training: 
python nlp-train.py
python -m spacy train ./config.cfg --output ./ --paths.train ./training.spacy --paths.dev ./validation.spacy --training.eval_frequency 10 --training.max_steps 100
'''

training_data = [
    ("Preheat oven or toaster to 375 degrees.", [(8,12,"TOOL"), (16,23,"TOOL")]),
    ("Place pitas on a nonstick baking sheet and bake for about 5–8 minutes until golden brown and chicken is heated through. Serve immediately.", [(17,38,"TOOL")]),
    ("Mix chicken and barbeque sauce in a large bowl.", [(36,46,"TOOL")]),
    ("Pour cereal flakes into a large plastic bag and crush into small pieces.", [(26,43,"TOOL")]),
    ("Lightly coat a baking sheet with cooking spray.", [(15,27,'TOOL')]),
    ("In a skillet, heat oil over medium heat. Add onion and sauté until light brown, about 5 minutes.", [(5,12,'TOOL')]),
    ("In a saucepan, prepare noodles according to package directions. Drain when cooked.", [(5,13,'TOOL')]),
    ("Warm the tortillas on a griddle, or wrap in foil and heat in the oven.", [(24, 31, "TOOL"), (44, 48, "TOOL"), (65, 69, "TOOL")]),
    ("Spoon into 4-ounce ice-pop molds or 3-ounce paper cups.", [(11, 32, "TOOL"), (36, 54, "TOOL")]),
    ("Add ingredients to blender.", [(19, 26, "TOOL")]),
    ("In a medium pan, put soaked beans, water, onion, garlic powder and olive oil.", [(5, 15, "TOOL")]),
    ("In a large soup pot, heat oil over medium heat. Add carrots, celery, and onions; cook and stir until the onion is tender.", [(5, 19, "TOOL")]),
    ("For each pizza, spread ¼ cup tomato sauce on a pita and top with ¼ cup chicken, ¼ cup broccoli, ½ tablespoon parmesan cheese, and ¼ tablespoon chopped basil.", []),
    ("Mix eggs, mushrooms, bell peppers and black pepper in a medium mixing bowl.", [(56, 74, "TOOL")]),
]

shuffled = copy.deepcopy(training_data)
random.shuffle(shuffled)
training_data += shuffled

shuffled = copy.deepcopy(training_data)
random.shuffle(shuffled)
training_data += shuffled

validation_data = [
    ("Brown chicken in melted fat in a frying pan. Add onion; cook 2 to 3 minutes.", [(33, 43, "TOOL")]),
    ("To serve, place 1 cup of egg noodles on plate. ", [(40,45,'TOOL')]),
    ("Mix eggs, milk and seasonings in a bowl.", [(35, 39, "TOOL")]),
    ("Heat oil in skillet over medium-high heat (350 degrees in an electric skillet).", [(12, 19, "TOOL"),(61, 77, "TOOL")]),
    ("Warm the refried beans in a separate pan.", [(37, 40, "TOOL")]),
    ("In a medium pan, put soaked beans, water, onion, garlic powder and olive oil.", [(5, 15, "TOOL")]),
    ("Pour into prepared baking pan and smooth into corners.", [(19, 29, "TOOL")]),
]


def convert(data, fileName):
    # the DocBin will store the example documents
    db = DocBin()
    for text, annotations in data:
        doc = nlp.make_doc(text)
        ents = []
        for start, end, label in annotations:
            span = doc.char_span(start, end, label=label)
            ents.append(span)
        doc.ents = ents
        db.add(doc)
    db.to_disk("./" + fileName + ".spacy")


convert(training_data, "training")
convert(validation_data, "validation")