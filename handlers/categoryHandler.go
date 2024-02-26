package handlers

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"store.com/configs"
	"store.com/models"
)

func GetAllCategory(c *gin.Context) {
	var category []models.Category
	if err := configs.DB.Find(&category).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Print(err)
	} else {
		c.JSON(200, category)
	}
}
func GetCategoryByid(c *gin.Context) {
	id := c.Params.ByName("id")
	var category models.Category
	if err := configs.DB.Where("id=?", id).First(&category).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Println(err)
	} else {
		c.JSON(200, category)
	}
}
func CreateCategory(c *gin.Context) {
	var category models.Category
	c.ShouldBindJSON(&category)
	configs.DB.Save(&category)
	c.JSON(200, gin.H{"success": "Category created"})
}

func UpdateCategory(c *gin.Context) {
	var category models.Category
	id := c.Params.ByName("id")
	if err := configs.DB.Where("id=?", id).First(&category).Error; err != nil {
		c.AbortWithStatus(400)
		fmt.Print(err)
	}
	c.ShouldBindJSON(&category)
	configs.DB.Save(&category)
	c.JSON(200, gin.H{"success": "Succesfully Updated"})
}

func DeleteCategory(c *gin.Context){
	id := c.Params.ByName("id")
	var category models.Category;
	configs.DB.Where("id=?",id).Delete(&category)
	c.JSON(200, gin.H{"id #" + id: "deleted"})

}