"""
Generates AgriConnect_Final_Presentation.pptx using python-pptx.
Run:
    pip install python-pptx
    python generate_pptx.py
"""
import sys

try:
    from pptx import Presentation
    from pptx.util import Inches, Pt
    from pptx.enum.text import PP_ALIGN
    from pptx.dml.color import RGBColor
except ImportError:
    print("python-pptx not installed. Please run: pip install python-pptx")
    sys.exit(1)

prs = Presentation()
prs.slide_width = Inches(13.333)  # 16:9 widescreen
prs.slide_height = Inches(7.5)

# Color Palette
DARK_GREEN = RGBColor(22, 101, 52)
LIGHT_GREEN = RGBColor(220, 252, 231)
ACCENT_GOLD = RGBColor(202, 138, 4)
TEXT_DARK = RGBColor(30, 41, 59)
TEXT_MUTED = RGBColor(100, 116, 139)
WHITE = RGBColor(255, 255, 255)

def add_header(slide, title_text, subtitle_text=""):
    # Header container
    tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.5), Inches(11.7), Inches(1.2))
    p = tb.text_frame.paragraphs[0]
    p.text = title_text
    p.font.size = Pt(28)
    p.font.bold = True
    p.font.color.rgb = DARK_GREEN
    
    if subtitle_text:
        p2 = tb.text_frame.add_paragraph()
        p2.text = subtitle_text
        p2.font.size = Pt(14)
        p2.font.color.rgb = TEXT_MUTED

# Slide 1: Title Slide
slide_layout = prs.slide_layouts[6]
s1 = prs.slides.add_slide(slide_layout)
tb = s1.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(11.3), Inches(4.0))
p = tb.text_frame.paragraphs[0]
p.text = "🌾 AgriConnect"
p.font.size = Pt(44)
p.font.bold = True
p.font.color.rgb = DARK_GREEN

p2 = tb.text_frame.add_paragraph()
p2.text = "AI-Based Agriculture Support System"
p2.font.size = Pt(24)
p2.font.bold = True
p2.font.color.rgb = ACCENT_GOLD

p3 = tb.text_frame.add_paragraph()
p3.text = "\nSmart Crop Recommendation • Leaf Disease Detection • Weather Alerts • Mandi Rates"
p3.font.size = Pt(16)
p3.font.color.rgb = TEXT_MUTED

p4 = tb.text_frame.add_paragraph()
p4.text = "\n🌐 Live Cloud Web App: https://agriconnect-ai-p249.onrender.com"
p4.font.size = Pt(14)
p4.font.color.rgb = DARK_GREEN
p4.font.bold = True

# Helper for content slides
def create_bullet_slide(title, subtitle, bullets):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    add_header(s, title, subtitle)
    tb = s.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.0))
    tf = tb.text_frame
    tf.word_wrap = True
    for i, b in enumerate(bullets):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = "• " + b[0] + ": "
        p.font.bold = True
        p.font.size = Pt(18)
        p.font.color.rgb = DARK_GREEN
        
        run = p.add_run()
        run.text = b[1]
        run.font.bold = False
        run.font.color.rgb = TEXT_DARK
        p.space_after = Pt(14)
    return s

# Slide 2: Abstract
create_bullet_slide(
    "Abstract", "Overview of the AgriConnect Platform",
    [
        ("Need for Smart Agriculture", "Traditional farming heavily relies on guesswork, leading to suboptimal crop choices, late disease detection, and yield loss."),
        ("Proposed Solution", "AgriConnect is a unified AI web platform integrating Machine Learning, Deep Learning CNN, and Real-Time APIs."),
        ("Key Deliverables", "Soil-based Crop Recommendation, Smartphone Leaf Disease Diagnosis, Agro-Weather Advisories, and Mandi Price Intelligence."),
        ("Unique Innovation", "100% Bilingual Telugu & English interface with an interactive Voice-to-Text & Text-to-Speech AI Assistant for rural farmers.")
    ]
)

# Slide 3: Problem Statement
create_bullet_slide(
    "Problem Statement", "Critical Challenges Faced by Indian Farmers",
    [
        ("Improper Crop Selection", "Farmers lack scientific guidance on selecting crops tailored to their soil N-P-K, pH, and local climatic conditions."),
        ("Delayed Disease Identification", "Foliar diseases spread rapidly before diagnosis, causing 30% to 50% loss in crop yields."),
        ("Scattered & Complex Information", "Weather forecasts, mandi prices, and fertilizer recommendations are scattered across complex portals not designed for farmers."),
        ("Digital & Language Barrier", "Most platforms are English-only without voice assistance, making them inaccessible to rural farmers.")
    ]
)

# Slide 4: Project Objectives
create_bullet_slide(
    "Project Objectives", "Goals Accomplished in AgriConnect",
    [
        ("Accurate Crop Recommendation", "Train ML models on benchmark Kaggle soil datasets to predict the optimal crop with 90%+ confidence."),
        ("Leaf Disease Diagnosis", "Implement Deep Learning CNN on PlantVillage dataset to detect foliar diseases from smartphone photos."),
        ("Actionable Agro-Weather Alerts", "Deliver farm management advisories like spraying safety and rain warnings via OpenWeatherMap."),
        ("Mandi Market Intelligence", "Provide live daily commodity rates (Min, Max, Modal prices) across major APMC markets."),
        ("Empowering Rural Farmers", "Provide full bilingual Telugu and English voice assistance so non-technical farmers can ask questions seamlessly.")
    ]
)

# Slide 5: System Modules
create_bullet_slide(
    "System Modules & Architecture", "End-to-End Workflow & Capabilities",
    [
        ("Module 1 - Crop Recommendation", "Analyzes Soil N, P, K, pH, Temperature, Humidity, and Rainfall to prescribe maximum-yield crops."),
        ("Module 2 - Plant Disease Detection", "Classifies uploaded diseased leaves and provides instant Organic and Chemical cure regimens."),
        ("Module 3 - Weather Alerts", "Monitors temperature, rain probability, and humidity to guide spraying schedules and irrigation."),
        ("Module 4 - Mandi Market Prices", "Live APMC commodity price tracker with price trends (Warangal, Guntur, Nizamabad, etc.)."),
        ("Module 5 - Fertilizer Calculator", "Calculates scientific nutrient deficits and recommends exact bags/acre of Urea, DAP, and Potash.")
    ]
)

# Slide 6: ML & DL Algorithms
create_bullet_slide(
    "Algorithms & Methodologies", "Machine Learning & Deep Learning Specifications",
    [
        ("Gaussian Naive Bayes & Random Forest", "Used for Crop Recommendation. Computes posterior probabilities across 22 crops based on 7 agronomic parameters."),
        ("Convolutional Neural Networks (CNN)", "Employed for Plant Disease Detection. Evaluates leaf patterns, lesions, and discoloration for pathogen classification."),
        ("Precision Nutrient Deficit Formula", "Calculates commercial fertilizer dosage (Urea 46% N, DAP 18:46:0, MOP 60% K) based on target crop requirements."),
        ("Speech Recognition & Synthesis Engine", "Implements Web Speech API with dual phonetic fallback for seamless Telugu audio interaction on both mobile and laptop.")
    ]
)

# Slide 7: Datasets Used
create_bullet_slide(
    "Datasets & Benchmarks", "High-Quality Agricultural Training Data",
    [
        ("Kaggle Crop Recommendation Dataset", "2,200 samples across 22 major crops (Rice, Maize, Cotton, Chickpea, Mango, Banana, etc.) with 7 environmental features."),
        ("PlantVillage Foliar Disease Dataset", "Extensive collection of healthy and infected leaf classes across Tomato, Potato, Rice, Cotton, Corn, and Apple."),
        ("Agmarknet APMC Mandi Benchmark", "Live daily market prices across major agricultural market committees in Telangana and Andhra Pradesh."),
        ("ICAR / Agronomic Soil Standards", "Nutrient benchmark profiles validated against Indian Council of Agricultural Research guidelines.")
    ]
)

# Slide 8: Tools & Technologies
create_bullet_slide(
    "Tools & Technologies", "Robust Full-Stack Tech Stack",
    [
        ("Programming Language", "Python 3.14 (High-performance scripting, data processing, and ML inference)."),
        ("Backend Web Framework", "Flask & Python HTTP Server with RESTful JSON API endpoints."),
        ("Frontend Technologies", "HTML5, Responsive CSS3, Modern JavaScript (ES6+), FontAwesome Icons."),
        ("Version Control & Cloud Hosting", "Git, GitHub (hemaswi21/AgriConnect), and Render Cloud Platform (24/7 Live Deployment)."),
        ("Development Environment", "JetBrains PyCharm IDE & Google Chrome DevTools.")
    ]
)

# Slide 9: Special Innovation - Telugu Voice Assist
create_bullet_slide(
    "Special Innovation: Telugu Voice Assistant", "Bridging the Digital Divide for Rural Farmers",
    [
        ("100% Pure Bilingual Toggle", "Instant 1-click toggle between 100% Pure Telugu and 100% Pure English across the entire platform."),
        ("Voice Query Input (Microphone)", "Farmers can tap 🎙️ and speak their question naturally in Telugu (e.g. 'మిర్చిలో తామర పురుగు నివారణ ఏమిటి?')."),
        ("Interactive AI Chatbot", "Intelligent contextual agronomic chatbot answers queries on crop management, pests, and soil nutrients."),
        ("Voice Audio Output (Speech Synthesis)", "Audibly reads the expert farming advisory aloud in clear Telugu audio so illiterate farmers can listen without reading.")
    ]
)

# Slide 10: Future Scope & Enhancements
create_bullet_slide(
    "Future Scope & Enhancements", "Scaling AgriConnect into an Industry-Grade Ecosystem",
    [
        ("IoT Soil Sensors Integration", "Connect hardware probes (ESP32/Arduino) directly in the field for automated real-time NPK and moisture telemetry."),
        ("Dedicated Android Mobile App", "Build native Flutter/React Native app with Offline AI mode for remote villages without internet connectivity."),
        ("Drone & Satellite Surveillance", "Deploy drone imagery and ISRO/NASA NDVI satellite data for field-wide disease mapping."),
        ("Direct Agri-Bazaar Marketplace", "Farmer-to-buyer e-commerce integration to eliminate middlemen and ensure higher profit margins.")
    ]
)

# Slide 11: Conclusion
create_bullet_slide(
    "Conclusion", "Impact of AgriConnect on Smart Farming",
    [
        ("Comprehensive Support", "AgriConnect successfully unites crop advice, disease cures, weather forecasts, and market rates into a single accessible platform."),
        ("Cost & Loss Reduction", "Early disease detection and precision fertilizer recommendations save 30%+ in chemical costs and prevent catastrophic yield failure."),
        ("Rural Accessibility", "Telugu language support and voice interaction make artificial intelligence genuinely accessible to grassroots farmers."),
        ("Production-Ready", "Fully functional and deployed live on the cloud at: https://agriconnect-ai-p249.onrender.com")
    ]
)

# Save
prs.save("AgriConnect_Final_Presentation.pptx")
print("Successfully generated AgriConnect_Final_Presentation.pptx!")

