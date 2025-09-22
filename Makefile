.PHONY: setup dev build build-css run clean

# install air
setup:
	npm install
	go mod tidy
	go install github.com/air-verse/air@latest

# Run Go server + CSS build in watch mode
dev:
	npm run dev

# Just build CSS for production
build-css:
	npm run build:css

# Build the Go app (binary goes into ./bin)
build:
	go build -o bin/app main.go

# Run the built binary
run:
	./bin/app

# Remove build artifacts
clean:
	rm -rf bin
