FROM python:3.7

COPY . . 

RUN apt-get update

RUN apt install -y libgl1-mesa-glx

RUN pip install -r requirements.txt

EXPOSE 18000

CMD ["uvicorn", "src.main:app", "--workers", "3", "--host", "0.0.0.0", "--port", "18000"]
