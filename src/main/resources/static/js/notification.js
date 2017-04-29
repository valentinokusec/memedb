/**
 * 
 */
$("#notification_button").click(function() {
	
	$(".last_li").css({"background-color": "#5f6f81"});
	$(".notification").slideToggle("fast");
	stompClient.send("/app/resetnotification/"+userid, {}, JSON.stringify({
		
	}));
	$(".notification_counter").fadeOut();
	$(".last_li").animate({
	    width: "60px"
	  }, 100, function() {
		
	  });
});
if($("#notificationcounter").text()==0)
	{
	$(".last_li").css({"background-color": "#5f6f81"});
	$(".notification_counter").fadeOut();
//	$(".notification_counter").animate({
//
//	    width: "0"
//	  }, 500, function() {
//	    // Animation complete.
//	  });
	}

setTimeout(function(){ connectNotification()}, 1000);
function connectNotification() {
	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {

		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/notification/' + userid, function(notification) {
			console.log("inc");
			showNotification(JSON.parse(notification.body).content,JSON.parse(notification.body).fromuser);
	

	});
	
});
}
	function showNotification(content,fromuser) {
		console.log(content);
		var counter=$(".notification_counter").text();
		$('.notification').prepend("<div class=' notification_row'>"

								+"	<img id='"+fromuser.id+"' src='http://ddragon.leagueoflegends.com/cdn/6.22.1/img/profileicon/"+fromuser.image+".png'"
									+"class='profile_notification  tooltip_guide profile '></img>"
								+"	<p>"+content+"</p>"

							+"	</div>");
		coutner=+counter+1;
		$(".notification_counter").text(coutner);
		var numItems = $('.notification_row').length
		if (numItems==6) {
			
		}
		var child=$('.notification .notification_row:nth-child(4)');
		child.fadeOut();
		
		$(".last_li").animate({
				    width: "95px"
				  }, 100, function() {
					
				  });
		setTimeout(function(){ 	$(".notification_counter").fadeIn();}, 1000);
		$(".last_li").css({"background-color": "#ff3d81"});
		
	}
	