package golang_blog

import (
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/russross/blackfriday"
	"hash/crc64"
	"io/ioutil"
	"os"
	"path"
	"strings"
	"time"
)

var _ = crc64.MakeTable

/* Makes sure envioronment variables are set:
BLOG_SRC
BLOG_WEB
BLOG_TARGET
*/
func init() {
	Initialize()
}

type post struct {
	Title       string
	Shortname   string
	DateDisplay time.Time
	DateCreated time.Time
	DateUpdated time.Time
	Public      bool
	Checksum    int
	Tags        []string
}

func (p post) String() string {
	return "Post shortname = " + p.Shortname
}

type Generator struct {
	rootPath string
	list     []post
}

type test struct {
	date time.Time
}

/* This is the root of the function that will be called on a CRON / Save file basis which translates .md files into static pages and generates metadata around files in your BLOG_SRC directory */
func Generate(manifest bool) {
	if manifest {
		SaveManifest()
	}
	GenerateHtml()
}

/*
  This function returns all of the public posts in the web's manifest file
*/
func PublicPosts() (posts []post, err error) {
	manifest, err := Manifest()
	if err == nil {
		for _, post := range manifest {
			if post.Public {
				posts = append(posts, post)
			}
		}
	}
	return
}

/* This function scans the manifest file looking for public posts, creating a .html file in the BLOG_TARGET directory for each one */
func GenerateHtml() {
	posts_src := path.Join(BLOG_SRC)
	posts_target := path.Join(BLOG_TARGET, "out")
	os.MkdirAll(posts_target, os.ModePerm)
	posts, err := PublicPosts()
	if err == nil {
		for _, post := range posts {
			if post.Public {
				html := Compile(posts_src, post.Shortname)
				outPath := path.Join(posts_target, post.Shortname+".html")
				err := ioutil.WriteFile(outPath, []byte(html), os.ModePerm)
				if err != nil {
					fmt.Println("Fuck, an err ", err)
				}
			}
		}
	}
}

/* Retrieves the manifest file as a byte slice, used in some obscure function */
func ManifestBytes() ([]byte, error) {
	fullpath := path.Join(BLOG_TARGET, "manifest.json")
	return ioutil.ReadFile(fullpath)
}

/* Retrieves the manifest file */
func Manifest() ([]post, error) {
	manifestBytes, err := ManifestBytes()
	var posts = make([]post, 1)

	if err == nil {
		err = json.Unmarshal(manifestBytes, &posts)
	}

	return posts, err
}

/* Writes the manifest object into a .json file in the BLOG_TARGET directory */
func WriteManifest(posts_target string, manifest []post) {
	os.MkdirAll(posts_target, os.ModePerm)
	manifestPath := path.Join(posts_target, "manifest.json")

	file, err := os.Create(manifestPath)

	if err == nil {
		manifestJson, err := json.Marshal(manifest)
		if err == nil {
			var b bytes.Buffer
			json.Indent(&b, manifestJson, "", "\t")
			b.WriteTo(file)
		}
	} else {
		fmt.Println(err)
	}
}

/* Gathers the metadata from files in BLOG_SRC, then calls WriteManifest to persist it */
func SaveManifest() {
	postsData, _ := ioutil.ReadDir(BLOG_SRC)

	manifest := make([]post, 1)

	for _, postData := range postsData {
		newPost := post{Shortname: Shortname(postData.Name()), DateCreated: time.Now(), Public: false}
		manifest = append(manifest, newPost)
	}

	WriteManifest(BLOG_TARGET, manifest)
}

func Shortname(str string) string {
	return strings.Split(str, ".")[0]
}

func Compile(root string, shortname string) string {
	path := path.Join(root, shortname+".md")
	file, err := ioutil.ReadFile(path)

	// checksum := crc64.Checksum(file, crc64.MakeTable(crc64.ISO))
	// fmt.Println(checksum, "awef")

	if err == nil {
		return string(blackfriday.MarkdownBasic(file))
	} else {
		return ""
	}
}
