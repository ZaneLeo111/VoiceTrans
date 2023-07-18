import os
from django.conf import settings
import subprocess


def conbine_video_with_audio():
	video_path = os.path.join(settings.MEDIA_ROOT, "video.mp4")
	audio_path = os.path.join(settings.MEDIA_ROOT, "output.mp3")
	output_path = os.path.join(settings.MEDIA_ROOT, "output.mp4")
	command = f"ffmpeg -i {video_path} -i {audio_path} -c:v copy -c:a aac {output_path}"
	subprocess.call(command, shell=True)
