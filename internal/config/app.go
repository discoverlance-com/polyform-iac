package config

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	gowebly "github.com/gowebly/helpers"
)

type AppConfig struct {
	StaticPath     string
	TrustedProxies []string
	cors           cors.Config
}

func LoadAppConfig() *AppConfig {
	app_url := gowebly.Getenv("APP_URL", "http://localhost:8080") // change this url for production

	return &AppConfig{
		StaticPath: "static",
		TrustedProxies: []string{
			gin.PlatformCloudflare,
			gin.PlatformGoogleAppEngine,
		},
		cors: cors.Config{
			AllowOrigins:     []string{app_url}, // Add your frontend URL
			AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
			AllowHeaders:     []string{"Accept", "Authorization", "Content-Type"},
			AllowCredentials: true, // Enable cookies/auth
		},
	}
}

func ConfigureCors(cfg *AppConfig, r *gin.Engine) {
	r.Use(cors.New(cfg.cors))
}
