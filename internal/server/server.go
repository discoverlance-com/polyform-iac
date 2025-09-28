package server

import (
	"context"
	"fmt"
	"log/slog"
	"net/http"
	"strconv"
	"time"

	"github.com/a-h/templ"
	"github.com/gin-gonic/gin/render"

	"github.com/gin-gonic/gin"

	gowebly "github.com/gowebly/helpers"

	"github.com/discoverlance-com/polyform-iac/internal/auth"
	"github.com/discoverlance-com/polyform-iac/internal/config"
)

// TemplRender implements the render.Render interface.
type TemplRender struct {
	Code int
	Data templ.Component
}

// Render implements the render.Render interface.
func (t TemplRender) Render(w http.ResponseWriter) error {
	t.WriteContentType(w)
	w.WriteHeader(t.Code)
	if t.Data != nil {
		return t.Data.Render(context.Background(), w)
	}
	return nil
}

// WriteContentType implements the render.Render interface.
func (t TemplRender) WriteContentType(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
}

// Instance implements the render.Render interface.
func (t *TemplRender) Instance(name string, data interface{}) render.Render {
	if templData, ok := data.(templ.Component); ok {
		return &TemplRender{
			Code: http.StatusOK,
			Data: templData,
		}
	}
	return nil
}

// runServer runs a new HTTP server with the loaded environment variables.
func RunServer() error {
	// Validate environment variables.
	port, err := strconv.Atoi(gowebly.Getenv("BACKEND_PORT", "8080"))
	if err != nil {
		return err
	}

	// Load config
	cfg := config.LoadAppConfig()

	// Create a new Fiber server.
	router := gin.Default()

	// Configure CORS middleware.
	config.ConfigureCors(cfg, router)

	// Define HTML renderer for template engine.
	router.HTMLRender = &TemplRender{}

	// Handle static files.
	router.Static("/static", "./static")

	// Handle index page view.
	router.GET("/", auth.SignInViewHandler)

	// Create a new server instance with options from environment variables.
	// For more information, see https://blog.cloudflare.com/the-complete-guide-to-golang-net-http-timeouts/
	// Note: The ReadTimeout and WriteTimeout settings may interfere with SSE (Server-Sent Event) or WS (WebSocket) connections.
	// For SSE or WS, these timeouts can cause the connection to reset after 10 or 5 seconds due to the ReadTimeout and WriteTimeout settings.
	// If you plan to use SSE or WS, consider commenting out or removing the ReadTimeout and WriteTimeout key-value pairs.
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		Handler:      router,
	}

	// Send log message.
	slog.Info("Starting server...", "port", port)

	return server.ListenAndServe()
}
