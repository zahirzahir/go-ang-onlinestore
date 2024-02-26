package models

import "gorm.io/gorm"

type Product struct{
	gorm.Model
	ProductName string `json:"productName"`
	CategoryID  uint  `json:"categoryId"`
	Price  string      `json:"price"`
	Picture string     `json:"picture"`
	Quantity int32     `json:"quantity"`
	Description string `json:"description"`
	Brand string       `json:"brand"`
	LableNumber string `json:"lableNumber"`
}