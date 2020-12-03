const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    image: {type: String, required:true},
    userId: {type: Types.ObjectId, required:true},
    imageId: {type: String, required:true},
    tree: Object,
    name: {type: String, required:true},
})

const Image = model('Image', schema);

module.exports = Image;