class Buffer {

    constructor(context, urls) {
        this.context = context;
        this.urls = urls;
        this.buffer = [];
        let loaded = false;
    }

    loadSound(url, index) {
       return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            let thisBuffer = this;
        console.log(this.context)
        
            
           request.onload = () => {      
                resolve(request.response)
                thisBuffer.context.decodeAudioData(request.response, function (buffer) {
                    thisBuffer.buffer[index] = buffer;   
                    console.log("the buffer with index is")
                    console.log(thisBuffer.buffer[index])
                    console.log("and this is")
                    console.log(this)                    
                    if (index == thisBuffer.urls.length - 1) {
                        thisBuffer.loaded();
                    }
                })
            }
            request.send();    
        })
        
        
    }
    /*loadSound(url, index) {
        
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        let thisBuffer = this;
        request.onload = () => {
            thisBuffer.context.decodeAudioData(request.response, function (buffer) {
                thisBuffer.buffer[index] = buffer;   
                console.log("the buffer with index is")
                console.log(thisBuffer.buffer[index])
                console.log("and this is")
                console.log(this)
                console.log(thisBuffer)
                if (index == thisBuffer.urls.length - 1) {
                    thisBuffer.loaded();
                }
            })
        }
        request.send();
    }*/


    getBuffer() {
        this.urls.forEach((url, index) => {
            this.loadSound(url, index).then(this.loaded(), this.failed());
            console.log(this.buffer)
        })
    }

    failed() {
        console.log("failed")
        return
    }

    loaded() {
        this.loaded = true;
        console.log("success")
        //buffer = thisBuffer.buffer;
    }

    getSound(index) {
        console.log(this.buffer)
        return this.buffer[index];
    }
}

export default Buffer