package config

import (
	"embed"
	"fmt"
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

func dict(values ...interface{}) (map[string]interface{}, error) {
	if len(values)%2 != 0 {
		return nil, fmt.Errorf("invalid dict call: must pass key/value pairs")
	}
	m := make(map[string]interface{}, len(values)/2)
	for i := 0; i < len(values); i += 2 {
		key, ok := values[i].(string)
		if !ok {
			return nil, fmt.Errorf("dict keys must be strings")
		}
		m[key] = values[i+1]
	}
	return m, nil
}

// rawDict allows trusted raw HTML/Attr, but should be used explicitly
func rawDict(values ...interface{}) (map[string]interface{}, error) {
	if len(values)%2 != 0 {
		return nil, fmt.Errorf("invalid dict call: must pass key/value pairs")
	}
	m := make(map[string]interface{}, len(values)/2)
	for i := 0; i < len(values); i += 2 {
		key, ok := values[i].(string)
		if !ok {
			return nil, fmt.Errorf("dict keys must be strings")
		}
		switch key {
		case "Attrs":
			if s, ok := values[i+1].(string); ok {
				m[key] = template.HTMLAttr(s)
				continue
			}
		case "HTML":
			if s, ok := values[i+1].(string); ok {
				m[key] = template.HTML(s)
				continue
			}
		}
		m[key] = values[i+1]
	}
	return m, nil
}

func ConfigureTemplates(cfg *AppConfig, r *gin.Engine) {
	funcs := template.FuncMap{
		"dict":    dict,
		"rawDict": rawDict,
	}

	if gin.Mode() == gin.DebugMode {
		tmpl := template.Must(
			template.New("").Funcs(funcs).ParseGlob(cfg.TemplatesGlob),
		)
		r.SetHTMLTemplate(tmpl)
	} else {
		tmpl := template.Must(
			template.New("").Funcs(funcs).ParseFS(templateFS, cfg.TemplatesGlob),
		)
		r.SetHTMLTemplate(tmpl)
	}
}
