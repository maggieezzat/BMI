const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
   email: {
       type: String,
       unique: true,
       required: true,
       trim:true,
       minlength: 1,
       validate: {
           validator: validator.isEmail,
           message: '{VALUE} is not a valid email'
       }
   },
   password: {
       type: String,
       required: true,
       minlength: 6
   },
   tokens: [{
       access: {
           type: String,
           required: true
       },
       token: {
        type: String,
        required: true
       }
   }],
   firstName: {
       type: String,
       required: true
   },
   lastName: {
        type: String,
        required: true
   },
   bmis: [{
       bmi: {
           type: Number,
           required: true
       },
       date: {
           type: Date,
           required: true
       },
       height: {
           type: Number,
           required: true
       },
       weight: {
           type: Number,
           required: true
       }
   }]
});

//*********************instance methods***********************
//can NOT be arrow function
//normal function binds 'this' keyword
UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({ access, token });

    return user.save().then(() => {
        return token;
    });
};

//overriding the toJSON method to return only the email and id in the response
//we don;t want the send the token 
// UserSchema.methods.toJSON = function () {
//     var user = this;
//     var userObject = user.toObject();
  
//     return _.pick(userObject, ['_id', 'email']);
// };

UserSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

//****************************model methods**************************
UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (err) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.pre('save', function (next) {
    var user = this;
  
    if (user.isModified('password')) {

      bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(user.password, salt, (err, hash) => {

          user.password = hash;
          next();
        });

      });

    } else {
      next();
    
    }
    
  });

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) {
                    resolve(user);
                } else {
                    reject();
                }
            });

        });

    });
};


const User = mongoose.model('User', UserSchema);

module.exports = {User};
