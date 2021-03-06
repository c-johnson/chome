package controllers

import (
	"io/ioutil"
	"net/http"

	"github.com/c-johnson/goblog"
	"github.com/revel/revel"
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
	c.RenderArgs["title"] = "World of Chris"
	return c.Render(active)
}

func (c App) Application() revel.Result {
	active := "app"
	c.RenderArgs["title"] = "Application"
	return c.Render(active)
}

func (c App) Contact() revel.Result {
	active := "contact"
	c.RenderArgs["title"] = "Contact"
	return c.Render(active)
}

func (c App) Work() revel.Result {
	active := "work"
	c.RenderArgs["title"] = "Work"
	return c.Render(active)
}

func (c App) Links() revel.Result {
	active := "links"
	c.RenderArgs["title"] = "Links"
	return c.Render(active)
}

func (c App) Wep() revel.Result {
	c.RenderArgs["title"] = "Wep"
	return c.Redirect("https://rawgithub.com/c-johnson/wep/master/index.html")
}

func (c App) Test() revel.Result {
	active := "test"
	c.RenderArgs["title"] = "Test"
	return c.Render(active)
}

func (c App) Words(post string) revel.Result {
	active := "words"
	// generate html, generate manifest
	goblog.Generate(false, false)
	publicPosts, err := goblog.PublicPosts()
	if err == nil {
		for _, publicPost := range publicPosts {
			if publicPost.Shortname == post {
				htmlString := string(Html(post).ReturnHtml())
				c.RenderArgs["content"] = htmlString
				c.RenderArgs["active"] = "words"
				if publicPost.Shortname == "momentum" {
					c.RenderArgs["title"] = "Why I can't even order a bowl of goddamn noodles."
				} else {
					c.RenderArgs["title"] = "A blog post!"
				}
				return c.RenderTemplate("App/word.html")
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
	filePath, err := goblog.FindPublicPost(string(r))
	var file []byte
	if err == nil {
		file, err = ioutil.ReadFile(filePath)
	}
	if err == nil {
		return file
	}
	return nil
}
