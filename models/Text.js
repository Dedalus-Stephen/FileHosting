const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    text: {type: String, required:true},
    userId: {type: Types.ObjectId, required:true},
    textId: {type: String, required:true},
    tree: Object,
    name: {type: String, required:true},
})

const Text = model('Text', schema);

module.exports = Text;