const instance = axios.create({
    baseURL: 'http://localhost:9999/',
    timeout: 0,
    headers: {'token': '123456'}
});
vue = new Vue({
    el: '#app',
    // delimiters:['${', '}'],
    created() {
        let header = {
            headerName: "Content-Type",
            headerValue: "application/json"
        }
        this.headers.push(header)
    },
    data() {
        return {
            activeIndex: '1',
            options: ["GET", "POST"],
            httpMethod: "GET",
            url: 'localhost:9999/',
            tabPosition: 'top',
            total: 1,
            concurrency: 1,
            timeout: 0,
            body: "",
            headers: [],
            percentage: 0,
            report: {},
            activeName: 'setting'
        };
    },
    methods: {
        addHeader() {
            let header = {
                headerName: "",
                headerValue: ""
            }
            this.headers.push(header)
        },
        send() {
            this.percentage = 0;
            let url = this.url
            if (url.indexOf("http") == -1) {
                url = "http://" + url
            }

            headerList = [];
            for (let i = 0; i < this.headers.length; i++) {

                let headerName = this.headers[i].headerName;
                let headerValue = this.headers[i].headerValue;
                let h = headerName + ":" + headerValue
                if (headerName === "Content-Type" && this.httpMethod === "GET") {
                    h = "Content-Type" + ":" + "application/x-www-form-urlencoded; charset=utf-8"
                }
                headerList.push(h);
            }
            let eventId = new Date().getTime().toString();
            instance.post('/resolve', {
                num: parseInt(this.total),
                concurrency: parseInt(this.concurrency),
                url: url,
                method: this.httpMethod,
                data: this.body,
                timeout: parseInt(this.timeout),
                headers: headerList,
                eventId: eventId
            })
                .then(function (response) {
                    console.log(response);
                    vue.report = response.data.result
                    vue.activeName = "testReport"
                })
                .catch(function (error) {
                    console.log(error);
                });

            timer = window.setInterval(function () {
                vue.checkProgress(eventId)
            }, 1000);
        },
        checkProgress(eventId) {
            instance.post('/getProgress', {
                eventId: eventId
            })
                .then(function (response) {
                    console.log(response);
                    vue.percentage = response.data.percent
                    if (response.data.percent == 100) {
                        clearInterval(timer);
                    }

                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        format(percentage) {
            percentage = this.percent
            return percentage
        },
        deleteHeader(index) {
            this.headers.splice(index, 1);
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
})