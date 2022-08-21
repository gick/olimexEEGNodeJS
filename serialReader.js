const { SerialPort } = require('serialport')
const { ByteLengthParser } = require('@serialport/parser-byte-length')
const Reader=require('endian-reader')

let port = new SerialPort({ path: '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A902ZSBS-if00-port0', baudRate: 57600 })
let parser = port.pipe(new ByteLengthParser({ length: 17 }))
let endian=new Reader('be',{size:4})

let parse = function (data) {
    let str = data.toString('hex')
    console.log(str)
    let parsed=normalizeString(str)
    console.log(getStructuredData(parsed))
}

parser.on('data', parse)


let normalizeString = function (packet) {
    // packets starts with a5 5a
    // but the a55a substring can be at any position
    // so we need to find it and append the end (before a5) to the begin (after a5)
    let r = /\w*(?=a5)/
    let end = r.exec(packet) === null ? '' : r.exec(packet)[0]
    let r2 = /(?<=5a)\w*/
    let begin = r2.exec(packet) === null ? '' : r2.exec(packet)[0]
    return begin + end
}

getStructuredData = function (stringData) {
    let ver=stringData.substring(0,2)
    let count=stringData.substring(2,4)
    let data=stringData.substring(4,28)
    let p=stringData.substring(28,29)  
    let arrayData=data.split(/(\w{4})/).filter(v=>v!=='')
    let struct={
        version:ver,
        count:count,
        data:getEletrodeData(arrayData),
    }
    return struct
}

getEletrodeData = function(arrayData){
    electrodeData=[]   
    for(let s of arrayData ){
        let buf=new Buffer(s,'hex')
        let val=endian.readInt16(buf)
        electrodeData.push(val)
    }
    return electrodeData
}