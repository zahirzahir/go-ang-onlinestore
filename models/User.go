package models

import (
	"gorm.io/gorm"
)

type User struct{
	gorm.Model
	 FirstName string `json:"firstname"`
	 LastName string `json:"lastname"`
     Email    string `gorm:"unique" json:"email"`
     Password string `json:"password"`
     Role     string `json:"role"`
}