"""Init script."""
from flask import Flask

from flask_cors import CORS

app = Flask(__name__)
CORS(app, support_credentials=True)

from app import routes

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
