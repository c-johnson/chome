package main

import (
	"fmt"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
	port := 9001
	fmt.Printf("Serving on port :%d\n", port)
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":9001", nil))
	fmt.Printf("Wtf?\n")
}
