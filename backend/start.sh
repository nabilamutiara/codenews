#!/bin/bash
gunicorn --bind 0.0.0.0:$PORT sentiment_api:app