FROM node:10-slim
RUN apt-get update && \
    apt-get install -y git && \
    rm -rf /var/lib/apt/lists/*
ADD . /app
WORKDIR /app
RUN npm install
CMD bash entrypoint.sh