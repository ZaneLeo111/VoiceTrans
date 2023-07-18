# views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import parser_classes, api_view, permission_classes
from rest_framework.permissions import AllowAny
import os
import openai
from django.shortcuts import render
import subprocess
from pydub import AudioSegment
from elevenlabs import set_api_key
import requests
import tempfile
import json

# openai.api_key = os.getenv("OPENAI_API_KEY")
# use  export OPENAI_API_KEY=your_openai_api_key to set up your api key
openai.api_key = "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"
audio_file_path = ""

# use for rendering the index.html file
def front(request):
	context = { }
	return render(request, "index.html", context)

def extract_audio_from_video(video_path, delete_after=False):
	# Get the filename without extension
	filename = 'audio'
	# Prepare the path for the audio file
	audio_path = os.path.join(settings.MEDIA_ROOT, f"{filename}.mp3")
	
	# Create the command
	command = f"ffmpeg -i {video_path} -q:a 0 -map a {audio_path}"

	if delete_after:
		os.remove(video_path)
	
	# Run the command
	subprocess.call(command, shell=True)

	return audio_path

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def convert_video(request):
	if request.method == 'POST':
		audio_path = os.path.join(settings.MEDIA_ROOT, "audio.mp3")
		print(audio_path)
		if audio_path is None:
			return JsonResponse({'error': 'No audio file to convert'}, status=400)
		try:
			transcribe_and_translate_audio(audio_path)
			return JsonResponse({'success': True})
		except Exception as e:
			return JsonResponse({'error': f'Error during conversion: {str(e)}'}, status=500)
	
	return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def transcribe_and_translate_audio(audio_path):
# Pass the uploaded file to the Whisper API
	try:
		audio_file = open(audio_path, "rb")
		transcript = openai.Audio.transcribe("whisper-1", audio_file)
		transcript_str = str(transcript)
		# save the original transcript
		path = os.path.join(settings.MEDIA_ROOT, "original_transcript.txt")
		transcript_dict = json.loads(str(transcript))
		transcript_str = transcript_dict["text"]
		with open(path, 'w', encoding="utf-8") as f:
			f.write(transcript_str)
	except Exception as e:
		return JsonResponse({'error': "Oops, something wrong with the transcibe part, " + str(e)}, status=500)

	# translate the transcript
	try:
		translated_transcript = translate(transcript=transcript_str)
		translation = translated_transcript['choices'][0]['message']['content']
			# save the translated transcript
		path = os.path.join(settings.MEDIA_ROOT, "translated_transcript.txt")
		with open(path, 'w', encoding="utf-8") as f:
			f.write(translation)
	except Exception as e:
		return JsonResponse({'error': 'Oops, something wrong with the translation, ' + str(e)}, status=500)
	
	# Save and return the transcript and translated transcript
	return JsonResponse({'transcript': transcript, 'translated_transcript': translated_transcript})
	# Return the transcript in a JSON response
	# return JsonResponse({'transcript': transcript})
# return JsonResponse({'error': 'Invalid request method'}, status=405)


def translate(input_language = 'Chinese', output_language = 'English', transcript = ''):
	response = openai.ChatCompletion.create(
		model="gpt-3.5-turbo",
		messages=[
			{
			"role": "system",
			"content": f"You will be provided with sentences in {input_language}, and your task is to translate it into {output_language}."
			},
			{
			"role": "user",
			"content": f'{transcript}'
			}
		],
		temperature=0,
		max_tokens=64,
		top_p=1.0,
		frequency_penalty=0.0,
		presence_penalty=0.0
	)

	return response
	# return response.choices[0].text

@csrf_exempt
@parser_classes([MultiPartParser])
def upload_video(request):
	if request.method == 'POST':
		# Get the uploaded file
		file = request.FILES['file']

		# print(request.FILES)

		
	
		# Check file size
		MAX_UPLOAD_SIZE = 25 * 1024 * 1024  # 25MB in bytes
		if file.size > MAX_UPLOAD_SIZE:
			return JsonResponse({'error': 'File size exceeds 25MB.'}, status=400)

		if isinstance(file, InMemoryUploadedFile):
		# For small files, you can read the file directly from memory
			file_content = file.read()
			# Create a temporary file and write the content to it
			with tempfile.NamedTemporaryFile(delete=False) as tmp:
				tmp.write(file_content)
				tmp_path = tmp.name
				audio_path = extract_audio_from_video(tmp_path)
		elif isinstance(file, TemporaryUploadedFile):
			audio_path = extract_audio_from_video(file.temporary_file_path())
		else:
			return JsonResponse({'error': 'Unsupported file type'}, status=400)
		
		return JsonResponse({'audio_path': audio_path})
	
	return JsonResponse({'error': 'Invalid request method'}, status=405)





