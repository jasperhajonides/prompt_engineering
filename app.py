from flask import render_template

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-prompt', methods=['POST'])
def generate_prompt():
    prompt_text = request.json.get('prompt')
    contexts = request.json.get('contexts')

    # Replace this line with the actual GPT API call to generate a prompt
    generated_prompt = f"Generated prompt: {prompt_text} [Contexts: {', '.join(contexts)}]"

    return jsonify({'prompt': generated_prompt})

if __name__ == '__main__':
    app.run(debug=True)
