$( ".set" )
  .focusout(function() {
    focus++;
    $('body').css('background',$( "#color" ).val());
    $('.red').css('background',$( "#color" ).val());
  });