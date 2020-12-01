const mongoose = require('mongoose')
const { Schema } = mongoose;

const Boarder = new Schema({
    roomID: {
        type:Schema.Types.ObjectId,
        ref:'Room'
    },
    name: {
        type: String,
        max:2,
        max:100,
        required:true
    },
    contactNum: {
        type: String,
        max:2,
        max:100,
        required:true
    },
    parentNum: {
        type: String,
        max:2,
        max:100,
        required:true
    },
    picture: {
        type: String,
        max:2,
        max:100,
        required:true
    },
})

module.exports = mongoose.model('Boarder', Boarder)