package configs

// PATH: go-auth/utils/GenerateHashPassword.go

import (
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	"store.com/models"
)

 func GenerateHashPassword(password string) (string, error) {
     bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
     return string(bytes), err
 }

 func CompareHashPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func ParseToken(tokenString string) (claims *models.Claims, err error) {
	token, err := jwt.ParseWithClaims(tokenString, &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437"), nil
	})

	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*models.Claims)

	if !ok {
		return nil, err
	}

	return claims, nil
}
