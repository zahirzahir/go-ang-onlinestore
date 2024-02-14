package handlers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"store.com/configs"
	"store.com/models"
)

func GetAllCategory(c *gin.Context){
 var category []models.Category
  if err:= configs.DB.Find(&category).Error; err != nil{
	c.AbortWithStatus(404)
	fmt.Print(err)
  } else {
	c.JSON(200,category)
  }	
}