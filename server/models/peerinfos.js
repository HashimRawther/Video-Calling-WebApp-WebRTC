const mongoose = require('mongoose')
const schema = mongoose.Schema
const peerSchema = new schema({
    username: {
        type: String,
        required: true
    },
    roomid: {
        type: String,
        required: true
    },
    peerid: {
        type: String,
        required: true
    },
    audioStatus: {
        type: Boolean,
        required: true
    },
    videoStatus: {
        type: Boolean,
        required: true
    }
}, {timestamps: true})

const Peer = mongoose.model('peer', peerSchema)

module.exports = Peer