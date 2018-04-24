/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document).ready(function(){


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function createTweetElement(tweet) {

  function timeSince(time){
    let timeElapsed = '';
    let seconds = (Date.now() - time) / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 60;

    if(days >= 1){
      timeElapsed = Math.floor(days) + " days ago";
    } else if(hours >= 1){
      timeElapsed = Math.floor(hours) + " hours ago";
    } else if(minutes >= 1){
      timeElapsed = Math.floor(minutes) + " minutes ago";
    } else if(seconds >= 1){
      timeElapsed = Math.floor(seconds) + " seconds ago" ;
    }
    return timeElapsed;
  }

  let $tweet = $('<article>').addClass('tweet');

  const $header = $('<header>');
  const $footer = $('<footer>');
  const $tweetContent = $('<div>').addClass('tweet-content').text(tweet.content.text);

  const $profilePic = $('<img>').addClass("logo").attr("src", "http://patriciaannbridewell.files.wordpress.com/2014/04/official-twitter-logo-tile.png");
  const $twitterName = $('<span>').addClass("twitter-name").text(tweet.user.name);
  const $twitterID = $('<span>').addClass("twitter-id").text(tweet.user.handle);

  const $timeSinceTweet = $('<span>').addClass("time").text(timeSince(tweet.created_at));
  const $appButtons = $('<span>').addClass("images");

  const $flag = $('<i>').addClass('fas fa-flag');
  const $heart = $('<i>').addClass('fas fa-heart');
  const $retweet = $('<i>').addClass('fas fa-retweet');

  $tweet.append($header).append($tweetContent).append($footer);

  $header.append($profilePic).append($twitterName).append($twitterID);

  $footer.append($timeSinceTweet).append($appButtons);

  $appButtons.append($flag).append($heart).append($retweet);



  return $tweet;
}


function renderTweets(tweets) {

  for(let tweet in tweets){
    $('#tweets-container').append(createTweetElement(tweets[tweet]));
  }

}



// Test / driver code (temporary // to see what it looks like
renderTweets(data);

});