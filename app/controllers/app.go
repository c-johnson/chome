package controllers

import (
	"github.com/c-johnson/goblog"
	"github.com/revel/revel"
	"io/ioutil"
	"net/http"
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

func (c App) Work() revel.Result {
	active := "work"
	return c.Render(active)
}

func (c App) Links() revel.Result {
	active := "links"
	return c.Render(active)
}

func (c App) Wep() revel.Result {
	return c.Redirect("https://rawgithub.com/c-johnson/wep/master/index.html")
}

func (c App) Words(post string) revel.Result {
	active := "words"
	goblog.Generate(false, false)
	publicPosts, err := goblog.PublicPosts()
	if err == nil {
		for _, publicPost := range publicPosts {
			if publicPost.Shortname == post {
				htmlString := string(Html(post).ReturnHtml())
				c.RenderArgs["content"] = htmlString
				c.RenderArgs["active"] = "words"
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
