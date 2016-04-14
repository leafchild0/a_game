/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var configDB = require('./config');

//Connect to database "a_game"
mongoose.connect(configDB.dbUrl);

//In case of any additional operations with DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to project database");
});

var Comments = new mongoose.Schema({
    body: String,
    date: {
        type: Date,
        default: Date.now
    }
});
//Schemas
var Item = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    priority: Number,
    subtasks: [{
        name: String
    }],
    tags: [{
        text: String
    }],
    comments: [Comments],
    createdDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    },
    reference: String

});

var User = mongoose.Schema({

    local: {
        email: String,
        fullName: String,
        password: String,
    },

});

//Models
var ItemModel = mongoose.model('Item', Item);
var UserModel = mongoose.model('User', User);

// generating a hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = {
    item: ItemModel,
    user: UserModel
};
