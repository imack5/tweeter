"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      console.log(newTweet);
        db.collection("tweets").insertOne(newTweet, function(err, r){
          if (err){
            throw err;
          }
          //db.close();
        });
        callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        let tweetArray = [];

        db.collection("tweets").find({}, (err, result) => {
          if (err) throw err;
          result.toArray((err, item) => callback(null, item.sort(sortNewestFirst)));
          //db.close();
        });
    }

  };
}
