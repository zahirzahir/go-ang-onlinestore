package configs

import (
	"fmt"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"store.com/models"
)

var secret string ="e234567rtyufghj567dfghj"

func RequireAuth(c *gin.Context) {
	tokenstring, err := c.Cookie("Authorization")
	if err != nil {
		//c.Redirect(http.StatusFound,"/login")

		c.AbortWithStatus(http.StatusUnauthorized)
	}

	token, err := jwt.Parse(tokenstring, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(secret), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
			//c.Redirect(http.StatusFound,"/login")

		}

		var user models.User
		DB.First(&user, claims["sub"])
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		
			//c.Redirect(http.StatusFound,"/login")

		}
		c.Set("user",user)
		c.Next()
	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
		//c.Redirect(http.StatusFound,"/login")

	}

}
