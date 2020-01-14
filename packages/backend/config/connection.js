var mongoose = require('mongoose');
var config = require('./config.json');

// We need to define the URL
const env = process.env.NODE_ENV ? process.env.NODE_ENV : config.env;
var URL = process.env.URL || 'mongodb://' + config.mongo[env].host + '/todoapp';

mongoose.set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

//Connection establishment
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
//Models
// require('../model/task');
var db = mongoose.connection;

//We enebled the Listener
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log('DB Connection established successfully');
});