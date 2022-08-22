const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eegPacketSchema = new Schema({

    version: String,
    count: String,
    pState: String,
    data: [Number],
    date: { type: Date, default: Date.now }
});

const EEGPacket = mongoose.model('EEGPacket', eegPacketSchema)

module.exports = EEGPacket
