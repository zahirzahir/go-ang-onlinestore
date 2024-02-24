package handlers

import (
	"fmt"
	"time"
	"github.com/dgrijalva/jwt-go"
	//"github.com/golang-jwt/jwt/v5"
	"github.com/gin-gonic/gin"
	//"golang.org/x/crypto/bcrypt"
	"store.com/configs"
	"store.com/models"
)

// PATH: go-auth/controllers/auth.go
var jwtKey = []byte("e234567rtyufghj567dfghj")

func AllUser(c *gin.Context) {
	var user []models.User
	if err := configs.DB.Find(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, user)
	}
}
func GetUserByid(c *gin.Context) {
	id := c.Params.ByName("id")
	var user models.User
	if err := configs.DB.Where("id=?", id).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, user)
	}

}

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
	c.JSON(200, gin.H{"token":tokenString})
}

func CreateUser(c *gin.Context) {

	var user models.User

	c.ShouldBindJSON(&user)

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

	configs.DB.Save(&user)

	c.JSON(200, gin.H{"success": "user created"})
}

func Logout(c *gin.Context) {
	c.SetCookie("token", "", -1, "/", "localhost", false, true)
	c.JSON(200, gin.H{"success": "user logged out"})
}
func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user models.User
	configs.DB.Where("id=?", id).Delete(&user)
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdateUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user models.User
	if err := configs.DB.Where("id = ?", id).First(&user).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	}
	c.ShouldBindJSON(&user)
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
	configs.DB.Save(&user)
	c.JSON(200, user)
}
