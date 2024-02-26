package handlers

import (
	
	"net/http"
	"github.com/gin-gonic/gin"
	"store.com/configs"
	"store.com/models"
)


func GetAllProduct(c *gin.Context){
	var product []models.Product;
	configs.DB.Find(&product)
		c.JSON(200,product)
}
func GetProductByid(c *gin.Context){
	var product models.Product
	id := c.Params.ByName("id");
	configs.DB.Where("id=?",id).First(&product)
	if product.ID ==0{
		c.JSON(404,gin.H{"error":"the product not exist"})
	}else{
	c.JSON(200,product)
	}
}
func CreateProduct(c *gin.Context){
	var product models.Product;
  if err:= c.ShouldBindJSON(&product); err !=nil{
	c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
	return
  }else{
	configs.DB.Save(&product);
	c.JSON(200,gin.H{"success":"Product successfully saved"})	
  }
}
func UpdateProduct(c *gin.Context){
	var product models.Product
	id := c.Params.ByName("id")
	configs.DB.Where("id=?",id).First(&product)
	if  err :=c.ShouldBindJSON(&product); err!=nil{
		c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
		return
	}else{	
    configs.DB.Save(&product)
	c.JSON(200,gin.H{"success":"successfully upadeted"})
	}
}
func DeleteProduct(c *gin.Context){
	id := c.Params.ByName("id")
	var product models.Product;
	configs.DB.Where("id=?",id).First(&product)
	if product.ID==0{
		c.JSON(404,gin.H{"error":"The Product is not deleted"})
	}else{
		configs.DB.Delete(&product)
		c.JSON(200,gin.H{"success":"successfully Deleted"})
	}
	}

