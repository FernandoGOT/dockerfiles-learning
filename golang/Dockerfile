FROM golang:1.16.3

WORKDIR /go/src/app

COPY app.go .

RUN go build ./app.go

CMD [ "./app" ]