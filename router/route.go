package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"store.com/configs"
	"store.com/handlers"
)
func Route(r *gin.Engine){

	r.POST("/login", handlers.Login)
	r.GET("/user",handlers.AllUser)
	r.Use(configs.IsAuthorized())
    r.POST("/signup",handlers.CreateUser)
	r.GET("/user/:id",handlers.GetUserByid)
	r.DELETE("/user/:id",handlers.DeleteUser)
	r.PATCH("/user/:id",handlers.UpdateUser)
    r.GET("/logout",handlers.Logout)
	r.Use(cors.Default())	 

	
	
}
