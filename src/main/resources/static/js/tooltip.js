/* <![CDATA[ */

var socket=null;
var stompClient;
connectTooltip()
function connectTooltip() {
	
	var socket = new SockJS('/gs-guide-websocket');

	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function(frame) {

		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/gettooltipdata/' + sessionId, function(
				greeting) {

			getToolTip(JSON.parse(greeting.body));
		});
	
});
}


var sessionId = $("#session_id").text();

console.log(sessionId);

var champion = $("#champion").text();
var userid = $("#user_id").text();
var main = $("#main").text();
var position;
var main_height = 348;
$('.tooltip_guide').hover(function() {

	var idd = 0;
	console.log("hh");

	position = $(this).offset();
	var classs = $(this).attr('class');

	$(".details").text("");
	if ($(this).hasClass('profile')) {
		getToolTipData("profile", this.id);
	}

	else if ($(this).hasClass('item')) {

		getToolTipData("item", this.id);

	} else if ($(this).hasClass('summoner')) {

		getToolTipData("summoner", this.id);

	} else if ($(this).hasClass('champion')) {

		getToolTipData("champion", this.id);

	} else if ($(this).hasClass('rune')) {

		getToolTipData("rune", this.id);

	}else if ($(this).hasClass('spell')) {

		getToolTipData("spell", this.id);

	}
	
}, function() {
	//$(".details").hide();
});
function hoverToolTopNew(item) {

	var idd = 0;
	console.log("hh");

	position = $(item).offset();
	var classs = $(item).attr('class');

	$(".details").text("");
	if ($(item).hasClass('profile')) {
		getToolTipData("profile", item.id);
	}

	else if ($(item).hasClass('item')) {

		getToolTipData("item", item.id);

	} else if ($(item).hasClass('summoner')) {

		getToolTipData("summoner", item.id);

	} else if ($(item).hasClass('champion')) {

		getToolTipData("champion", item.id);

	} else if ($(item).hasClass('rune')) {

		getToolTipData("rune", item.id);

	}else if ($(item).hasClass('spell')) {

		getToolTipData("spell", item.id);

	}
	
};
function hoverTooltip(id) {

	console.log($(id).offset());

	position = $(id).offset();
	console.log(position);
	var classs = $(id).attr('class');

	$(".details").text("");
	if ($(id).hasClass('profile')) {
		getToolTipData("profile", id.id);
	}

	else if ($(id).hasClass('item')) {

		getToolTipData("item", id.id);

	} else if ($(id).hasClass('summoner')) {

		getToolTipData("summoner", id.id);

	} else if ($(id).hasClass('champion')) {

		getToolTipData("champion", id.id);

	} else if ($(id).hasClass('rune')) {

		getToolTipData("rune", id.id);

	}

}
function getToolTipData(type, data) {
	if (type == "item") {

		console.log(data);
		stompClient.send("/app/gettooltipitemdata/" + sessionId, {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "rune") {

		console.log(data);
		stompClient.send("/app/gettooltiprunedata/" + sessionId, {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "profile") {

		console.log(data);
		stompClient.send("/app/gettooltipuserdata/" + sessionId, {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "summoner") {

		console.log(data);
		stompClient.send("/app/gettooltipsummonerdata/" + sessionId, {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "champion") {

		console.log(data);
		stompClient.send("/app/gettooltipchampiondata/" + sessionId, {}, JSON
				.stringify({
					'data' : data
				}));
	}
	else if (type == "spell") {

		console.log(data);
		stompClient.send("/app/gettooltispelldata/" + sessionId, {}, JSON
				.stringify({
					'data' : data
				}));
	}
}
function getToolTip(message) {
	console.log(message);
	if (message.type == 0) {
		
		$(".details")
				.append(
						"	<div style='height:70px;'><img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/item/"
								+ message.image + "'></img></div>");

		$(".details").append("<h3 class='name animeate_details'>" + message.name + "</h3>");
		$(".details").append(
				"<p class='name animeate_details'>" + message.description + "</p>");

		$(".details").append("<div class='data animeate_details' id='stats'>" +

		"<p class='col-md-3 col-md-offset-2'>Cost</p><p class='col-md-1'>:</p><p class='col-md-3'> " + message.gold + "</p>" +
		// "<p>Points:</p>" +
		"</div>");
		for (k = 0; k < message.stats.length; k++) {

			$("#stats").append(
					"" + "<p class='col-md-3 col-md-offset-2'>" + message.stats[k].name + "</p><p class='col-md-1'>:</p><p class='col-md-3'>"
							+ message.stats[k].value + "</p>");

		}
	
		console.log(message.stats);
		var diff = 0;
		var height = $(".details").css("height").replace("px", "");
		if (main_height > height) {

			diff = +main_height - height;
		} else {
			console.log(height);
			// diff=+height-main_height;
		}

		console.log(diff);
		var left = +position.left - 110;
		var top = +position.top - 360 + diff;
		$(".details").css("left", left + "px");
		$(".details").css("top", top + "px");

	} else if (message.type == 1) {
		$(".details").text("");
		$(".details")
				.append(
						"	<div style='height:70px;'><img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/champion/"
								+ message.image + "'></img></div>");

		$(".details").append("<h2 class='name animeate_details'>" + message.name + "</h2>");

		$(".details")
				.append(
						"<table class='data animeate_details'>"
								+

								"<tr>"
								+ "<td><img  class='round_details' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/spell/"
								+ message.spells[0].image
								+ "'></td>"
							
								+ "<td><img  class='round_details' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/spell/"
								+ message.spells[1].image
								+ "'></td>"
							
								+ "<td><img  class='round_details' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/spell/"
								+ message.spells[2].image
								+ "'></td>"
							
								+ "<td><img  class='round_details' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/spell/"
								+ message.spells[3].image + "'></td>" + "</tr>"
							

							+	"</table>");
		var diff = 0;
		var height = $(".details").css("height").replace("px", "");
		if (main_height > height) {

			diff = +main_height - height;
		} else {
			console.log(height);
			// diff=+height-main_height;
		}

		console.log(diff);
		var left = +position.left - 90;
		var top = +position.top - 360 + diff;
		$(".details").css("left", left + "px");
		$(".details").css("top", top + "px");

	} else if (message.type == 2) {
		$(".details").text("");
		$(".details")
				.append(
						"	<div style='height:70px;'><img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/spell/"
								+ message.image + "'></img></div>");

		$(".details").append("<h2 class='name animeate_details'>" + message.name + "</h2>");
		$(".details").append(
				"<h3 class='name animeate_details'>" + message.description + "</h3>");

		$(".details").append("<div class='data animeate_details'>" +

		"</div>");

		var diff = 0;
		var height = $(".details").css("height").replace("px", "");
		if (main_height > height) {

			diff = +main_height - height;
		} else {
			console.log(height);
			// diff=+height-main_height;
		}

		console.log(diff);
		var left = +position.left - 90;
		var top = +position.top - 360 + diff;
		$(".details").css("left", left + "px");
		$(".details").css("top", top + "px");

	} else if (message.type == 3) {
		$(".details").text("");
		$(".details")
				.append(
						"	<div style='height:70px;'><img  class='details_img ' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/rune/"
								+ message.image + "'></img></div>");

		$(".details").append("<h2 class='name animeate_details'>" + message.name + "</h2>");
		$(".details").append(
				"<h3 class='name animeate_details'>" + message.description + "</h3>");

		$(".details").append("<div class='data animeate_details'>" + "<p>Games</p>" +
		// "<p>Winrate</p>" +
		// "<p>Points:</p>" +
		"</div>");

		var height = $(".details").css("height");
		console.log(height);
		var left = +position.left - 90;
		var top = +position.top - 360;
		$(".details").css("left", left + "px");
		$(".details").css("top", top + "px");

	} 
	else if (message.type == 5) {
		$(".details").text("");
		$(".details")
				.append(
						"	<div style='height:70px;'><img  class='details_img ' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/spell/"
								+ message.image + "'></img></div>");

		$(".details").append("<h2 class='name animeate_details'>" + message.name + "</h2>");
		$(".details").append(
				"<h3 class='name animeate_details'>" + message.description + "</h3>");

		$(".details").append("<div class='data'> animeate_details" + "<p>Games</p>" +
		// "<p>Winrate</p>" +
		// "<p>Points:</p>" +
		"</div>");

		var height = $(".details").css("height");
		console.log(height);
		var left = +position.left - 90;
		var top = +position.top - 360;
		$(".details").css("left", left + "px");
		$(".details").css("top", top + "px");

	}else {

		$(".details").text("");
		$(".details")
				.append(
						"	<div style='height:70px;'><img  class='details_img ' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/profileicon/"
								+ message.summoner.image + ".png'></img></div>");

		$(".details").append(
				"<h2 class='name animeate_details'>" + message.summoner.name + "</h2>");
		$(".details").append(
				"<p class='kda animeate_details'>" + message.summoner.kills + "/"
						+ message.summoner.deaths + "/"
						+ message.summoner.assists + "</p>");
		console.log(main);
		if(main.name=="Support" || main.name=="Adc" || main.name=="Mid" || main.name=="Jungle" || main.name=="Top")
		{
			$(".details")
			.append(
					"<table class='data animeate_details' style='position:relative;right:20px;'>"
							
							+ "<tr>" + "<td><p>Games:</td><td>"
							+ message.summoner.games
							+ "</p></td><td id='champion_games'></td></tr>"
							+

							"<tr><td><p>Winrate: </td><td>"
							+ message.summoner.winrate
							+ "</p></td><td id='champion_winrate'></td>" +

							"</tr>" +

	
							"</table>");
		}
		else
			{
		$(".details")
				.append(
						"<table class='data animeate_details'>"
								+ "<tr><td></td>  <td>General</td> <td>Champion</td> </tr>"
								+ "<tr>" + "<td><p>Games:</td><td>"
								+ message.summoner.games
								+ "</p></td><td id='champion_games'></td></tr>"
								+

								"<tr><td><p>Winrate: </td><td>"
								+ message.summoner.winrate
								+ "</p></td><td id='champion_winrate'></td>" +

								"</tr>" +

		
								"</table>");
		for (k = 0; k < message.summoner.champion.length; k++) {

			if (message.summoner.champion[k].name == champion) {
				$(".details").append(
						"<p class='name'>Points:"
								+ message.summoner.champion[k].championPoints
								+ "</p>");
				$("#champion_games").append(
						"" + "<p>" + message.summoner.champion[k].games
								+ "</p>");

				$("#champion_winrate").append(
						"" + "<p>" + message.summoner.champion[k].winrate
								+ "</p>");
			}
		}
			}
		$(".details").append(
				"	<img  style='margin-top:0px;' class='details_img tier' src='/img/tiers/"
						+ message.summoner.tier + ".png'></img>");

		$(".details").append(
				"<h2 class='name animeate_details'>" + message.summoner.tier + "</h2>");

		var top = 0;
		var height = $(".details").css("height").replace("px", "");
		height = +height;
		console.log(height);
		console.log(+position.top);
		if (height > position.top) {
			top = +position.top - 320;
			console.log(top);
			top = +position.top - 360 + height + 80;
			console.log(top);
		} else {
			top = +position.top - 360;
		}
		var left = +position.left - 70;

		$(".details").css("left", left + "px");
		$(".details").css("top", top + "px");

	}
	console.log("dsdsa");
	
	  setTimeout(function(){ 
	  $( ".animeate_details" ).animate({
		    opacity: 1,
		    top: "-=20"
		  }, 200, function() {
		    // Animation complete.
		  }); }, 150);
	  $(".details").show();
	$(".details_img").addClass("details_img_scale");
}

/* ]]> */