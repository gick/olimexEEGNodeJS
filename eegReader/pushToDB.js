const EEGPacket = require('../schema/eegPacket')
const registerPackets=async (data)=>{
    let packet=await EEGPacket.create(data)
    return packet
}
module.exports={registerPackets}