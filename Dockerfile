# Use Node just to build CSS
FROM node:24-alpine AS css-builder
WORKDIR /app
COPY assets/ ./assets/
RUN npm install
RUN npm run build:css

# Use the official Golang image as a base image
FROM golang:1.24-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download all dependencies
RUN go mod download

# Copy the source code
COPY . .

COPY --from=css-builder /app/static/dist ./static/dist

# Build the Go app
RUN go build -o main .

# Use a minimal base image for the final container
FROM gcr.io/distroless/base-debian12

# Set the working directory inside the container
WORKDIR /root/

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Copy templates directory
COPY --from=builder /app/templates ./templates

# Copy static files
COPY --from=builder /app/static ./static

# Expose the port the app runs on
EXPOSE 8080

# Set the Gin mode to release
ENV GIN_MODE=release

# Command to run the executable
CMD ["./main"]