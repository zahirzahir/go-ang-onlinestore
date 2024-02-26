package configs
import (
	"fmt"
	"store.com/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

const DNS = "root:Tahirtanha@123@tcp(127.0.0.1:3306)/go_ang?charset=utf8mb4&parseTime=True&loc=Local"

func Migration() {
	DB, err = gorm.Open(mysql.Open(DNS), &gorm.Config{})
	if err != nil {
		fmt.Println(err.Error())
		panic("Can't connect to Db")
	}
	DB.AutoMigrate(&models.Category{})
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Product{})
}