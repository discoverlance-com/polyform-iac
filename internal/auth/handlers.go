package auth

import (
	"net/http"

	"github.com/angelofallars/htmx-go"

	"github.com/discoverlance-com/polyform-iac/templates"
	"github.com/discoverlance-com/polyform-iac/templates/pages"
	"github.com/discoverlance-com/polyform-iac/templates/shared"

	"github.com/gin-gonic/gin"
)

// SignInViewHandler handles a view for the sign-in page.
func SignInViewHandler(c *gin.Context) {

	// Define template meta tags.
	metaTags := shared.MetaTags(
		"Sign In - PolyForm IAC", // define meta description
	)

	// Define template body content.
	bodyContent := pages.BodyContent(
		"Welcome to polyform!",               // define h1 text
		"You're here because it worked out.", // define p text
	)

	// Define template layout for index page.
	indexTemplate := templates.Layout(
		"Welcome to polyform!", // define title text
		metaTags,               // define meta tags
		bodyContent,            // define body content
	)

	// Render index page template.
	if err := htmx.NewResponse().RenderTempl(c.Request.Context(), c.Writer, indexTemplate); err != nil {
		// If not, return HTTP 500 error.
		c.AbortWithStatus(http.StatusInternalServerError)
		return
	}

}
