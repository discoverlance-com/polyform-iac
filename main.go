package main

import (
	"log/slog"
	"os"

	"github.com/discoverlance-com/polyform-iac/internal/server"
)

func main() {
	// Run your server.
	if err := server.RunServer(); err != nil {
		slog.Error("Failed to start server!", "details", err.Error())
		os.Exit(1)
	}
}
