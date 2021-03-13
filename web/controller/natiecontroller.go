package controller

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"natie/common/model"
	"natie/component"
	"natie/service"
	"net/http"
)

func Resolve(context *gin.Context) {
	//处理
	jsonParams := model.Params{}

	context.BindJSON(&jsonParams)
	completeReport := make(chan *model.Report, 1)
	//每个请求生成新的map
	component.ResetProgressMap()
	service.Resolve(jsonParams, completeReport)
	report := <-completeReport
	context.JSON(200, gin.H{"result": report})
}

func GetProgress(context *gin.Context) {
	json := make(map[string]string)
	context.BindJSON(&json)
	eventId := json["eventId"]
	percent := component.GetProgressMap(eventId)
	context.JSON(200, gin.H{"percent": percent})
}

func Index(context *gin.Context) {
	context.HTML(http.StatusOK, "index.html", gin.H{
		"title": "拿铁",
	})
}
func Logout(context *gin.Context) {
	token := context.GetHeader("token")
	fmt.Println("==token===" + token)
	context.JSON(200, gin.H{"code": "200"})
}
