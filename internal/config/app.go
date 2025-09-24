package config

import (
	"embed"
	"html/template"

	"github.com/gin-gonic/gin"
)

var templateFS embed.FS

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

func ConfigureTemplates(cfg *AppConfig, r *gin.Engine) {
	if gin.Mode() == gin.DebugMode {
		r.LoadHTMLGlob(cfg.TemplatesGlob)
	} else {
		templ := template.Must(template.ParseFS(templateFS, cfg.TemplatesGlob))
		r.SetHTMLTemplate(templ)
	}
}
