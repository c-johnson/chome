package controllers

import (
	"github.com/robfig/revel"
	"io/ioutil"
	"net/http"
	// "text/template"
)

type App struct {
	*revel.Controller
}

type Resp struct {
	name  string // name of the object
	value int    // its value
}

func (c App) Home() revel.Result {
	active := "home"
	return c.Render(active)
}

func (c App) Contact() revel.Result {
	active := "contact"
	return c.Render(active)
}

func (c App) Consulting() revel.Result {
	active := "consulting"
	return c.Render(active)
}

func (c App) Links() revel.Result {
	active := "links"
	return c.Render(active)
}

func (c App) Blog(post string) revel.Result {
	active := "blog"
	revel.INFO.Printf("Serving post : %s", post)
	// Generate(false)
	publicPosts, err := PublicPosts()
	if err == nil {
		for _, publicPost := range publicPosts {
			revel.INFO.Printf("Public post name : %s", publicPost.Shortname)
			revel.INFO.Printf("My stupuid thing : %s", post)
			if publicPost.Shortname == post {
				htmlString := string(Html(post).ReturnHtml())
				revel.INFO.Printf("html string = %s", htmlString)
				c.RenderArgs["content"] = htmlString
				c.RenderArgs["active"] = "blog"
				return c.RenderTemplate("App/blog-post.html")
				// return Html(post)
			}
		}
	}
	return c.Render(active)
}

type Html string

func (r Html) Apply(req *revel.Request, resp *revel.Response) {
	resp.WriteHeader(http.StatusOK, "text/html")
	file := r.ReturnHtml()
	resp.Out.Write(file)
}

func (r Html) ReturnHtml() []byte {
	filePath, err := FindPublicPost(string(r))
	var file []byte
	if err == nil {
		file, err = ioutil.ReadFile(filePath)
	}
	if err == nil {
		return file
	}
	return nil
}
