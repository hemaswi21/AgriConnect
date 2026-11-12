"""
AgriConnect: AI-Based Agriculture Support System
Backend Application Server
Supports standard Flask when installed, with built-in HTTP fallback.
"""
import os
import sys
import json
import urllib.parse
import ml_engine

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")

# Check if Flask is installed
try:
    from flask import Flask, render_template, request, jsonify, send_from_directory
    FLASK_AVAILABLE = True
except ImportError:
    FLASK_AVAILABLE = False


if FLASK_AVAILABLE:
    app = Flask(__name__, template_folder="templates", static_folder="static")

    @app.route("/")
    def index():
        return render_template("index.html")

    @app.route("/crop")
    def crop_page():
        return render_template("crop.html")

    @app.route("/disease")
    def disease_page():
        return render_template("disease.html")

    @app.route("/weather")
    def weather_page():
        return render_template("weather.html")

    @app.route("/market")
    def market_page():
        return render_template("market.html")

    @app.route("/fertilizer")
    def fertilizer_page():
        return render_template("fertilizer.html")

    # API Endpoints
    @app.route("/api/recommend-crop", methods=["POST"])
    def api_recommend_crop():
        data = request.get_json(force=True)
        result = ml_engine.predict_crop(
            n=data.get("n", 80),
            p=data.get("p", 40),
            k=data.get("k", 40),
            temp=data.get("temp", 25),
            hum=data.get("humidity", 80),
            ph=data.get("ph", 6.5),
            rain=data.get("rainfall", 150)
        )
        return jsonify(result)

    @app.route("/api/detect-disease", methods=["POST"])
    def api_detect_disease():
        crop_hint = request.form.get("crop", "tomato")
        filename = ""
        file_bytes = None
        if "image" in request.files:
            file = request.files["image"]
            filename = file.filename
            file_bytes = file.read()
        result = ml_engine.diagnose_leaf_image(filename=filename, file_bytes=file_bytes, crop_hint=crop_hint)
        return jsonify(result)

    @app.route("/api/recommend-fertilizer", methods=["POST"])
    def api_recommend_fertilizer():
        data = request.get_json(force=True)
        result = ml_engine.recommend_fertilizer(
            soil_n=data.get("soil_n", 40),
            soil_p=data.get("soil_p", 20),
            soil_k=data.get("soil_k", 20),
            target_crop=data.get("crop", "Rice")
        )
        return jsonify(result)

    @app.route("/api/weather")
    def api_weather():
        city = request.args.get("city", "Warangal")
        return jsonify(ml_engine.get_weather_advisory(city))

    @app.route("/api/market-prices")
    def api_market_prices():
        crop = request.args.get("crop", None)
        return jsonify(ml_engine.get_mandi_prices(crop))

    @app.route("/api/smart-assist", methods=["POST"])
    def api_smart_assist():
        data = request.get_json(force=True)
        query = data.get("query", "")
        lang = data.get("lang", "te")
        result = ml_engine.ask_agriculture_ai(query, lang)
        return jsonify(result)

    def run_server(port=5000):
        print(f"\n=======================================================")
        print(f"🌾 AgriConnect Flask Server Running at: http://127.0.0.1:{port}")
        print(f"=======================================================\n")
        app.run(host="0.0.0.0", port=port, debug=False)

else:
    # Zero-dependency Fallback Server using Python Standard Library
    from http.server import HTTPServer, BaseHTTPRequestHandler
    import mimetypes

    class AgriHTTPHandler(BaseHTTPRequestHandler):
        def _send_response_data(self, content, status=200, content_type="text/html; charset=utf-8"):
            self.send_response(status)
            self.send_header("Content-Type", content_type)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)

        def _send_json(self, data, status=200):
            payload = json.dumps(data).encode("utf-8")
            self._send_response_data(payload, status=status, content_type="application/json")

        def _serve_file(self, filepath):
            if os.path.exists(filepath) and os.path.isfile(filepath):
                ctype, _ = mimetypes.guess_type(filepath)
                ctype = ctype or "application/octet-stream"
                with open(filepath, "rb") as f:
                    content = f.read()
                self._send_response_data(content, status=200, content_type=ctype)
            else:
                self._send_response_data(b"404 Not Found", status=404)

        def do_GET(self):
            parsed = urllib.parse.urlparse(self.path)
            path = parsed.path
            query = urllib.parse.parse_qs(parsed.query)

            # Static files
            if path.startswith("/static/"):
                rel_path = path[len("/static/"):]
                target_file = os.path.join(STATIC_DIR, rel_path.replace("/", os.sep))
                self._serve_file(target_file)
                return

            # HTML Pages
            routes = {
                "/": "index.html",
                "/crop": "crop.html",
                "/disease": "disease.html",
                "/weather": "weather.html",
                "/market": "market.html",
                "/fertilizer": "fertilizer.html"
            }
            if path in routes:
                template_path = os.path.join(TEMPLATES_DIR, routes[path])
                self._serve_file(template_path)
                return

            # API endpoints
            if path == "/api/weather":
                city = query.get("city", ["Warangal"])[0]
                self._send_json(ml_engine.get_weather_advisory(city))
                return

            if path == "/api/market-prices":
                crop = query.get("crop", [None])[0]
                self._send_json(ml_engine.get_mandi_prices(crop))
                return

            self._send_response_data(b"404 Not Found", status=404)

        def do_POST(self):
            parsed = urllib.parse.urlparse(self.path)
            path = parsed.path
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length)

            if path == "/api/recommend-crop":
                try:
                    data = json.loads(post_body.decode("utf-8"))
                    res = ml_engine.predict_crop(
                        n=data.get("n", 80),
                        p=data.get("p", 40),
                        k=data.get("k", 40),
                        temp=data.get("temp", 25),
                        hum=data.get("humidity", 80),
                        ph=data.get("ph", 6.5),
                        rain=data.get("rainfall", 150)
                    )
                    self._send_json(res)
                except Exception as e:
                    self._send_json({"error": str(e)}, status=400)
                return

            if path == "/api/recommend-fertilizer":
                try:
                    data = json.loads(post_body.decode("utf-8"))
                    res = ml_engine.recommend_fertilizer(
                        soil_n=data.get("soil_n", 40),
                        soil_p=data.get("soil_p", 20),
                        soil_k=data.get("soil_k", 20),
                        target_crop=data.get("crop", "Rice")
                    )
                    self._send_json(res)
                except Exception as e:
                    self._send_json({"error": str(e)}, status=400)
                return

            if path == "/api/smart-assist":
                try:
                    data = json.loads(post_body.decode("utf-8"))
                    query = data.get("query", "")
                    lang = data.get("lang", "te")
                    res = ml_engine.ask_agriculture_ai(query, lang)
                    self._send_json(res)
                except Exception as e:
                    self._send_json({"error": str(e)}, status=400)
                return

            if path == "/api/detect-disease":
                crop_hint = "tomato"
                filename = ""
                # Parse multipart or raw
                content_type = self.headers.get("Content-Type", "")
                if "multipart/form-data" in content_type:
                    # extract crop if present in body
                    if b'name="crop"' in post_body:
                        try:
                            parts = post_body.split(b'name="crop"')
                            crop_val = parts[1].split(b'\r\n\r\n')[1].split(b'\r\n')[0].decode("utf-8", errors="ignore").strip()
                            if crop_val:
                                crop_hint = crop_val
                        except Exception:
                            pass
                    if b'filename="' in post_body:
                        try:
                            fn = post_body.split(b'filename="')[1].split(b'"')[0].decode("utf-8", errors="ignore")
                            filename = fn
                        except Exception:
                            pass
                res = ml_engine.diagnose_leaf_image(filename=filename, crop_hint=crop_hint)
                self._send_json(res)
                return

            self._send_response_data(b"404 Not Found", status=404)

        def log_message(self, format, *args):
            # Clean quiet logs
            sys.stderr.write("%s - - [%s] %s\n" % (self.address_string(), self.log_date_time_string(), format % args))

    def run_server(port=5000):
        server_address = ("0.0.0.0", port)
        httpd = HTTPServer(server_address, AgriHTTPHandler)
        print(f"\n=================================================================")
        print(f"🌾 AgriConnect Web Platform Running at: http://127.0.0.1:{port}")
        print(f"   (Open this link in your browser to view the application)")
        print(f"=================================================================\n")
        httpd.serve_forever()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    run_server(port)

