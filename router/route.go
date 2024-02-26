package router

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	//"store.com/configs"
	"store.com/handlers"
)
func Route(r *gin.Engine){

	r.POST("/login", handlers.Login)
	r.GET("/user",handlers.AllUser)
	//r.Use(configs.IsAuthorized())
    r.POST("/signup",handlers.CreateUser)
	r.GET("/user/:id",handlers.GetUserByid)
	r.DELETE("/user/:id",handlers.DeleteUser)
	r.PATCH("/user/:id",handlers.UpdateUser)
    r.GET("/logout",handlers.Logout)
	//Category routes
	r.GET("/category",handlers.GetAllCategory)
	r.GET("/category/:id",handlers.GetCategoryByid)
	r.POST("/category",handlers.CreateCategory)
	r.PATCH("/category/:id",handlers.UpdateCategory)
	r.DELETE("/category/:id",handlers.DeleteCategory)
	//Product routes
	r.GET("/product",handlers.GetAllProduct)
	r.GET("/product/:id",handlers.GetProductByid)
	r.POST("/product",handlers.CreateProduct)
	r.PATCH("/product/:id",handlers.UpdateProduct)
	r.DELETE("/product/:id",handlers.DeleteProduct)
	r.Use(cors.Default())	 

	
	
}
