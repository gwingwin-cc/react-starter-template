FROM alpine 
WORKDIR /app
RUN apk update && apk add rsync

COPY dist /app

FROM nginx
RUN mkdir /app
COPY --from=0 /app /app