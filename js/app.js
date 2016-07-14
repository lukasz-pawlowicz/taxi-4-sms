$(document).ready(function() {
    //HAMBURGER MENU
    $('button').click(function() {
        $(this).toggleClass('expanded').siblings('div').slideToggle();
    });
    //COUNTER FROM 0 TO NUMBER
    $('.count').each(function () {
	    $(this).prop('Counter',0).animate({
	        Counter: $(this).text()
	    }, {
	        duration: 4000,
	        easing: 'swing',
	        step: function (now) {
	            $(this).text(Math.ceil(now));
	        }
	    });
	});

	//GOOGLE MAP DIRECTION
	$('.button-route').click(function() { 
	var $from = $("#from").val();
	var $to = $("#to").val();
		$(".map").toggleClass('hide').fadeToggle(1000);
		$('.map')
	    .gmap3({
	        center: "[37.772323, -122.214897]",
	        zoom: 100,
	        mapTypeId : google.maps.MapTypeId.ROADMAP
	    })
	    .route({
	        origin: $from,
	        destination: $to,
	        travelMode: google.maps.DirectionsTravelMode.DRIVING
	    })
	    .directionsrenderer(function (results) {
	        if (results) {
	          return {
	            panel: "#box",
	            directions: results
	          }
	        }
	    });
	});

	//SENDING SMS
var TwilioSMS = (function($) {
	//AUTHORIZATION
  var accountSid = 'AC391d38b8c9c5cb3bd52eede11cba13c7';
  var authToken = '570b73325ce8c5e93d8ab5e02c6f2571';

  var testEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/SMS/Messages.json';
  var liveEndpoint = 'https://api.twilio.com/2010-04-01/Accounts/' + accountSid + '/Messages.json';
  //FUNCTION - SENDING
  var sendMessage = function(to, from, body, successCallback, failCallback) {
    var data = {
      To: to,
      From: from,
      Body: body
    };
    //AJAX METHOD
    $.ajax({
      method: 'POST',
      url: testEndpoint,
      data: data,
      dataType: 'json',
      contentType: 'application/x-www-form-urlencoded', // !
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization",
          "Basic " + btoa(accountSid + ":" + authToken) // !
        );
      },
      success: function(data) {
        console.log("Got response: %o", data);
        if (typeof successCallback == 'function')
          successCallback(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log("Request failed: " + textStatus + ", " + errorThrown);

        if (typeof failCallback == 'function')
          failCallback(jqXHR, textStatus, errorThrown);
      }
    });
  }
  return {
    sendMessage: sendMessage
  };
	})(jQuery);

// FUNCTION CALL ON CLICK WITH PARAMETERS
	var $form = $("#show-route");
  	$form.on("submit", function() {
  		var $name = $("#name").val();
  		var $surname = $("#surname").val();
  		var $from = $("#from").val();
  		var $to = $("#to").val();
  		var $number = $("#number").val();
  		var $additional = $("#additional").val();

		TwilioSMS.sendMessage(
		  '+48515595817', // TO
		  '+48732484083', //NUMBER FROM TWILIO
		  "Order: " + $name + " " + $surname + " " + $number + " from: " + $from + " to: " + $to + " +info: " + $additional,
		  // SUCCESS
		  function ok() {
		    console.log("Message sent!");
		    alert("Zlecenie zostało przyjęte");
		  },
		  // FAIL
		  function fail() {
		    console.log("Failed to send your message!");
		    alert("Wystąpił błąd podczas przetwarzania. Spróbuj ponownie")
		  }
		);
		return false;
	});


    

});
