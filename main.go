package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// load templates
	router.LoadHTMLGlob("./templates/**/*")

	// Serve static files at /static/*
	router.Static("/static", "./static")

	// trusted proxies
	router.TrustedPlatform = gin.PlatformCloudflare
	router.TrustedPlatform = gin.PlatformGoogleAppEngine
	router.TrustedPlatform = gin.PlatformFlyIO

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "signin.tmpl", nil)
	})

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	router.Run()
}
