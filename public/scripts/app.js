/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document).ready(function(){

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

   const $profilePic = $('<img>').addClass("logo").attr("src", tweet.user.avatars.large);
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

  loadTweets();

  function renderTweets(tweets) {
      $('#tweets-container').empty();

    for(let tweet in tweets){
      $('#tweets-container').prepend(createTweetElement(tweets[tweet]));
    }

  }

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
      console.log(data);
      renderTweets(data);
    });
  }

  $("#nav-bar .tweet-button").on('click', function(){
    $(".container #new-tweet").toggleClass("hidden");
    $(".container #new-tweet").toggleClass("shown");

    if($(".container #new-tweet").attr('class') === 'shown'){
      $(".container #new-tweet form textarea").focus();
    }
  });

  $('.container form').on('submit', function(event){
    event.preventDefault();

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