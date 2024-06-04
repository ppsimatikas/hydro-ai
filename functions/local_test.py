from flask import Flask, request, jsonify
from flask_cors import CORS
from api import process_call

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, methods=['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'])


@app.route('/query', methods=['POST'])
def handle_post():
    data = request.get_json()
    return process_call(data)


if __name__ == '__main__':
    app.run(debug=True, port=5000)