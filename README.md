# Go

## Generate the image

```bash
cd golang
docker build -t [user name]/golang:prod . -f Dockerfile.prod
```

## Run the image

```bash
docker run --rm fernandogot/golang:prod
```
