const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
const {User} = require('./Models/User');
const {ObjectID} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');
const _ = require('lodash');
var cors = require('cors');
var app = express();
//parsing request bodies
app.use(bodyParser.json());


// use it before all route definitions
app.use(cors({origin: '*'}));

//creating a new user (sign up)
app.post('/api/users/signup', (req, res) => {

    var user = new User({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        bmis: []
    });

    user.save().then((user) => {
        return user.generateAuthToken();
        }).then((token) => {
            res.header('x-auth', token).send(user);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
    
});

//login a user
app.post('/api/users/login', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then( (user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
          });
    }).catch((e) => {
        res.status(400).send();
    });

});

//logout a user
app.delete('/api/users/logout', authenticate, (req, res) => {

    req.user.removeToken(req.token).then( () => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
});


//save to user's history
app.patch('/api/users/save/:id', authenticate, (req, res) => {

     var id = req.params.id;

     console.log(req);
     console.log(req.body.weight);
     console.log(req.body.height);

     User.findOne({'_id':id}).then( (user) => {
         
        var body = _.pick(req.body.body, ['bmi', 'weight', 'height']);
        newBMI = {
            bmi: body.bmi,
            date: Date.now(),
            weight: body.weight,
            height: body.height
        }
        
        user.bmis.push(newBMI);
     User.findByIdAndUpdate(id, {$set:  user }, {new: true}).then((updatedUser) => {
        if(!updatedUser) {
          return res.status(404).send();
        }
        res.send({updatedUser});
      }).catch((e) => {
        res.status(500).send();
      })
     
    });

});


//getting all bmis (history) of a user
app.get('/api/users/bmis', authenticate ,(req, res) => {
    res.send(req.user.bmis);
});


app.listen(3437, () => {
    console.log(`Server running on port 3437`);
  });