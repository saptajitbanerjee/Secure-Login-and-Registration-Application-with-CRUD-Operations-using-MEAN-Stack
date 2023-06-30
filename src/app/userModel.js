var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    email_addr: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Registration', userSchema);