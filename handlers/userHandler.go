package handlers

import (
	"time"
	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"store.com/configs"
	"store.com/models"
)

// PATH: go-auth/controllers/auth.go
var jwtKey = []byte("my_secret_key")
  func Login(c *gin.Context) {

	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	var existingUser models.User

	configs.DB.Where("email = ?", user.Email).First(&existingUser)

	if existingUser.ID == 0 {
		c.JSON(400, gin.H{"error": "user does not exist"})
		return
	}

	errHash := configs.CompareHashPassword(user.Password, existingUser.Password)

	if !errHash {
		c.JSON(400, gin.H{"error": "invalid password"})
		return
	}

	expirationTime := time.Now().Add(5 * time.Minute)

	claims := &models.Claims{
		Role: existingUser.Role,
		StandardClaims: jwt.StandardClaims{
			Subject:   existingUser.Email,
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		c.JSON(500, gin.H{"error": "could not generate token"})
		return
	}

	c.SetCookie("token", tokenString, int(expirationTime.Unix()), "/", "localhost", false, true)
	c.JSON(200, gin.H{"success": "user logged in"})
}

func CreateUser(c *gin.Context){

		var user models.User
  
		if err := c.ShouldBindJSON(&user); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
  
		var existingUser models.User
  
		configs.DB.Where("email = ?", user.Email).First(&existingUser)
  
		if existingUser.ID != 0 {
			c.JSON(400, gin.H{"error": "user already exists"})
			return
		}
  
		var errHash error
		user.Password, errHash = configs.GenerateHashPassword(user.Password)
  
		if errHash != nil {
			c.JSON(500, gin.H{"error": "could not generate password hash"})
			return
		}
  
		configs.DB.Create(&user)
  
		c.JSON(200, gin.H{"success": "user created"})  
}

func Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "localhost", false, true)
	c.JSON(200, gin.H{"success": "user logged out"})
}