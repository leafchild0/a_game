/**
 * Created by: leaf
 * Date: 10/10/15
 * Time: 4:33 PM
 */
var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Comments = new mongoose.Schema({
    body: String,
    date: {
        type: Date,
        default: Date.now
    }
});

var User = mongoose.Schema({

    username: String,
    password: String,
    fullName: String
});

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
    comments: [{type: mongoose.Schema.ObjectId, ref: 'Comments'}],
    createdDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    },
    reference: String,
    owner: { type: mongoose.Schema.ObjectId, ref: 'User' }

});

User.plugin(passportLocalMongoose);

//Models
var ItemModel = mongoose.model('Item', Item);
var UserModel = mongoose.model('User', User);


module.exports = {
    item: ItemModel,
    user: UserModel
};
