package main

import (
	"github.com/gin-gonic/gin"
	"store.com/configs"
	"store.com/router"
)

func main(){
	r:= gin.Default()
     configs.Migration()
	 router.Route(r)
	 r.Run()
}