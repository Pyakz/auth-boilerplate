const mongoose = require('mongoose')
const { Schema } = mongoose;

const Room = new Schema({
    boarders: [
        {
            type:Schema.Types.ObjectId,
            ref:'Boarder',
        }
    ],
    name: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    capacity: {
        type: Number,
        default: 1,
        required:true
    },
    features: {
        type: [String]
    }
})

module.exports = mongoose.model('Room', Room)