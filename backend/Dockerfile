FROM python:3.7-alpine

# run Python in unbuffered mode
ENV PYTHONUNBUFFERED 1

RUN addgroup usergroup && adduser -D -h /home/user -g usergroup user
RUN mkdir /backend/
WORKDIR /backend

# get reqs from requirements.txt and install them
ADD *requirements.txt /backend/ 
RUN pip install -r requirements.txt

COPY . /backend/

# creates a user named user for running applications (-D)
# and switches to the user
USER user
