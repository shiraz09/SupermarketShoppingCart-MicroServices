FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt requirements.txt
RUN apt-get update && apt-get install -y \
    libasound-dev portaudio19-dev libportaudio2 libportaudiocpp0 ffmpeg \
    && pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
