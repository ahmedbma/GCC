import os
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

MENTORS = [
    {"id": 1, "name": "Ahmad Al-Farsi", "title": "Senior Data Scientist", "type": "Internal", "expertise": ["Machine Learning", "Python"], "region": "GCC"},
    {"id": 2, "name": "Sarah Jenkins", "title": "Principal Product Manager", "type": "External", "expertise": ["Product Strategy", "Agile"], "region": "USA"},
    {"id": 3, "name": "Dr. Thomas Miller", "title": "Engineering Director", "type": "External", "expertise": ["System Architecture", "Leadership"], "region": "UK"},
    {"id": 4, "name": "Fatima Al-Sayed", "title": "VP of Operations", "type": "Internal", "expertise": ["Operations", "Process Improvement"], "region": "GCC"},
    {"id": 5, "name": "Michael Chang", "title": "Lead Security Engineer", "type": "External", "expertise": ["Cybersecurity", "Cloud Architecture"], "region": "USA"}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/generate_courses', methods=['POST'])
def generate_courses():
    if not api_key:
        return jsonify({"error": "Gemini API key is not configured. Please add it to the .env file."}), 500
        
    data = request.json
    interests = data.get('interests', '')
    weaknesses = data.get('weaknesses', '')
    goals = data.get('goals', '')
    language = data.get('language', 'en') # 'en' or 'ar'
    
    prompt = f"""
    You are an expert career coach and curriculum designer. 
    A professional in the GCC region has the following profile:
    - Interests: {interests}
    - Weaknesses to improve: {weaknesses}
    - Career Goals: {goals}
    
    Create a custom, step-by-step course plan to help them uplevel their skills.
    Provide the response as a valid JSON object with the following structure:
    {{
        "title": "Name of the Custom Learning Path",
        "description": "Short description of the path",
        "modules": [
            {{
                "module_name": "Name of module",
                "topics": ["Topic 1", "Topic 2"],
                "estimated_hours": 10
            }}
        ]
    }}
    
    IMPORTANT: Provide the content strictly in JSON format. Do not use markdown wrappers like ```json.
    """
    if language == 'ar':
         prompt += " Ensure the content inside the JSON values is entirely translated to Arabic."
         
    try:
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(prompt)
        # Parse JSON output from the model
        text = response.text.strip()
        if text.startswith('```json'):
            text = text[7:]
        if text.endswith('```'):
            text = text[:-3]
            
        import json
        course_data = json.loads(text.strip())
        return jsonify({"success": True, "course": course_data})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/api/mentors', methods=['GET'])
def get_mentors():
    return jsonify({"success": True, "mentors": MENTORS})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
