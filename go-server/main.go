package main

import (
	"fmt"
	"log"
	"net/http"

	"go-server/router"

	"github.com/rs/cors"
)

func main() {
	r := router.Router()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
	})

	handler := c.Handler(r)
	fmt.Println("Starting server on the port 8080...")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
