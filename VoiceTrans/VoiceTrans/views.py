# views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes
import os
import openai
from django.shortcuts import render
import subprocess
from pydub import AudioSegment

# 用来渲染前端模版,我们不需要
def front(request):
    context = { }
    return render(request, "index.html", context)

# openai.api_key = os.getenv("OPENAI_API_KEY")
# use  export OPENAI_API_KEY=your_openai_api_key to set up your api key


openai.api_key = "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"


# @csrf_exempt
# def upload_file(request):
#     if request.method == 'POST':
#         file = request.FILES['file']
#         # Do something with the file
#         return JsonResponse({'message': 'File uploaded'})
#     else:
#         return JsonResponse({'message': 'Invalid request'}, status=400)

def extract_audio_from_video(video_path):
    # Get the filename without extension
    filename = 'audio'
    # Prepare the path for the audio file
    audio_path = os.path.join(settings.MEDIA_ROOT, f"{filename}.mp3")
    
    # Create the command
    command = f"ffmpeg -i {video_path} -q:a 0 -map a {audio_path}"
    
    # Run the command
    subprocess.call(command, shell=True)

    return audio_path

@csrf_exempt
@parser_classes([MultiPartParser])
def upload_audio(request):
    if request.method == 'POST':
        # Get the uploaded file
        file = request.FILES['file']
        audio_path = extract_audio_from_video(file.temporary_file_path())
        # Pass the uploaded file to the Whisper API
        audio_file = open(audio_path, "rb")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        
        # Return the transcript in a JSON response
        return JsonResponse({'transcript': transcript})

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# def silice_audio():
#     audio = AudioSegment.from_mp3("good_morning.mp3")

#     # PyDub handles time in milliseconds
#     ten_minutes = 10 * 60 * 1000

#     first_10_minutes = song[:ten_minutes]

#     first_10_minutes.export("good_morning_10.mp3", format="mp3")
        

