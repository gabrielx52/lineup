"""Init script."""
from flask import Flask

app = Flask(__name__)

from app import models, routes
