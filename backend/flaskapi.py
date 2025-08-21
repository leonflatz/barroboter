from flask import Flask, jsonify
from controller_tester import RaspiHandler
from jsonRepository import Jsonrepository

app = Flask(__name__)

# --- Routes ---
@app.route("/make_drink/<int:drinkId>", methods=["GET"])
def make_drink(drinkId):
    request = Jsonrepository.prepareBeverageRequest(drinkId)
    RaspiHandler.handle_request(request)
    return "200"

# --- Health check ---
@app.route("/ping", methods=["GET"])
def ping():
    return jsonify({"message": "pong"}), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)