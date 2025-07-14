const {model, Schema} = require('mongoose')

const videoSchema = new Schema({
   title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
},{timestamps: true})
module.exports = model('videos', videoSchema)
