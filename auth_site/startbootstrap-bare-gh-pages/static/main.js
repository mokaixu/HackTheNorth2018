
    console.log('poop')





$(document).ready (function() {
    console.log('hi2')

$("#submitbutton").click(function(e) {
    console.log('hey')
    e.preventDefault();



var form = new FormData();
form.append("user_id", document.querySelector("#exampleInputEmail1").value);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://52.186.120.229/begin_login",
  "method": "POST",
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

var settings2 = {
  "async": true,
  "crossDomain": true,
  "url": "/check_state",
  "method": "POST",
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
 
  if (JSON.parse(response).status == 'ok') {
    console.log('YES');
    $("#hoverbutton").show();
    $("#fingerprint-container").show();
    $("#username").hide();


    $.ajax(settings2).done(function(response) {
        gqTl.play();
        //gqTl.reverse();

    });

  } else {

  }
});


});
    
  var gqTl = new TimelineMax({paused:true});
gqTl.staggerFromTo(".fingerprint path", 1,{autoAlpha: 0}, {autoAlpha: 1}, 0.1);

$('#hoverbutton').hover(
  function() {  gqTl.play(); },
  function() { gqTl.reverse(); }
);
    
    
})

