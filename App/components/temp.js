
            function loadEach(url, index) {
                console.log(url)
                return new Promise(function (resolve, reject) {
                    let req = new XMLHttpRequest()
                    console.log("start prep")
                    req.open('GET', url, true)
                    req.responseType = 'arraybuffer'
                    req.onload = function () {
                        if (this.status >= 200 && this.status < 300) {
                            resolve(req.response)
                            console.log(req.response)
                        } else {
                            reject({
                                status: this.status,
                                statusText: request.statusText
                            });
                        }
                    }; req.send();

                })        
            }
