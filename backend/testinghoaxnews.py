from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

# Load model dan tokenizer
model_name = "jy46604790/Fake-News-Bert-Detect"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Contoh input (ganti dengan berita yang ingin kamu uji)
text = "COVID-19 vaccines contain microchips used to track people."

# Tokenisasi input
inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)

# Prediksi
with torch.no_grad():
    outputs = model(**inputs)
    logits = outputs.logits
    probs = F.softmax(logits, dim=1)

# Label dan probabilitas
predicted_class = torch.argmax(probs).item()
labels = ["FAKE", "REAL"]
confidence = probs[0][predicted_class].item()

# Output hasil prediksi
print(f"Teks: {text}")
print(f"Prediksi: {labels[predicted_class]} ({confidence * 100:.2f}%)")
