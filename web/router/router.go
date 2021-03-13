package router

import (
	"github.com/gin-gonic/gin"
	"natie/web/controller"
	"natie/web/middleware"
	"net/http"
)

func Init() {
	var engine = gin.Default()
	engine.Use(middleware.Interceptor)
	natieGroup := engine.Group("/")
	//页面路径
	engine.LoadHTMLGlob("web/templates/*")
	natieGroup.POST("/resolve", controller.Resolve)
	natieGroup.POST("/getProgress", controller.GetProgress)
	natieGroup.GET("/", controller.Index)
	engine.StaticFS("/web/static", http.Dir("./web/static"))
	//engine.Static("/web/static/js", "web/static/js")
	engine.Run(":9999")
}
