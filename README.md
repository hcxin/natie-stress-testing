# 拿铁-压力测试工具

#### 介绍
go语言实现压力测试工具-拿铁

#### 软件架构
软件架构说明
使用go语言开发，主要使用协程wg、channel、select等。

#### 安装教程

下载所有项目文件。

#### 使用说明

#### web图形界面模式：
双击natie.exe文件运行。
访问：http://localhost:9999/

#### 命名行模式（暂时未发布）：
##### get请求:
`natie -n 100 -c 3 -m "GET" -t 30 -u "http://localhost:8080/getUserInfo?name=haichen" -h "Content-Type: application/x-www-form-urlencoded" -h "Cache-Control: no-cache"`
##### POST请求 支持文件读取和直接写数据
`natie -n 100 -c 3 -m "POST" -t 30 -u "http://localhost:8080/getUserInfo?name=hcxin" -d "post.txt" -h "Content-Type: application/x-www-form-urlencoded" -h "Cache-Control: no-cache"` 

`natie -n 100 -c 3 -m "POST" -t 30 -u "http://localhost:8080/getUserInfo?name=hcxin" -d "name=haichen&age=10" -h "Content-Type: application/x-www-form-urlencoded" -h "Cache-Control: no-cache"`
##### POST json数据，支持文件读取和直接写数据 

`natie -n 100 -c 3 -m "POST" -t 0 -u "http://localhost:8080/getUser" -d "json.txt" -h "Content-Type: application/json" -h "Cache-Control: no-cache"` 

`natie -n 100 -c 3 -m "POST" -t 0 -u "http://localhost:8080/getUser" -d "{\"name\":\"haichen\",\"age\":\"17\"}" -h "Content-Type: application/json" -h "Cache-Control: no-cache"` 

#### 参数说明
-c uint
并发数（用户数） (default 1)

-d string
请求数据 (default "{}")

-h value
-h 'Content-Type: application/json'

-m string
请求方法GET/POST... (default "GET")

-n uint
请求总数 (default 10)

-t int
请求超时时间

-u string
请求地址 (default "https://www.baidu.com")

#### 参与贡献
hcxin
源码加wx：MissYLeslie

#### 未来规划
1.  支持html客户端 （已支持）
2.  支持GUI客户端