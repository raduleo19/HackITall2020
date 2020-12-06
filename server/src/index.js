require("express-async-errors");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

app.all('/*', allowCrossDomain);
// routes and middleware
app.use(express.json({ limit: "10kb" }));
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(compression());
app.use("/api/user", require("./routes/users/index"));
app.use("/api/topics", require("./routes/topics/index"));
app.use("/api/stories", require("./routes/stories/index"));
app.use(require("./middleware/error"));
// var googleTrends = require('google-trends-api');
// googleTrends.dailyTrends({
//   geo: 'RO',
// }, function(err, results) {
//   if (err) {
//     console.log(err);
//   }else{
//      var result = JSON.parse(results).default.trendingSearchesDays[1].trendingSearches;
//      var result2 = result.map(a => a.title.query);
//     console.log(result2);
//   }
// });

// connect to DB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb database");
  })
  .catch((err) => {
    console.log(err);
  });

// start server
app.listen(port, () => {
  console.log(`server is now listening on port ${port}...`);
});
