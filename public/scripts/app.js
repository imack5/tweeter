/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Creates a tweet element when passed the tweet object
function createTweetElement(tweet) {

 //takes the time since the tweet, and converts it into user readable output
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

 const $profilePic = $('<img>').addClass("logo").attr("src", tweet.user.avatars.large);
 const $twitterName = $('<span>').addClass("twitter-name").text(tweet.user.name);
 const $twitterID = $('<span>').addClass("twitter-id").text(tweet.user.handle);

 const $timeSinceTweet = $('<span>').addClass("time").text(timeSince(tweet.created_at));
 const $appButtons = $('<span>').addClass("images");

 const $flag = $('<i>').addClass('fas fa-flag');
 const $heart = $('<i>').addClass('fas fa-heart');
 const $retweet = $('<i>').addClass('fas fa-retweet');

 $tweet.append($header
    .append($profilePic)
    .append($twitterName)
    .append($twitterID))
  .append($tweetContent)
  .append($footer
    .append($timeSinceTweet)
    .append($appButtons
      .append($flag)
      .append($heart)
      .append($retweet)
  ));


 return $tweet;
}

//Renders all the tweets on the screen in reverse-chronological order
function renderTweets(tweets) {
  let $tweetArea = $('#tweets-container');

  $tweetArea.empty();

  for(let tweet in tweets){
    $tweetArea.prepend(createTweetElement(tweets[tweet]));
  }
}

//Posts the data from the tweet area to the server, clears the text area, then reloads the tweets
function postTweet(){
  $.ajax({
    type: 'post',
    url: '/tweets/',
    data: $("#new-tweet textarea").serialize()

  })
  .then((data, status, jqXHR) => {
    if (status !== "success") {
      console.error("There was an error getting to the site");
      throw "Request was not a success";
    }
    return data;
  }).then(data =>{
    loadTweets();
  });

  $('#new-tweet textarea').val('');
}

//Loads the tweets from the database, then renders them
function loadTweets(){

  $.ajax({
    type: 'get',
    url: '/tweets/',
  })
  .then((data, status, jqXHR) => {
    if (status !== "success") {
      console.error("There was an error getting to the site");
      throw "Request was not a success";
    }
    return data;
  }).then(data => {
    renderTweets(data);
  });
}


$( document).ready(function(){
  loadTweets();

  //Toggles the new tweet area from hidden to shown, which allows for a smoother animation
  $("#nav-bar .tweet-button").on('click', function(){

    var newTweetArea = $(".container #new-tweet");

    newTweetArea.slideToggle()
    .toggleClass("hidden")
    .toggleClass("shown");

    if(newTweetArea.attr('class') === 'shown'){
      $(".container #new-tweet form textarea").focus();
    }
  });

  //Submits text that was provided in the new tweet form
  $('.container form').on('submit', function(event){
    event.preventDefault();

    //Checks to make sure that the text in the submit area is between 0 and 140 chars
    if($("#new-tweet textarea").val().length <= 0){

      $(".container #inputCheck").text('Must have atleast one character in the tweet!');

    } else if ($("#new-tweet textarea").val().length > 140){

      $(".container #inputCheck").text('Cannot have more than 140 characters in a tweet')

    } else {
      $(".container #inputCheck").text('')
      postTweet();
    }
  });

});