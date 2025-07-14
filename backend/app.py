# === app.py ===
import pickle
from flask import Flask, request, jsonify
from tensorflow.keras.preprocessing.sequence import pad_sequences
from googletrans import Translator
import numpy as np

app = Flask(__name__)
translator = Translator()

# Load model dan tokenizer dari realorfake.pth
with open("realorfake.pth", "rb") as f:
    data = pickle.load(f)
model = data['model']
tokenizer = data['tokenizer']

MAX_SEQUENCE_LENGTH = 500

@app.route("/api/classify", methods=["POST"])
def classify_news():
    json_data = request.get_json()
    input_text = json_data.get("text")

    # Translate
    translated = translator.translate(input_text, src='auto', dest='en').text

    # Sequence dan padding
    sequence = tokenizer.texts_to_sequences([translated])
    padded = pad_sequences(sequence, maxlen=MAX_SEQUENCE_LENGTH, padding='pre')

    # Predict
    prediction = model.predict(padded)[0][0]
    label = "REAL" if prediction >= 0.5 and prediction >= 0.8 else "FAKE"

    return jsonify({"label": label})

if __name__ == "__main__":
    app.run(debug=True)
