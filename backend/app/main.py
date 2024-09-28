from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app, resources={r"/v1/*": {"origins": "*"}})  # This enables CORS for all routes

# Load data from JSON files
def load_data(filename):
    try:
        with open(filename, 'r') as f:
            data = f.read()
            return json.loads(data) if data else []
    except FileNotFoundError:
        return []

# Save data to JSON files
def save_data(data, filename):
    with open(filename, 'w') as f:
        json.dump(data, f)

# Load initial data
# appointments = load_data('appointments.json')
# vitals = load_data('vitals.json')

# Basic symptom checker
symptoms = {
    "headache": ["Rest in a quiet, dark room", "Stay hydrated", "Consider over-the-counter pain relievers"],
    "fever": ["Rest and stay hydrated", "Take acetaminophen or ibuprofen", "Use a cold compress"],
    "cough": ["Stay hydrated", "Use honey to soothe your throat", "Consider over-the-counter cough suppressants"],
    "fatigue": ["Get plenty of rest", "Maintain a balanced diet", "Stay hydrated"],
    "sore throat": ["Gargle with warm salt water", "Drink warm liquids", "Use throat lozenges"],
    "nausea": ["Eat small, frequent meals", "Avoid strong odors", "Try ginger tea or peppermint"],
    "dizziness": ["Sit or lie down immediately", "Avoid sudden movements", "Stay hydrated"],
}

@app.route('/api/chat', methods=['POST'])
def chat():
    print("Received a request to /api/chat")  # Add this line
    data = request.json
    print(f"Request data: {data}")  # Add this line
    user_message = data.get('message', '').lower()
    
    if "appointment" in user_message:
        return jsonify({'response': "Sure, I can help you schedule an appointment. Please use the 'Manage Appointments' feature in the app to set up a new appointment."})
    elif "vitals" in user_message:
        return jsonify({'response': "To track your vitals, please use the 'Track Vitals' feature in the app. It allows you to record and monitor your health metrics."})
    elif any(symptom in user_message for symptom in symptoms):
        for symptom, advice in symptoms.items():
            if symptom in user_message:
                return jsonify({'response': f"For {symptom}, here's some advice: " + ", ".join(advice)})
    elif "medication" in user_message:
        return jsonify({'response': "It's important to take your medications as prescribed. If you have any concerns about your medication, please consult your doctor or pharmacist."})
    elif "exercise" in user_message:
        return jsonify({'response': "Regular exercise is great for your health! Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity a week. Always consult your doctor before starting a new exercise routine."})
    elif "diet" in user_message or "nutrition" in user_message:
        return jsonify({'response': "A balanced diet is crucial for good health. Try to include a variety of fruits, vegetables, whole grains, lean proteins, and healthy fats in your meals. If you need specific dietary advice, consider consulting a registered dietitian."})
    else:
        return jsonify({'response': "I'm sorry, I couldn't understand your request. Could you please rephrase or ask about a specific health concern?"})

# @app.route('/v1/appointments', methods=['GET', 'POST'])
# def manage_appointments():
#     global appointments
#     if request.method == 'GET':
#         return jsonify(appointments)
#     elif request.method == 'POST':
#         data = request.json
#         print("Received appointment data:", data)  # Add this line for debugging
#         new_appointment = {
#             'id': len(appointments) + 1,
#             'date': data.get('date'),
#             'time': data.get('time'),
#             'doctor': data.get('doctor'),
#             'reason': data.get('reason')
#         }
#         appointments.append(new_appointment)
#         save_data(appointments, 'appointments.json')
#         return jsonify(new_appointment), 201

# @app.route('/v1/vitals', methods=['GET', 'POST'])
# def track_vitals():
#     global vitals
#     if request.method == 'GET':
#         return jsonify(vitals)
#     elif request.method == 'POST':
#         data = request.json
#         print("Received vital data:", data)  # Add this line for debugging
#         new_vital = {
#             'id': len(vitals) + 1,
#             'date': datetime.now().isoformat(),
#             'type': data.get('type'),
#             'value': data.get('value')
#         }
#         vitals.append(new_vital)
#         save_data(vitals, 'vitals.json')
#         return jsonify(new_vital), 201

@app.route('/api/health_tips', methods=['GET'])
def get_health_tips():
    tips = [
        "Stay hydrated by drinking at least 8 glasses of water a day.",
        "Aim for 7-9 hours of sleep each night.",
        "Incorporate fruits and vegetables into every meal.",
        "Take short breaks and stretch if you sit for long periods.",
        "Practice mindfulness or meditation to reduce stress.",
        "Limit processed foods and sugary drinks.",
        "Get regular health check-ups and screenings.",
        "Wash your hands frequently to prevent the spread of germs.",
        "Stay up to date with your vaccinations.",
        "Find physical activities you enjoy and make them a regular part of your routine."
    ]
    return jsonify(random.sample(tips, 3))

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Backend is working!"})

if __name__ == '__main__':
    app.run(debug=True)