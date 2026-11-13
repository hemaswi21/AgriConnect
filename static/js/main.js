// AgriConnect Core Client Logic & 100% Pure Bilingual Support
let currentLang = localStorage.getItem("agri_lang") || "te";

const translations = {
    "te": {
        // Navbar
        "nav_home": "హోమ్",
        "nav_crop": "పంట సిఫార్సు",
        "nav_disease": "తెగుళ్ల గుర్తింపు",
        "nav_weather": "వాతావరణం",
        "nav_market": "మార్కెట్ ధరలు",
        "nav_fertilizer": "ఎరువుల సూచన",
        "btn_switch_lang": "Switch to English",

        // Hero
        "hero_title": "AgriConnect: AI ఆధారిత వ్యవసాయ మద్దతు వ్యవస్థ",
        "hero_sub": "నేల స్వభావం ఆధారంగా పంటల సిఫార్సు, ఆకు తెగుళ్ల గుర్తింపు, లైవ్ మార్కెట్ ధరలు మరియు వ్యవసాయ వాతావరణ హెచ్చరికలు ఒకే చోట.",
        "stat_crops": "పంటల సపోర్ట్",
        "stat_accuracy": "మోడల్ ఖచ్చితత్వం",
        "stat_diseases": "ఆకు తెగుళ్లు",
        "stat_mandi": "లైవ్ మార్కెట్ ధరలు",

        // Cards Grid
        "card1_title": "పంట సిఫార్సు",
        "card1_desc": "నేలలోని నత్రజని, భాస్వరం, పొటాషియం (N-P-K), pH, ఉష్ణోగ్రత మరియు వర్షపాతం ఆధారంగా అత్యధిక దిగుబడినిచ్చే పంటను మెషిన్ లెర్నింగ్ మోడల్స్ సిఫార్సు చేస్తాయి.",
        "card1_link": "నేలను విశ్లేషించి పంటను తెలుసుకోండి →",

        "card2_title": "మొక్కల తెగుళ్ల గుర్తింపు",
        "card2_desc": "తెగులు సోకిన ఆకు ఫోటోను అప్‌లోడ్ చేయండి. డీప్ లెర్నింగ్ CNN మోడల్ తెగులును గుర్తించి, సేంద్రీయ మరియు రసాయన నివారణ మందులను వెంటనే సూచిస్తుంది.",
        "card2_link": "ఆకు ఫోటోను స్కాన్ చేయండి →",

        "card3_title": "వాతావరణం & వ్యవసాయ హెచ్చరికలు",
        "card3_desc": "నిజ సమయ వ్యవసాయ-వాతావరణ సూచనలు. వర్షపాతం, ఎండ తీవ్రత మరియు పురుగుమందులు పిచికారీ చేయడానికి సరైన సమయాలపై తక్షణ హెచ్చరికలు.",
        "card3_link": "వాతావరణ సమాచారాన్ని చూడండి →",

        "card4_title": "మార్కెట్ ధరల సమాచారం (మండి)",
        "card4_desc": "తెలంగాణ, ఆంధ్రప్రదేశ్ మరియు భారతదేశంలోని ప్రధాన వ్యవసాయ మార్కెట్ల ప్రస్తుత ధరలు (కనీస, గరిష్ట, సగటు ధరలు ₹/క్వింటాల్).",
        "card4_link": "మార్కెట్ ధరలను ట్రాక్ చేయండి →",

        "card5_title": "ఎరువుల మోతాదు కాలిక్యులేటర్",
        "card5_desc": "నేల పరీక్ష ఫలితాలు మరియు పంట అవసరాల ఆధారంగా ఎకరాకు కావలసిన యూరియా, డీఏపీ (DAP), పొటాష్ బస్తాల సంఖ్యను ఖచ్చితంగా లెక్కిస్తుంది.",
        "card5_link": "ఎరువుల మోతాదును లెక్కించండి →",

        "card6_title": "తెలుగు సహాయం & స్మార్ట్ అసిస్టెంట్",
        "card6_desc": "రైతులకు ఉపయోగపడే స్మార్ట్ అసిస్టెంట్. వ్యవసాయ సలహాలు పొందడానికి, వాయిస్ అసిస్టెంట్ వినడానికి లేదా భాషను మార్చుకోవడానికి ఇక్కడ క్లిక్ చేయండి.",
        "card6_link": "స్మార్ట్ అసిస్టెంట్‌ని తెరవండి →",

        // Buttons
        "btn_predict": "పంటను సిఫార్సు చేయండి",
        "btn_diagnose": "తెగులును గుర్తించండి",
        "btn_calculate": "ఎరువుల మోతాదును లెక్కించండి",

        // Login Page
        "login_title": "రైతు స్వాగతం",
        "login_sub": "AgriConnect లోకి ప్రవేశించడానికి మీ వివరాలను తెలపండి",
        "login_name_label": "👤 రైతు పేరు:",
        "login_name_placeholder": "ఉదా: రామయ్య",
        "login_mobile_label": "📱 మొబైల్ నంబర్:",
        "login_mobile_placeholder": "10 అంకెల నంబర్ (ఉదా: 9876543210)",
        "login_village_label": "📍 గ్రామం / జిల్లా:",
        "login_village_placeholder": "ఉదా: వరంగల్",
        "login_btn_submit": "🌾 ప్రవేశించండి",
        "login_or": "లేదా",
        "login_grandfather_btn": "⚡ సులభ ప్రవేశం (1-క్లిక్ డైరెక్ట్ ఎంట్రీ)",

        // Footer
        "footer_rights": "© 2026 AgriConnect: AI ఆధారిత వ్యవసాయ మద్దతు వ్యవస్థ. సర్వహక్కులు ప్రత్యేకించబడ్డాయి.",
        "footer_sub": "రైతుల కోసం రూపొందించబడింది • మెషిన్ లెర్నింగ్ & డీప్ లెర్నింగ్ ఆధారితం"
    },
    "en": {
        // Navbar
        "nav_home": "Home",
        "nav_crop": "Crop Recommendation",
        "nav_disease": "Disease Detection",
        "nav_weather": "Weather Alerts",
        "nav_market": "Market Prices",
        "nav_fertilizer": "Fertilizer Calculator",
        "btn_switch_lang": "తెలుగులోకి మార్చండి",

        // Hero
        "hero_title": "AgriConnect: AI-Based Agriculture Support System",
        "hero_sub": "Smart crop recommendation, instant plant disease detection, live mandi prices, and agro-weather advisories in one unified platform.",
        "stat_crops": "Crops Supported",
        "stat_accuracy": "Model Accuracy",
        "stat_diseases": "Plant Diseases",
        "stat_mandi": "Live Mandi Rates",

        // Cards Grid
        "card1_title": "Crop Recommendation",
        "card1_desc": "Machine Learning models (Random Forest & Naive Bayes) analyze Soil N-P-K, pH, temperature, and rainfall to recommend the highest yielding crop.",
        "card1_link": "Analyze Soil & Recommend Crop →",

        "card2_title": "Plant Disease Detection",
        "card2_desc": "Upload a smartphone photo of any diseased leaf. Deep Learning CNN model instantly diagnoses the disease with organic & chemical treatment remedies.",
        "card2_link": "Scan Plant Leaf →",

        "card3_title": "Weather & Agro-Advisories",
        "card3_desc": "Live agro-meteorological advisories. Instant alerts for rainfall, frost, heat waves, and best time windows for spraying pesticides and fertilizers.",
        "card3_link": "Check Weather & Alerts →",

        "card4_title": "Mandi Market Prices",
        "card4_desc": "Daily updated APMC Mandi rates across Telangana, Andhra Pradesh, and India. Check Min, Max, and Modal prices with daily price trends.",
        "card4_link": "Track Mandi Rates →",

        "card5_title": "Fertilizer Calculator",
        "card5_desc": "Calculate exact commercial fertilizer requirements (Urea, DAP, MOP bags per acre) based on soil test deficits and target crop nutrition needs.",
        "card5_link": "Calculate Fertilizer Dosage →",

        "card6_title": "Telugu Support & Smart Assist",
        "card6_desc": "Bilingual Farmer AI Assistant. Click to ask agriculture questions, listen to Telugu voice guidance, or toggle language.",
        "card6_link": "Open Smart Assist →",

        // Buttons
        "btn_predict": "Recommend Crop",
        "btn_diagnose": "Scan & Diagnose",
        "btn_calculate": "Calculate Dosage",

        // Login Page
        "login_title": "Farmer Login",
        "login_sub": "Enter your details to enter AgriConnect",
        "login_name_label": "👤 Farmer Name:",
        "login_name_placeholder": "e.g. Ramaiah",
        "login_mobile_label": "📱 Mobile Number:",
        "login_mobile_placeholder": "10-digit mobile number (e.g. 9876543210)",
        "login_village_label": "📍 Village / District:",
        "login_village_placeholder": "e.g. Warangal",
        "login_btn_submit": "🌾 Enter AgriConnect",
        "login_or": "OR",
        "login_grandfather_btn": "⚡ Quick Access (1-Click Direct Entry)",

        // Footer
        "footer_rights": "© 2026 AgriConnect: AI-Based Agriculture Support System. All Rights Reserved.",
        "footer_sub": "Designed for Farmers • Machine Learning & Deep Learning Powered"
    }
};

function toggleLanguage() {
    currentLang = currentLang === "te" ? "en" : "te";
    localStorage.setItem("agri_lang", currentLang);
    applyLanguage();
}

function applyLanguage() {
    const t = translations[currentLang] || translations["te"];
    if (!t) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (t[key]) {
            el.setAttribute("placeholder", t[key]);
        }
    });

    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn && t["btn_switch_lang"]) {
        langBtn.textContent = t["btn_switch_lang"];
    }
}

// Presets for Crop Recommendation
function applyPreset(crop) {
    const presets = {
        "rice": { n: 80, p: 48, k: 40, temp: 24, hum: 82, ph: 6.5, rain: 230 },
        "cotton": { n: 118, p: 46, k: 20, temp: 25, hum: 80, ph: 6.9, rain: 80 },
        "maize": { n: 78, p: 48, k: 20, temp: 23, hum: 65, ph: 6.2, rain: 85 },
        "chickpea": { n: 40, p: 68, k: 80, temp: 19, hum: 17, ph: 7.3, rain: 80 },
        "chilli": { n: 120, p: 60, k: 25, temp: 28, hum: 65, ph: 6.5, rain: 95 },
        "pigeonpea": { n: 21, p: 68, k: 20, temp: 28, hum: 48, ph: 5.8, rain: 150 },
        "groundnut": { n: 23, p: 28, k: 20, temp: 28, hum: 55, ph: 6.2, rain: 65 },
        "banana": { n: 100, p: 82, k: 50, temp: 27, hum: 80, ph: 5.9, rain: 105 },
        "mango": { n: 20, p: 27, k: 30, temp: 31, hum: 50, ph: 5.8, rain: 95 },
        "blackgram": { n: 40, p: 68, k: 19, temp: 30, hum: 65, ph: 7.1, rain: 68 },
        "watermelon": { n: 99, p: 17, k: 50, temp: 26, hum: 85, ph: 6.5, rain: 51 },
        "sugarcane": { n: 80, p: 50, k: 50, temp: 30, hum: 82, ph: 6.5, rain: 180 },
        "coconut": { n: 22, p: 17, k: 30, temp: 27, hum: 95, ph: 6.0, rain: 176 },
        "coffee": { n: 101, p: 29, k: 30, temp: 26, hum: 59, ph: 6.8, rain: 158 }
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
        
        const cropDisplay = currentLang === "te" ? data.telugu : data.crop;
        document.getElementById("resCropName").textContent = cropDisplay;
        document.getElementById("resCropIcon").textContent = data.icon;
        document.getElementById("resConfidence").textContent = currentLang === "te" ? `ఖచ్చితత్వం: ${data.confidence}%` : `Accuracy: ${data.confidence}%`;
        document.getElementById("resSeason").textContent = data.season;
        document.getElementById("resWater").textContent = data.water_req;
        document.getElementById("resSoil").textContent = data.soil_type;

        const altContainer = document.getElementById("resAlternatives");
        altContainer.innerHTML = "";
        data.alternatives.forEach(alt => {
            const badge = document.createElement("span");
            badge.className = "badge badge-info";
            badge.style.marginRight = "6px";
            badge.textContent = `${alt.icon} ${currentLang === "te" ? alt.telugu : alt.crop}`;
            altContainer.appendChild(badge);
        });

        resultBox.classList.add("active");
        resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (err) {
        alert(currentLang === "te" ? "విశ్లేషణ విఫలమైంది. దయచేసి వివరాలను సరిచూసుకోండి." : "Prediction failed. Please check inputs.");
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

        document.getElementById("resDiseaseName").textContent = currentLang === "te" ? data.telugu : data.disease;
        document.getElementById("resDiseaseTelugu").textContent = currentLang === "te" ? data.disease : data.telugu;
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
        alert(currentLang === "te" ? "తెగులు గుర్తింపు విఫలమైంది." : "Diagnosis failed. Try again.");
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

        const bagWord = currentLang === "te" ? "బస్తాలు" : "bags/acre";
        document.getElementById("resFertUrea").textContent = `${data.fertilizer_dosage.urea.kg_per_acre} kg (${data.fertilizer_dosage.urea.bags} ${bagWord})`;
        document.getElementById("resFertDap").textContent = `${data.fertilizer_dosage.dap.kg_per_acre} kg (${data.fertilizer_dosage.dap.bags} ${bagWord})`;
        document.getElementById("resFertMop").textContent = `${data.fertilizer_dosage.mop.kg_per_acre} kg (${data.fertilizer_dosage.mop.bags} ${bagWord})`;
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


// Farmer Login & Session Management
function checkFarmerAuth() {
    const path = window.location.pathname;
    const isLoginPage = path === "/login" || path.endsWith("/login") || path.endsWith("/login.html");
    const farmerData = localStorage.getItem("agri_farmer");

    if (!farmerData && !isLoginPage) {
        window.location.href = "/login";
        return;
    }

    if (farmerData && !isLoginPage) {
        try {
            const farmer = JSON.parse(farmerData);
            renderFarmerWelcomeBadge(farmer);
        } catch(e) {}
    }
}

function renderFarmerWelcomeBadge(farmer) {
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    let badge = document.getElementById("farmerWelcomeBadge");
    if (!badge) {
        const li = document.createElement("li");
        badge = document.createElement("div");
        badge.id = "farmerWelcomeBadge";
        badge.style.display = "flex";
        badge.style.alignItems = "center";
        badge.style.gap = "8px";
        badge.style.background = "rgba(255, 255, 255, 0.25)";
        badge.style.padding = "0.3rem 0.8rem";
        badge.style.borderRadius = "20px";
        badge.style.fontSize = "0.9rem";
        badge.style.color = "#ffffff";
        badge.style.fontWeight = "600";
        badge.style.whiteSpace = "nowrap";

        li.appendChild(badge);
        const langBtn = document.getElementById("langToggleBtn");
        if (langBtn && langBtn.closest("li")) {
            navLinks.insertBefore(li, langBtn.closest("li"));
        } else {
            navLinks.appendChild(li);
        }
    }

    const isTe = currentLang === 'te';
    const welcomeWord = isTe ? `🌾 నమస్కారం, ${farmer.name} గారు!` : `🌾 Welcome, ${farmer.name}!`;
    const logoutWord = isTe ? "మార్చండి" : "Switch";

    badge.innerHTML = `<span>${welcomeWord}</span> <button type="button" onclick="logoutFarmer()" style="background: rgba(0,0,0,0.3); border: none; color: #fef08a; padding: 2px 8px; border-radius: 12px; font-size: 0.78rem; cursor: pointer; font-weight: 600;">${logoutWord}</button>`;
}

function logoutFarmer() {
    localStorage.removeItem("agri_farmer");
    window.location.href = "/login";
}

// Auto check auth & apply saved language on load
document.addEventListener("DOMContentLoaded", () => {
    applyLanguage();
    checkFarmerAuth();
});
