/**
 * 
 */

/* <![CDATA[ */


console.log("dd");
var sessionId = $("#session_id").text();
var stompClient = null;
 connectMain();
function connectMain() {
	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {

		console.log('Connected: ' + frame);
	
		stompClient.subscribe('/topic/main/1', function(greeting) {
			console.log(greeting.body);
			setList(JSON.parse(greeting.body));
		});
	
		
	});
}
function setList(list) {
	console.log(list.data);
	for(kk=0;kk<list.data.length;kk++)
	{
		console.log(list.data[kk]);
		$( ".list_tag" ).text("");
		$( ".list_tag" ).append("	<span>"
			+"<form action='search' method='post'>"
				+"	<input type='hidden' class='form-control' value='"+list.data[kk]+"' id='tag' name='tag'"
				+"/>"
						+"<button style='width: 19%;' type='submit'>"

						+"<p >#"+list.data[kk]+"</p>"
						+"</button>"
						+"</form>"
						+"</span>");
	}

}
counter=1;
$(document).keypress(function(e) {
    if(e.which == 13) {
    	e.preventDefault();
      $(".tag_row").append("" +
      		"#<input id='tags["+counter+"]' name='tags["+counter+"]' type='text'></input>");
      counter++;
    }
});
$( ".search_main" ).keyup(function() {
	getAllData(this.value);
	});
$( ".search_main" ).focus(function() {
	$( ".list_tag" ).slideToggle("slow");
	});
function getAllData(data) {

	
	

			stompClient.send("/app/searchtag/1", {}, JSON.stringify({
				'data' : data
			}));
}
/* ]]> */