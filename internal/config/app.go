package config

import "github.com/gin-gonic/gin"

type AppConfig struct {
	TemplatesGlob  string
	StaticPath     string
	TrustedProxies []string
}

func Load() *AppConfig {
	return &AppConfig{
		TemplatesGlob: "templates/**/*",
		StaticPath:    "static",
		TrustedProxies: []string{
			gin.PlatformCloudflare,
			gin.PlatformGoogleAppEngine,
		},
	}
}
