# Use Node just to build CSS and JS
FROM node:24-alpine AS assets-builder
WORKDIR /app
COPY assets/ ./assets/
COPY package.json package-lock.json ./
COPY .postcssrc.js ./
RUN npm install
RUN npm run build

FROM golang:1.24-alpine AS builder

# Move to working directory (/build).
WORKDIR /build

# Copy and download dependency using go mod.
COPY go.mod go.sum ./
RUN go mod download

# Copy your code into the container.
COPY . .

# Set necessary environment variables and build your project.
ENV CGO_ENABLED=0 GIN_MODE=release
RUN go build -ldflags="-s -w" -o gowebly_gin

FROM scratch

# Copy project's binary and templates from /build to the scratch container.
COPY --from=builder /build/gowebly_gin /
COPY --from=builder /build/static /static
COPY --from=assets-builder /build/static/dist ./static/dist


# Set entry point.
ENTRYPOINT ["/gowebly_gin"]
