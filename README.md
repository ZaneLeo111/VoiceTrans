# What?

VoiceTrans is an application designed to convert the audio from a video file into another language while preserving the original voice characteristics (voice cloning). This transformation allows viewers to experience the video in their native language without losing the original tone and inflection of the speaker.


Front-end: TypeScript + React  
Back-end: Django

Other Libraries: OpenAI Whisper, FFmpeg, 11labs...
# Result shown:

The original Video: <br>


https://github.com/ZaneLeo111/VoiceTrans/assets/90260431/4a5e0fee-f964-406d-974c-e595d387e981



Convert Video:  <br>

https://github.com/ZaneLeo111/VoiceTrans/assets/90260431/8012f934-52a1-496f-b1b2-709a094ccb06









# How does it work? (Pipeline)






separate the video and audio (use ffmpeg) </br>
⬇️ </br>
generate the transcript from the audio (use OPENAI whisper) </br>
⬇️ </br>
transcript to voice cloning (11labs API) to generate new audio </br>
⬇️ </br>
combine with the Video and new audio use ffmpeg </br>
then </br>
show the video on the front end ⇒ view/ download


# Walk-through show:

Homepage:
<img width="1305" alt="homepage" src="https://github.com/ZaneLeo111/VoiceTrans/assets/90260431/88166326-f673-4bab-81f9-93f28f97d7f6">
Click Try for free! button, it will jump you to the Upload page :  </br>

<img width="383" alt="upload" src="https://github.com/ZaneLeo111/VoiceTrans/assets/90260431/9870580a-a1b4-4483-80db-3b4aa732ec62">

Upload your file:  </br>
<img width="369" alt="video_convert" src="https://github.com/ZaneLeo111/VoiceTrans/assets/90260431/0ce55c2e-a7eb-4fad-a0a5-eacedf00f108">

Click the convert button, then your video will upload and convert it into another language!  </br>
<img width="478" alt="video_shown" src="https://github.com/ZaneLeo111/VoiceTrans/assets/90260431/00bbdc30-afab-4ae2-8546-2dbaa491e689">


# How to run?

## How to run front-end?

cd frontend

(npm install)

npm run dev 

## How to run back-end?

`python [manage.py](http://manage.py/) runserver`


