from flask import Flask, request, jsonify
from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification
from flask_cors import CORS
import torch
import torch.nn.functional as F
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Load sentiment model
sentiment_model_name = "w11wo/indonesian-roberta-base-sentiment-classifier"
sentiment_nlp = pipeline("sentiment-analysis", model=sentiment_model_name, tokenizer=sentiment_model_name)

# Load fake news model
fakenews_model_name = "jy46604790/Fake-News-Bert-Detect"
fakenews_tokenizer = AutoTokenizer.from_pretrained(fakenews_model_name)
fakenews_model = AutoModelForSequenceClassification.from_pretrained(fakenews_model_name)
fakenews_nlp = pipeline("text-classification", model=fakenews_model, tokenizer=fakenews_tokenizer)

MODEL_NAME = "jy46604790/Fake-News-Bert-Detect"
MAX_LENGTH = 512  # Maximum sequence length for BERT


# Endpoint: Sentiment Analysis
@app.route("/api/sentiment", methods=["POST"])
def analyze_sentiment():
    data = request.get_json()
    text = data.get("text")
    if not text:
        return jsonify({"error": "No text provided"}), 400
    result = sentiment_nlp(text)
    return jsonify(result[0])

# Endpoint: Fake News Detection
try:
    logger.info("Loading tokenizer and model...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
    logger.info("Model loaded successfully")
    
    # Set model to eval mode and move to GPU if available
    model.eval()
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)
    
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    raise e

@app.route("/api/fakenews", methods=["POST"])
def detect_fakenews():
    try:
        # Validate input
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "No text provided"}), 400
            
        text = data["text"].strip()
        if not text:
            return jsonify({"error": "Empty text"}), 400
            
        logger.info(f"Processing text (length: {len(text)})...")
        
        # Tokenize with truncation
        inputs = tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            padding=True,
            max_length=MAX_LENGTH
        ).to(device)
        
        # Predict
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probs = F.softmax(logits, dim=1)
        
        # Get results
        predicted_class = torch.argmax(probs).item()
        confidence = probs[0][predicted_class].item()
        labels = ["FAKE", "REAL"]
        
        response = {
            "label": labels[predicted_class],
            "score": confidence,
            "text_length": len(text),
            "truncated": len(text) > MAX_LENGTH
        }
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in fake news detection: {str(e)}")
        return jsonify({
            "error": "Failed to process request",
            "details": str(e)
        }), 500


# Add this to your Flask app (after the other model imports)
# Load clickbait model
clickbait_model_name = "christinacdl/XLM_RoBERTa-Multilingual-Clickbait-Detection"
clickbait_tokenizer = AutoTokenizer.from_pretrained(clickbait_model_name)
clickbait_model = AutoModelForSequenceClassification.from_pretrained(clickbait_model_name)
clickbait_nlp = pipeline(
    "text-classification", 
    model=clickbait_model, 
    tokenizer=clickbait_tokenizer,
    device=0 if torch.cuda.is_available() else -1
)

# Endpoint: Clickbait Detection
@app.route("/api/clickbait", methods=["POST"])
def detect_clickbait():
    try:
        data = request.get_json()
        if not data or "text" not in data:
            return jsonify({"error": "Invalid input"}), 400
            
        text = data["text"]
        if not text.strip():
            return jsonify({"error": "Empty text"}), 400
            
        result = clickbait_nlp(text)
        
        response = {
            "label": result[0]["label"].upper(),  # Will be "CLICKBAIT" or "NOT"
            "score": result[0]["score"]
        }

        return jsonify(response)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
