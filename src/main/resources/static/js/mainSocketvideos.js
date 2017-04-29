/**
 * 
 */

/* <![CDATA[ */
var searchid;
var load = 0;
function loadMore() {
	load = load + 1;

	stompClient.send("/app/loadmore/1", {}, JSON.stringify({
		'data' : load
	}));

}
function getAllData(data, id,type) {
	console.log(id);
	 if(type==2)
	{
		
		
		if (id =="item") {
			console.log(id);
			stompClient.send("/app/alldata/1", {}, JSON.stringify({
				'data' : data
			}));
		} else if (id =="summoners") {

			console.log(id);
			stompClient.send("/app/getsummonersdata/1", {}, JSON.stringify({
				'data' : data
			}));
		}
			else if (id =="champion") {

				console.log(id);
				stompClient.send("/app/getchampiondata/1", {}, JSON.stringify({
					'data' : data
				}));
			
		} else if (id =="masteries") {

			console.log(id);
			stompClient.send("/app/getrunesdata/1", {}, JSON.stringify({
				'data' : data
			}));
		
	}else if (id =="runes") {

		console.log(id);
		stompClient.send("/app/getdisrunesdata/1", {}, JSON.stringify({
			'data' : data
		}));
	
}

	}else{
	if (id == "add_10" || id == 1) {
		searchid = 1;
		$(".textarea").attr("id", searchid);
		stompClient.send("/app/getchampiondata/1", {}, JSON.stringify({
			'data' : data
		}));
	} else {
		searchid = 0;
		stompClient.send("/app/alldata/1", {}, JSON.stringify({
			'data' : data
		}));
	}}
}

function sendLike() {
	$(".reply_text").toggle("fast");
	console.log($("#main_likes").text());
	var likes = $("#main_likes").text();
	var id = $("#video_id").text();
	console.log(likes);
	stompClient.send("/app/mainsocket/1", {}, JSON.stringify({
		'count' : likes,
		'id' : id
	}));
}

var stompClient = null;
connect();

function connect() {
	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {

		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/main/1', function(greeting) {
			showGreeting(JSON.parse(greeting.body).content, JSON
					.parse(greeting.body).id);
		});
		stompClient.subscribe('/topic/getall/1', function(greeting) {

			getAll(JSON.parse(greeting.body));
		});
		stompClient.subscribe('/topic/loadmore/1', function(greeting) {

			addMore(JSON.parse(greeting.body));
		});
	});
}

function addMore(message, id) {

	console.log(message);

}
function getAll(message) {
	
	if (message[0].type == 0) {
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {
			console.log("item");

			$(".items_list")
					.append(
							"<div>" + "<div class='floating_img'>"
									+ "	<img id='img_id_"
									+ message[i].id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/item/"
									+ message[i].imageId
									+ "'></img>"
									+ "	<div class='description_data' id='description_id_"
									+ message[i].id
									+ "'>"
									+ "		<div class='description_text'>"
									+ message[i].description
									+ "		</div>"

									+ "		<div class='description_name_text' >"
									+ message[i].name
									+ "		</div>"
									+ "		<div class='description_img' >"
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/item/"+message[i].imageId
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].itemId
									+ "</div>"
									+ "	</div>"
									+ "</div>" + "</div>");
		}
	} else if (message[0].type == 1){
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {
			console.log("champion");

			$(".items_list")
					.append(
							"<div>"
									+ "<div class='floating_img'>"
									+ "	<img id='img_id_"
									+ message[i].id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/"
									+ message[i].image + "'></img>"

									+ "	<div class='description_data' id='description_id_"
									+ message[i].id
									+ "'>"
									+ "		<div class='description_text'>"
									+ message[i].description
									+ "		</div>"

									+ "		<div class='description_name_text' >"
									+ message[i].name
									+ "		</div>"
									+ "		<div class='description_img' >"
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/"+message[i].image
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].itemId
									+ "</div>"
									+ "	</div>"
									+ "</div>" + "</div>");
		}
	}
	else if (message[0].type == 2){
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {
			console.log("summoner");

			$(".items_list")
					.append(
							"<div>"
									+ "<div class='floating_img'>"
									+ "	<img id='img_id_"
									+ message[i].id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/"
									+ message[i].image + "'></img>"
									+ "	<div class='description_data' id='description_id_"
									+ message[i].id
									+ "'>"
									+ "		<div class='description_text'>"
									+ message[i].description
									+ "		</div>"

									+ "		<div class='description_name_text' >"
									+ message[i].name
									+ "		</div>"
									+ "		<div class='description_img' >"
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/"+message[i].image
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].summonersid
									+ "</div>"
									+ "	</div>"
									+ "</div>" + "</div>");
								
		}
	}
	else if (message[0].type == 3){
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {
			console.log("champion");

			$(".items_list")
					.append(
							"<div>"
									+ "<div class='floating_img'>"
									+ "	<img id='img_id_"
									+ message[i].id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/"
									+ message[i].image + "'></img>"

									+ "	<div class='description_data' id='description_id_"
									+ message[i].id
									+ "'>"
									+ "		<div class='description_text'>"
									+ message[i].description
									+ "		</div>"

									+ "		<div class='description_name_text' >"
									+ message[i].name
									+ "		</div>"
									+ "		<div class='description_img' >"
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/"+message[i].image
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].itemId
									+ "</div>"
									+ "	</div>"
									+ "</div>" + "</div>");
		}
	}


	$('.img_item')
			.hover(
					function() {

						var contentPanelId = jQuery(this).attr("id");
						
						var maindescription = $("#description_id_"
								+ contentPanelId.replace('img_id_', ''));
						var description = maindescription.find(
								'.description_text').text();
						var description_name = maindescription.find(
								'.description_name_text').text();
						description_img = maindescription.find(
								'.description_img').text();
						description_id = maindescription
								.find('.description_id').text();
						var position=$(this).offset();
					var left=+position.left-210;
					var top=+position.top-10;
					$(".details").css("left", left+"px");
					$(".details").css("top", top+"px");
					$(".details").text("");
					$(".details").append("	<img  class='details_img' src='"+description_img+"'></img>");
					
					$(".details").append("<h2 class='name'>"+description_name+"</h2>" );
					$(".details").append("<h3 class='name'>"+description+"</h3>" );
							
							
					$(".details").append("<div class='data'>" +
							"<p>Games</p>" +
//							"<p>Winrate</p>" +
//							"<p>Points:</p>" +
							"</div>" );
															
					
					$(".details").show();
						
					}	
					,
					function () {
						$(".details").hide();
			           });
	$('.img_item').click(
			function() {

				$(".remove").removeClass("active");
				if(	typeData==0)
				 {

					$("#img_" + last_item_id).attr("src", description_img);
					console.log("#img_"+last_item_id);
					console.log(".extra_item_"+last_item_id);
					$(".extra_data_"+last_item_id).attr("value",
							description_id);
					
				 }
				else 	if(	typeData==1)
				 {

					$("#img_summoners_" + last_item_id).attr("src", description_img);
					console.log(description_id);
					console.log(".extra_data_summoners_"+last_item_id);
					$(".extra_data_summoners_"+last_item_id).attr("value",
							description_id);
					
				 }
				else 	if(	typeData==3)
				 {

					$("#"+textAreaId).append("<img id='"+description_id+"' class='textarea_img tooltip_guide item' src='"+description_img+"'></img>");
					console.log(description_id);
					var paramid=textAreaId.replace("text","");
					var div=$("#"+textAreaId);
					$("#"+paramid).attr("value",
							div.html());
					console.log(div.html());
					$('.tooltip_guide').hover(		
							function() {
								console.log("dd");
								//var id = jQuery(this).attr("id").replace("dis_id_","");
								
								
								//var idd=+id-1;
								var idd=0;
							
								
								var position=$(this).offset();
								var classs=$(this).attr('class');
								
								if($(this).hasClass('profile'))
									{
								
									}
							
								else if($(this).hasClass('item'))
								{
							var left=+position.left-90;
							var top=+position.top-300;
							$(".details").css("left", left+"px");
							$(".details").css("top", top+"px");
							$(".details").text("");
							
									getToolTipData("item",this.id);								
							
							$(".details").show();
								
								}
							}
							,
							function () {
								$(".details").hide();
					           });

					
				 }
				else if(typeData==2)
				{	console.log("#item_add_" + last_item_id);
					$("#item_add_" + last_item_id).attr("value",
							description_id);
					$("#param" + last_item_id).attr("value",
							description_id);
					$("#img_add_" + last_item_id).attr("src", description_img);
					var id = +last_item_id + 1;
					
					last_item_id = id;
				
					$("#img_add_" + id).addClass("active");
					
				 }
				

			});
}
$(".textarea").keyup(function() {

	console.log(this.value);
	getAllData(this.value, searchid);
});

$(".card").hover(function() {
	$(this).children('.hover').slideToggle();

});

//[].slice.call(document.querySelectorAll('.tabs')).forEach(function(el) {
//	new CBPFWTabs(el);
//});

if ($('#auth').text() == "true") {
	var dlgtrigger = document.getElementById("video_b"), somedialog = document
	.getElementById("video_dialog"), dlg = new DialogFx(somedialog);

dlgtrigger.addEventListener('click', dlg.toggle.bind(dlg));

	
} else {

	

	var logintrigger = document.getElementById("login_b"), logindialog = document
			.getElementById("login_dialog"), logindlg = new DialogFx(
			logindialog);

	logintrigger.addEventListener('click', logindlg.toggle.bind(logindlg));

	var registertrigger = document.getElementById("register_b"), registerdialog = document
			.getElementById("register_dialog"), registerdlg = new DialogFx(
			registerdialog);

	registertrigger.addEventListener('click', registerdlg.toggle
			.bind(registerdlg));

}

[].slice.call(document.querySelectorAll('select.cs-select')).forEach(
		function(el) {
			new SelectFx(el);
		});

$('#type').on('change', function() {
	var id = this.value;
	if (this.value == 1) {
		$("#change_topic").animate({

			height : "0px"
		}, 500, function() {
			// Animation complete.
		});
	} else {
		$(".topic_content").fadeOut();
		$("#change_topic").animate({

			height : "220px"
		}, 500, function() {
			$("#topic_type_" + id).fadeIn();
		});

	}
})
var last_item_id;
var description_img;
var description_id;
$('.add_item').click(function() {
	var id = this.id;

	console.log(id);
	if ($(".sidebar").css("width") == "0px") {
		$(".sidebar").animate({

			width : "200px"
		}, 500, function() {
			getAllData("", id);
		});

	} else {

		$(".sidebar").animate({

			width : "0px"
		}, 500, function() {
			// Animation complete.
		});
	}

	last_item_id = jQuery(this).attr("id").replace('add_', '');
	$(".remove").removeClass("active");
	$("#img_add_" + last_item_id).addClass("active");

});

var textAreaId;
$('.add_text').click(function() {
	var id = this.id.split("_");
	typeData=3;
	textAreaId=id[0];
	


	console.log(id[1]);
		$(".sidebar").animate({

			width : "220px"
		}, 500, function() {
			
		});
		setTimeout(function(){ getAllData("", id[1],2);
		searchid = id.charAt(0); }, 500);
});

var content=$(".content_dis").offset().top;
var scroll=1;
console.log(content);
window.addEventListener("scroll", function(event) {
    var top = this.scrollY;
    console.log(top);
    if(top>1)
    	{
    	if(scroll==1)
    	{
    		scroll=0;
    	
    	 $(".img_sect").animate({

    			opacity : "1"
    		}, 500, function() {
    			 console.log(top);
    			 $(".left_sect").animate({
    				 	right: "+=50px",
    	    			opacity : "1"
    	    		});
    			 $(".right_sect").animate({
 				 	left: "+=50px",
 	    			opacity : "1"
 	    		});
    			 console.log(top);
    			 $(".content-wrap").animate({
    				 	bottom: "+=50px",
    	    			opacity : "1"
    	    		});
    		});
    	}}

}, false);

/* ]]> */