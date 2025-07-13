from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline
import torch

# Inisialisasi model dan tokenizer
model_name = "christinacdl/XLM_RoBERTa-Multilingual-Clickbait-Detection"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

# Buat pipeline untuk klasifikasi
clickbait_detector = pipeline(
    "text-classification",
    model=model,
    tokenizer=tokenizer,
    device=0 if torch.cuda.is_available() else -1  # Gunakan GPU jika tersedia
)

# Contoh judul untuk diuji
headlines = [
    "Anda tidak akan percaya apa yang terjadi selanjutnya!",
    "Presiden mengumumkan kebijakan baru",
    "GADUH! Artis ternama tertangkap narkoba",
    "3 Teknologi Senjata dalam Perang Modern Saat Ini"
]

# Deteksi clickbait
for headline in headlines:
    result = clickbait_detector(headline)[0]
    print(f"\nJudul: {headline}")
    print(f"Prediksi: {result['label']} (Skor: {result['score']:.2%})")
    print("➡️ Sensasional" if result['label'] == "clickbait" else "➡️ Normal")