package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func Interceptor(context *gin.Context) {
	before(context)
	context.Next()
	after(context)
}

func before(context *gin.Context) {
	path := context.FullPath()
	method := context.Request.Method
	fmt.Println("path-->" + path)
	fmt.Println("method--->" + method)
}

func after(context *gin.Context) {
	fmt.Println("Interceptor--->")
	if context.Writer.Written() {
		return
	}

	params := context.Keys
	if len(params) == 0 {
		return
	}
	context.JSON(http.StatusOK, params)
	fmt.Println("Interceptor-end-->")
}
