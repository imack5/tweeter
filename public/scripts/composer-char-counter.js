//Counts the # of chars in the new tweet text area, prints the char count in red if invalid
$(document).ready(function(event) {

  $('#new-tweet form textarea').on('input', function(event){

    let $counterText = $(this).siblings(".counter");

    $counterText.text(140 - this.value.length);

    if(this.value.length > 140){
      $counterText.css('color', 'red');
    } else {
      $counterText.css('color', 'black');
    }
  });
});



