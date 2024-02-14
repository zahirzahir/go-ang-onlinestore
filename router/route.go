package router
import(
	"github.com/gin-gonic/gin"
	"store.com/handlers"
)
func Route(r *gin.Engine){

	r.POST("/login", handlers.Login)
    r.POST("/signup",handlers.CreateUser)
    r.GET("/logout",handlers.Logout)
	
}
