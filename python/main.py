import os
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).parent.parent/'.env'
load_dotenv(dotenv_path=env_path)
api_key = os.getenv("API_KEY")
app = FastAPI(title="PhisGuard Security Engine")

class PhishingRequest(BaseModel):
    url: str

# @app.get("/")
# async def main():
#     user_input = input("Masukkan Link Dulu: ")
#     app.route("/analyze_url", sus_url: user_input)

# @app.post("/analyze-url")
# async def analyze_url(data: PhishingRequest, us):
#     target_url = 
#     url = "https://www.virustotal.com/api/v3/urls"

#     payload = { "url":  user_input}
#     headers = {
#         "accept": "application/json",
#         "x-apikey": api_key,
#         "content-type": "application/x-www-form-urlencoded"
#     }

#     response = requests.post(url, data=payload, headers=headers)
#     result_url = "https://www.virustotal.com/api/v3/analyses/{response.data.id}"

#     result_headers = {
#         "accept": "application/json",
#         "x-apikey": api_key,
#     }

#     response_url = requests.get(result_url, result_headers = headers)
#     return {
#         "status": "success",
#         "data": ""
#     }