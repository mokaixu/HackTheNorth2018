
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
        status = JSON.parse(response).status
        console.log(response)
        if (status == 200) {
            console.log('hi')
            gqTl.play();
            setTimeout(function(){ window.location.replace("/mokai"); }, 3000);
          

        } // auth successgq
        else if (status == 400) {
            gqTlred.play();
            setTimeout(function(){   $("#failedfinger").show(); 
            setTimeout(function(){ location.reload();}, 1000);}, 3000);

        } else {

            $("#timeoutfinger").show();

        }

    });

  } else {
    console.log('username not found');
    $("#timeoutfinger").show();

  }
});


});
    
  var gqTl = new TimelineMax({paused:true});
gqTl.staggerFromTo(".fingerprint path", 1,{autoAlpha: 0}, {autoAlpha: 1}, 0.2);

  var gqTlred = new TimelineMax({paused:true});
gqTlred.staggerFromTo(".fingerprint-red path", 1,{autoAlpha: 0}, {autoAlpha: 1}, 0.2);

$('#hoverbutton').hover(
  function() {  gqTl.play(); },
  function() { gqTl.reverse(); }
);
    
    
})

