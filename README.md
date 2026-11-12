# 🌾 AgriConnect: AI-Based Agriculture Support System

AgriConnect is an end-to-end intelligent agricultural decision support platform built using Machine Learning, Deep Learning heuristics, Agro-meteorology advisories, and Mandi market intelligence.

---

## 🌟 Modules Implemented (Based on Presentation PPT)

1. **🌱 Crop Recommendation System:**
   - **Inputs:** Soil N (Nitrogen), P (Phosphorus), K (Potassium), Temperature, Humidity, Soil pH, Rainfall.
   - **Model:** Gaussian Naive Bayes / Random Forest trained on standard Kaggle crop benchmark dataset (2200 samples across 22 crops).
   - **Features:** High-accuracy crop prediction with primary and alternative crop options, soil suitability badges, and seasonal guidance.

2. **🍃 Plant Disease Detection:**
   - **Input:** Diseased leaf photo (JPG/PNG).
   - **Model:** Deep Learning CNN / PlantVillage knowledge model.
   - **Diseases Identified:** Early Blight, Late Blight, Bacterial Blight, Rice Blast, Cotton Leaf Curl, Rust, Scab, etc.
   - **Advisory:** Pathogen classification (Fungus/Bacteria/Virus), Symptoms, Organic / Bio remedies, and Chemical fungicides/insecticides.

3. **🌦️ Weather & Agro-Advisories:**
   - Real-time temperature, humidity, rain probability, and wind speed.
   - Actionable farm alerts: Spraying time windows, irrigation schedules, rain warnings.

4. **💰 APMC Mandi Market Prices:**
   - Real-time commodity prices (Min, Max, Modal price in ₹/Quintal) across major APMC markets (Warangal, Guntur, Nizamabad, Kurnool, Miryalaguda, etc.).
   - Price trend indicators and quick search filters.

5. **🧪 Precision Fertilizer Dosage Calculator:**
   - Calculates scientific nutrient deficits based on soil test results and target crop needs.
   - Prescribes exact bags and kilograms of **Urea**, **DAP**, and **Muriate of Potash (MOP)** per acre.

6. **🗣️ Bilingual Support (English & Telugu):**
   - Instant language switch button for rural farmers and academic evaluations.

---

## 🚀 How to Run the Project

1. Open a terminal in the project directory:
   ```bash
   cd "C:\Users\91707\Desktop\intern connect"
   ```

2. Run the application:
   ```bash
   python app.py
   ```

3. Open your browser and navigate to:
   ```text
   http://127.0.0.1:5000
   ```

---

## 📂 Project Directory Structure

```text
intern connect/
│
├── dataset model/
│   ├── Crop_recommendation.csv    # Benchmark Kaggle dataset (2,200 rows)
│   └── train_crop_model.py        # Dataset generation & training script
│
├── static/
│   ├── css/
│   │   └── style.css              # Custom agricultural UI styling
│   └── js/
│       └── main.js                # Frontend API calls & bilingual logic
│
├── templates/
│   ├── index.html                 # Main Landing Dashboard
│   ├── crop.html                  # Crop Recommendation page
│   ├── disease.html               # Leaf Disease Detection page
│   ├── weather.html               # Weather & Agro-Advisories page
│   ├── market.html                # Mandi Rates tracker
│   └── fertilizer.html            # Fertilizer Dosage calculator
│
├── app.py                         # Application server (Flask / HTTP runner)
├── ml_engine.py                   # Core AI engines & agronomic logic
├── requirements.txt               # Dependencies
└── README.md                      # Documentation
```

