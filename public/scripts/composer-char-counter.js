$(document).ready(function(event) {

  $('.new-tweet form textarea').on('input', function(event){
    let counterText = $(this).parent().children(".counter")
    counterText.text(140 - this.value.length);
    if(this.value.length > 140){
      counterText.css('color', 'red');
    } else {
      counterText.css('color', 'black')
    }
  });


});


