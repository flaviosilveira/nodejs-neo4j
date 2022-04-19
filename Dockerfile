FROM debian

RUN apt update && apt install -y nodejs npm

RUN mkdir /app
WORKDIR /app

COPY package.json ./
RUN npm install

ENTRYPOINT ["tail", "-f", "/dev/null"]