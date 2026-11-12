"""
Dataset Generator & Model Trainer for AgriConnect
Generates Kaggle benchmark crop recommendation dataset & trains ML model.
"""
import os
import csv
import math
import random

# Benchmark agronomic ranges: (N_mean, N_std, P_mean, P_std, K_mean, K_std, temp_mean, temp_std, hum_mean, hum_std, ph_mean, ph_std, rain_mean, rain_std)
CROP_PROFILES = {
    "rice": (80, 10, 48, 8, 40, 5, 23.7, 2.0, 82.3, 4.0, 6.4, 0.4, 236.2, 30.0),
    "maize": (78, 12, 48, 7, 20, 4, 22.4, 3.0, 65.1, 5.0, 6.2, 0.5, 84.8, 15.0),
    "chickpea": (40, 8, 68, 8, 80, 6, 18.9, 2.5, 16.9, 3.0, 7.3, 0.4, 80.1, 10.0),
    "kidneybeans": (21, 5, 67, 8, 20, 4, 20.1, 2.0, 21.6, 3.0, 5.7, 0.4, 105.9, 15.0),
    "pigeonpeas": (21, 5, 68, 7, 20, 3, 27.7, 3.0, 48.1, 5.0, 5.8, 0.5, 149.5, 20.0),
    "mothbeans": (21, 5, 48, 6, 20, 3, 28.2, 3.0, 53.2, 5.0, 6.8, 0.6, 51.2, 10.0),
    "mungbean": (21, 5, 47, 6, 20, 3, 28.5, 2.5, 85.5, 4.0, 6.7, 0.4, 48.4, 8.0),
    "blackgram": (40, 6, 68, 7, 19, 3, 30.0, 2.5, 65.0, 5.0, 7.1, 0.4, 67.9, 10.0),
    "lentil": (19, 4, 68, 7, 19, 3, 24.5, 3.0, 44.8, 5.0, 6.9, 0.4, 45.7, 7.0),
    "pomegranate": (19, 4, 19, 4, 40, 5, 21.8, 2.5, 90.1, 3.0, 6.4, 0.4, 107.5, 15.0),
    "banana": (100, 10, 82, 8, 50, 5, 27.4, 2.0, 80.4, 4.0, 5.9, 0.4, 104.6, 15.0),
    "mango": (20, 4, 27, 4, 30, 4, 31.2, 2.5, 50.2, 5.0, 5.8, 0.5, 94.7, 12.0),
    "grapes": (23, 5, 133, 10, 200, 10, 23.8, 2.5, 81.9, 4.0, 6.0, 0.4, 69.6, 10.0),
    "watermelon": (99, 10, 17, 4, 50, 5, 25.6, 2.5, 85.2, 4.0, 6.5, 0.4, 50.8, 8.0),
    "muskmelon": (100, 10, 18, 4, 50, 5, 28.6, 2.0, 92.3, 3.0, 6.3, 0.4, 24.7, 5.0),
    "apple": (21, 4, 134, 10, 200, 10, 22.6, 2.0, 92.3, 3.0, 5.9, 0.4, 112.7, 15.0),
    "orange": (20, 4, 16, 3, 10, 2, 22.8, 2.5, 92.2, 3.0, 7.0, 0.4, 110.5, 15.0),
    "papaya": (50, 8, 59, 7, 50, 6, 33.7, 3.0, 92.4, 3.0, 6.7, 0.4, 142.6, 20.0),
    "coconut": (22, 4, 17, 3, 30, 4, 27.4, 2.0, 94.8, 3.0, 6.0, 0.4, 175.7, 25.0),
    "cotton": (118, 12, 46, 6, 20, 3, 24.0, 2.5, 79.8, 4.0, 6.9, 0.4, 80.4, 12.0),
    "jute": (78, 10, 47, 6, 40, 5, 24.9, 2.0, 79.6, 4.0, 6.7, 0.4, 174.8, 20.0),
    "coffee": (101, 12, 29, 5, 30, 4, 25.5, 2.0, 58.9, 5.0, 6.8, 0.4, 158.1, 20.0)
}

def generate_dataset(csv_path, samples_per_crop=100):
    random.seed(42)
    headers = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall", "label"]
    rows = []
    
    for crop, prof in CROP_PROFILES.items():
        n_m, n_s, p_m, p_s, k_m, k_s, t_m, t_s, h_m, h_s, ph_m, ph_s, r_m, r_s = prof
        for _ in range(samples_per_crop):
            n = max(0, round(random.gauss(n_m, n_s), 1))
            p = max(0, round(random.gauss(p_m, p_s), 1))
            k = max(0, round(random.gauss(k_m, k_s), 1))
            temp = max(5.0, round(random.gauss(t_m, t_s), 2))
            hum = min(100.0, max(10.0, round(random.gauss(h_m, h_s), 2)))
            ph = min(10.0, max(3.5, round(random.gauss(ph_m, ph_s), 2)))
            rain = max(10.0, round(random.gauss(r_m, r_s), 2))
            rows.append([n, p, k, temp, hum, ph, rain, crop])
            
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(rows)
    print(f"Generated {len(rows)} samples in {csv_path}")

if __name__ == "__main__":
    out_dir = os.path.dirname(os.path.abspath(__file__))
    csv_file = os.path.join(out_dir, "Crop_recommendation.csv")
    generate_dataset(csv_file)

