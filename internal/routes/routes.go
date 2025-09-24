package routes

import (
	"net/http"

	"github.com/discoverlance-com/platform-iac/internal/auth"
	"github.com/discoverlance-com/platform-iac/internal/config"
	"github.com/gin-gonic/gin"
)

func SetupRouter(cfg *config.AppConfig) *gin.Engine {
	router := gin.Default()

	// load templates
	config.ConfigureTemplates(cfg, router)

	// Serve static files at /static/*
	router.Static("/static", cfg.StaticPath)

	// trusted proxies
	router.SetTrustedProxies(cfg.TrustedProxies)

	// health check
	router.GET("/healthz", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// register routes
	auth.RegisterRoutes(router)

	return router
}
