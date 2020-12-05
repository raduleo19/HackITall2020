var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
require('./models/user');
require('./models/topics');


var users = require('./routes/users');
var topics = require('./routes/topics');
var planning = require('./routes/planning');

var googleTrends = require('google-trends-api');

var mongoDB = 'mongodb+srv://dbUser:Q3uySxsVIPUxyaub@cluster0.fmnwp.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;

googleTrends.dailyTrends({
    geo: 'RO',
  }, function(err, results) {
    if (err) {
      console.log(err);
    }else{
       var result = JSON.parse(results).default.trendingSearchesDays[1].trendingSearches;
       var result2 = result.map(a => a.title.query);
      console.log(result2);
    }
  });

var app = express();
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/users', users);
app.use('/api/topics', topics);
app.use('/api/planning', planning);

app.listen(3000, () => console.log(`Hello world app listening on port ${3000}!`));