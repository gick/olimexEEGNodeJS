let fft = require("ezfft").fft;
let {startListening}=require('../eegReader/serialReader')
let nbrMsr=1000 
let socket


let normalizeData=function(data){
    let normalizedData=[]
    for(let i=0;i<data.length;i++){
        normalizedData.push(data[i].data[0]-data[i].data[1])
    }
    let dataFFT=fft(normalizedData,256,0,10)
    send(dataFFT)
}
let start=function(socket){
    console.log("socket")
    this.socket=socket
    startListening({numPackets:nbrMsr,callback:normalizeData})

}
let send=function(data){
    this.socket.emit('data',data)
}

module.exports={start}