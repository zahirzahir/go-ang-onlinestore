package models
 import(
	"gorm.io/gorm"
 )
 type Category struct{
	gorm.Model
	CategoryName string `json:"categoryName"`
	Product []Product
 }