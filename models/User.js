const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    _images: [], //ref
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true} 
})

const User = model('User', schema);

module.exports = User;