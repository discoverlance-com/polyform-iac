package main

import (
	"log"

	"github.com/discoverlance-com/platform-iac/internal/config"
	"github.com/discoverlance-com/platform-iac/internal/routes"
)

func main() {
	cfg := config.Load()

	router := routes.SetupRouter(cfg)

	log.Printf("Starting server on Default Port")

	if err := router.Run(); err != nil {
		log.Fatal(err)
	}
}
