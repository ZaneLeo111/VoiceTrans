from elevenlabs import set_api_key
import requests
import json

api_key = "931cf43bea530d7d79439022dbc7163f"
url = "https://api.elevenlabs.io/v1/voices"

headers = {
  "Accept": "application/json",
  "xi-api-key": api_key
}

response = requests.get(url, headers=headers)

print(response.text)

json_output = json.dumps(response.text)