package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gameshop-backend/configs"
	"gameshop-backend/controllers"
	"gameshop-backend/middlewares"
)

func main() {
	// connect DB + migrate
	configs.ConnectDB()
	db := configs.DB()
	controllers.InitDB(db)

	// ทำ AutoMigrate สร้างตาราง
	configs.SetupDatabase()

	r := gin.Default()
	r.Use(middlewares.CORSMiddleware())

	// Auth routes
	auth := r.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
	}

	// Protected User routes
	user := r.Group("/users")
	user.Use(middlewares.Authorizes())
	{
		user.GET("/", func(c *gin.Context) { c.JSON(200, "List users") })
		user.GET("/:id", func(c *gin.Context) { c.JSON(200, "Get user") })
	}

	log.Println("🚀 Server started at :8080")
	http.ListenAndServe(":8080", r)
}
