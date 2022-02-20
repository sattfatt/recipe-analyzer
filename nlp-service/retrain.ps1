python nlp-train.py
python -m spacy train ./config.cfg --output ./ --paths.train ./training.spacy --paths.dev ./validation.spacy --training.eval_frequency 10 --training.max_steps 100