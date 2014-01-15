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
	revel.INFO.Printf("Serving post : %s", post)
	Generate(false)
	publicPosts, err := PublicPosts()
	if err == nil {
		for _, publicPost := range publicPosts {
			revel.INFO.Printf("Public post name : %s", publicPost.Shortname)
			revel.INFO.Printf("My stupuid thing : %s", post)
			if publicPost.Shortname == post {
				// return c.RenderTemplate("../../../public/posts/out/cigarettes.html")
				// return c.RenderTemplate("cigarettes")
				return Html(post)
			}
		}
	}
	return c.Render()
}

type Html string

func (r Html) Apply(req *revel.Request, resp *revel.Response) {
	resp.WriteHeader(http.StatusOK, "text/html")

	var file []byte
	var err error

	filePath, err := FindPublicPost(string(r))
	revel.WARN.Printf("Buildng file path : %s", string(r))
	if err == nil {
		revel.INFO.Printf("Reading file : %s", filePath)
		file, err = ioutil.ReadFile(filePath)
		revel.INFO.Printf("Serving file part 1: %s", file)
	}
	if err == nil {
		revel.INFO.Printf("Serving file part 2: %s", file)
		resp.Out.Write(file)
	}
}
