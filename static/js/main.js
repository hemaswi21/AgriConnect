// AgriConnect Core Client Logic & Bilingual Support
let currentLang = localStorage.getItem("agri_lang") || "te";

const translations = {
    "te": {
        "nav_home": "హోమ్ (Home)",
        "nav_crop": "పంట సిఫార్సు (Crop)",
        "nav_disease": "తెగుళ్ల గుర్తింపు (Disease)",
        "nav_weather": "వాతావరణం (Weather)",
        "nav_market": "మార్కెట్ ధరలు (Mandi)",
        "nav_fertilizer": "ఎరువులు (Fertilizer)",
        "hero_title": "AgriConnect: AI ఆధారిత వ్యవసాయ మద్దతు వ్యవస్థ",
        "hero_sub": "నేల స్వభావం ఆధారంగా పంటల సిఫార్సు, ఆకు తెగుళ్ల గుర్తింపు, లైవ్ మార్కెట్ ధరలు మరియు వ్యవసాయ వాతావరణ హెచ్చరికలు ఒకే చోట.",
        "btn_switch_lang": "Switch to English",
        "btn_predict": "విశ్లేషించండి (Predict)",
        "btn_diagnose": "తెగులును గుర్తించండి (Diagnose)",
        "btn_calculate": "ఎరువులను లెక్కించండి (Calculate)"
    },
    "en": {
        "nav_home": "Home",
        "nav_crop": "Crop Recommendation",
        "nav_disease": "Disease Detection",
        "nav_weather": "Weather & Alerts",
        "nav_market": "Market Prices",
        "nav_fertilizer": "Fertilizer Calculator",
        "hero_title": "AgriConnect: AI-Based Agriculture Support System",
        "hero_sub": "Smart crop recommendation, instant plant disease detection, live mandi prices, and agro-weather advisories in one unified platform.",
        "btn_switch_lang": "తెలుగులోకి మార్చండి",
        "btn_predict": "Recommend Crop",
        "btn_diagnose": "Scan & Diagnose",
        "btn_calculate": "Calculate Dosage"
    }
};

function toggleLanguage() {
    currentLang = currentLang === "te" ? "en" : "te";
    localStorage.setItem("agri_lang", currentLang);
    applyLanguage();
}

function applyLanguage() {
    const t = translations[currentLang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn) {
        langBtn.textContent = t["btn_switch_lang"];
    }
}

// Presets for Crop Recommendation
function applyPreset(crop) {
    const presets = {
        "rice": { n: 80, p: 48, k: 40, temp: 24, hum: 82, ph: 6.5, rain: 230 },
        "cotton": { n: 118, p: 46, k: 20, temp: 25, hum: 80, ph: 6.9, rain: 80 },
        "maize": { n: 78, p: 48, k: 20, temp: 23, hum: 65, ph: 6.2, rain: 85 },
        "chickpea": { n: 40, p: 68, k: 80, temp: 19, hum: 17, ph: 7.3, rain: 80 }
    };
    const data = presets[crop];
    if (data) {
        document.getElementById("nitrogen").value = data.n;
        document.getElementById("phosphorus").value = data.p;
        document.getElementById("potassium").value = data.k;
        document.getElementById("temperature").value = data.temp;
        document.getElementById("humidity").value = data.hum;
        document.getElementById("ph").value = data.ph;
        document.getElementById("rainfall").value = data.rain;
    }
}

// Crop Recommendation Submit
async function submitCropForm(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById("cropSubmitBtn");
    const resultBox = document.getElementById("cropResult");
    btn.disabled = true;
    btn.innerHTML = "⏳ AI Analyzing...";

    const payload = {
        n: parseFloat(document.getElementById("nitrogen").value),
        p: parseFloat(document.getElementById("phosphorus").value),
        k: parseFloat(document.getElementById("potassium").value),
        temp: parseFloat(document.getElementById("temperature").value),
        humidity: parseFloat(document.getElementById("humidity").value),
        ph: parseFloat(document.getElementById("ph").value),
        rainfall: parseFloat(document.getElementById("rainfall").value)
    };

    try {
        const res = await fetch("/api/recommend-crop", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        
        document.getElementById("resCropName").textContent = `${data.crop} - ${data.telugu}`;
        document.getElementById("resCropIcon").textContent = data.icon;
        document.getElementById("resConfidence").textContent = `Accuracy: ${data.confidence}%`;
        document.getElementById("resSeason").textContent = data.season;
        document.getElementById("resWater").textContent = data.water_req;
        document.getElementById("resSoil").textContent = data.soil_type;

        const altContainer = document.getElementById("resAlternatives");
        altContainer.innerHTML = "";
        data.alternatives.forEach(alt => {
            const badge = document.createElement("span");
            badge.className = "badge badge-info";
            badge.style.marginRight = "6px";
            badge.textContent = `${alt.icon} ${alt.crop} (${alt.telugu})`;
            altContainer.appendChild(badge);
        });

        resultBox.classList.add("active");
        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (err) {
        alert("Prediction failed. Please check inputs.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = "🌱 " + (translations[currentLang]["btn_predict"]);
    }
}

// Leaf Disease Diagnosis
async function submitDiseaseScan(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById("diseaseSubmitBtn");
    const fileInput = document.getElementById("leafImageInput");
    const cropHint = document.getElementById("cropSelect") ? document.getElementById("cropSelect").value : "tomato";
    const resultBox = document.getElementById("diseaseResult");

    btn.disabled = true;
    btn.innerHTML = "🔬 CNN Scanning Leaf...";

    const formData = new FormData();
    if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
    }
    formData.append("crop", cropHint);

    try {
        const res = await fetch("/api/detect-disease", {
            method: "POST",
            body: formData
        });
        const data = await res.json();

        document.getElementById("resDiseaseName").textContent = data.disease;
        document.getElementById("resDiseaseTelugu").textContent = data.telugu;
        document.getElementById("resPathogen").textContent = data.pathogen;
        document.getElementById("resSeverity").textContent = data.severity;
        document.getElementById("resConfidence").textContent = `${data.confidence}% Confidence`;
        document.getElementById("resSymptoms").textContent = currentLang === "te" ? data.symptoms_te : data.symptoms;
        document.getElementById("resOrganic").textContent = currentLang === "te" ? data.organic_treatment_te : data.organic_treatment;
        document.getElementById("resChemical").textContent = currentLang === "te" ? data.chemical_treatment_te : data.chemical_treatment;
        document.getElementById("resPrevention").textContent = data.prevention;

        resultBox.classList.add("active");
        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (err) {
        alert("Diagnosis failed. Try again.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = "🔍 " + (translations[currentLang]["btn_diagnose"]);
    }
}

// Fertilizer Suggestion
async function submitFertilizerForm(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById("fertSubmitBtn");
    const resultBox = document.getElementById("fertResult");

    btn.disabled = true;
    btn.innerHTML = "⏳ Calculating...";

    const payload = {
        soil_n: parseFloat(document.getElementById("fert_n").value),
        soil_p: parseFloat(document.getElementById("fert_p").value),
        soil_k: parseFloat(document.getElementById("fert_k").value),
        crop: document.getElementById("fert_crop").value
    };

    try {
        const res = await fetch("/api/recommend-fertilizer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        document.getElementById("resFertUrea").textContent = `${data.fertilizer_dosage.urea.kg_per_acre} kg (${data.fertilizer_dosage.urea.bags} bags/acre)`;
        document.getElementById("resFertDap").textContent = `${data.fertilizer_dosage.dap.kg_per_acre} kg (${data.fertilizer_dosage.dap.bags} bags/acre)`;
        document.getElementById("resFertMop").textContent = `${data.fertilizer_dosage.mop.kg_per_acre} kg (${data.fertilizer_dosage.mop.bags} bags/acre)`;
        document.getElementById("resOrganicAlt").textContent = data.organic_alternative;

        resultBox.classList.add("active");
        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (err) {
        alert("Fertilizer calculation failed.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = "🧪 " + (translations[currentLang]["btn_calculate"]);
    }
}

// Weather search
async function searchWeather() {
    const city = document.getElementById("weatherCityInput").value.trim() || "Warangal";
    try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await res.json();

        document.getElementById("wCity").textContent = data.city;
        document.getElementById("wTemp").textContent = `${data.temp}°C`;
        document.getElementById("wCondition").textContent = data.condition;
        document.getElementById("wHumidity").textContent = `${data.humidity}%`;
        document.getElementById("wRain").textContent = `${data.rain_prob}%`;
        document.getElementById("wWind").textContent = `${data.wind_speed} km/h`;

        const advContainer = document.getElementById("wAdvisories");
        advContainer.innerHTML = "";
        data.advisories.forEach(adv => {
            const div = document.createElement("div");
            div.className = `stat-item alert-${adv.type}`;
            div.style.marginBottom = "0.8rem";
            div.style.borderLeft = "4px solid #16a34a";
            div.style.background = "#f0fdf4";
            div.style.padding = "0.8rem";
            div.style.borderRadius = "8px";
            div.innerHTML = `<strong>${adv.title}</strong><p style="margin: 4px 0; font-size: 0.9rem;">${currentLang === "te" ? adv.msg_te : adv.msg}</p>`;
            advContainer.appendChild(div);
        });
    } catch (e) {
        alert("Weather lookup failed.");
    }
}

// Live Leaf Image Preview
function previewLeafImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById("leafPreviewImg");
            preview.src = e.target.result;
            preview.style.display = "block";
            document.getElementById("uploadPrompt").style.display = "none";
        };
        reader.readAsDataURL(input.files[0]);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    applyLanguage();
});

