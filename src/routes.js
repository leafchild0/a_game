/**
 * Created by: leaf
 * Date: 11/25/15
 * Time: 12:31 AM
 */


var ItemModel = require("./models").item;
var User = require("./models").user;

var router = require('express').Router();
var passport = require('passport');

/*Routes
 * GET query
 * GET by id
 * POST new
 * PUT update
 * DELETE
 */

//Get a list of all quests
router.get('/items', isAuth, function (request, response) {
    return ItemModel.find({'owner': request.user._id}, function (err, items) {
        if (err) return response.send(err);

        return response.send(items);
    });
});

//Insert a new quest
router.post('/items', isAuth, function (request, response) {

    var item = new ItemModel({
        name: request.body.name,
        type: request.body.type,
        owner: request.user
    });
    item.save(function (err) {
        if (err) return response.send(err);

        return console.log(item.name + ' has been created');
    });
    return response.status(201).json({
        item: item
    });

});

//Get a single quest by id
router.get('/item/:id', isAuth, function (request, response) {
    return ItemModel.findById(request.params.id, function (err, item) {
        if (err) return response.send(err);

        return response.send(item);
    });
});

//Update a quest
router.put('/item/:id', isAuth, function (request, response) {
    console.log('Updating item ' + request.body.name);
    return ItemModel.findById(request.params.id, function (err, item) {
        if (request.body.name) item.name = request.body.name;
        if (request.body.description) item.description = request.body.description;
        if (request.body.type) item.type = request.body.type;
        if (request.body.priority) item.priority = request.body.priority;
        //Correct add of comments
        if (request.body.comments) item.comments = request.body.comments;
        if (request.body.tags) item.tags = request.body.tags;
        if (request.body.createdDate) item.createdDate = request.body.createdDate;
        if (request.body.dueDate) item.dueDate = request.body.dueDate;
        if (request.body.reference) item.reference = request.body.reference;
        return item.save(function (err) {
            if (err) console.log(err);
            else console.log(item.name + ' updated');

            return response.send(item);
        });
    });
});

//Delete a quest
router.delete('/item/:id', isAuth, function (request, response) {
    console.log('Deleting item with id: ' + request.params.id);
    return ItemModel.findById(request.params.id, function (err, item) {
        return item.remove(function (err) {
            if (err) return response.send(err);

            console.log('item removed');
            return response.send('');
        });
    });
});

/*LOGIN RELATED*/

//logging in user int the system
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                status: info.message
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});

//Posting data with newly create user account
router.post('/signup', function (req, res) {
    User.register(new User({ username: req.body.email }),
        req.body.password, function (err, account) {
            if (err) {
                return res.status(500).json({
                    status: err.message
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(201).json({
                    status: 'Registration successful!'
                });
            });
        });
});

//Logging out
router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/status', function (req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

router.get('*', function (req, res) {
    res.redirect('/');
});

function isAuth(req, res, next) {


    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}

module.exports = router;
