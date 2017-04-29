/**
 * 
 */

/* <![CDATA[ */
var searchid;
var load = 0;
var typeData = 0;
var tiera = 0;
var tierb = 0;
var tierc = 0;
var tierd = 0;
$("#topic_type_1").fadeIn();

function getAllData(data, id, type) {

	console.log(id);

	searchid = 2;
	stompClient.send("/app/getguidechampiondata/1", {}, JSON.stringify({
		'data' : data
	}));

}

var stompClient = null;
connect();

function connect() {
	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function(frame) {

		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/main/1', function(greeting) {
			showGreeting(JSON.parse(greeting.body).content, JSON
					.parse(greeting.body).id);
		});
		stompClient.subscribe('/topic/getall/1', function(greeting) {

			getAll(JSON.parse(greeting.body));
		});
		stompClient.subscribe('/topic/gettooltipdata/1', function(greeting) {

			getToolTip(JSON.parse(greeting.body));
		});
		stompClient.subscribe('/topic/getguidedata/1', function(greeting) {

			getAll(JSON.parse(greeting.body));
		});
	});
}
function getToolTip(message) {
	console.log(message);
	if (message.type == 0) {
		$(".details").text("");
		$(".details")
				.append(
						"	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/item/"
								+ message.imageId + "'></img>");

		$(".details").append("<h2 class='name'>" + message.name + "</h2>");
		$(".details").append(
				"<h3 class='name'>" + message.description + "</h3>");

		$(".details").append("<div class='data'>" + "<p>Games</p>" +
		// "<p>Winrate</p>" +
		// "<p>Points:</p>" +
		"</div>");

		$(".details").show();
	} else if (message.type == 1) {
		$(".details").text("");
		$(".details")
				.append(
						"	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/champion/"
								+ message.image + "'></img>");

		$(".details").append("<h2 class='name'>" + message.name + "</h2>");
		$(".details").append(
				"<h3 class='name'>" + message.description + "</h3>");

		$(".details").append("<div class='data'>" + "<p>Games</p>" +
		// "<p>Winrate</p>" +
		// "<p>Points:</p>" +
		"</div>");

		$(".details").show();
	} else if (message.type == 2) {
		$(".details").text("");
		$(".details")
				.append(
						"	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/spell/"
								+ message.image + "'></img>");

		$(".details").append("<h2 class='name'>" + message.name + "</h2>");
		$(".details").append(
				"<h3 class='name'>" + message.description + "</h3>");

		$(".details").append("<div class='data'>" + "<p>Games</p>" +
		// "<p>Winrate</p>" +
		// "<p>Points:</p>" +
		"</div>");

		$(".details").show();
	} else if (message.type == 3) {
		console.log("dd");
		$(".details").text("");
		$(".details")
				.append(
						"	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/rune/"
								+ message.image + "'></img>");

		$(".details").append("<h2 class='name'>" + message.name + "</h2>");
		$(".details").append(
				"<h3 class='name'>" + message.description + "</h3>");

		$(".details").append("<div class='data'>" + "<p>Games</p>" +
		// "<p>Winrate</p>" +
		// "<p>Points:</p>" +
		"</div>");

		$(".details").show();
	} else {
		$(".details").text("");
		$(".details")
				.append(
						"	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/profileicon/"
								+ message.summoner.image + ".png'></img>");

		$(".details").append(
				"<h2 class='name'>" + message.summoner.name + "</h2>");
		$(".details").append(
				"<p class='kda'>" + message.summoner.kills + "/"
						+ message.summoner.deaths + "/"
						+ message.summoner.assists + "</p>");

		$(".details").append(
				"<div class='data'>" + "<p>Games:" + message.summoner.games
						+ "</p>" +

						"<p>Winrate: " + message.summoner.winrate + "</p>" +

						"</div>");

		$(".details").append(
				"	<img  style='margin-top:0px;' class='details_img tier' src='/img/tiers/"
						+ message.summoner.tier + ".png'></img>");

		$(".details").append(
				"<h2 class='name'>" + message.summoner.tier + "</h2>");
		$(".details").show();
	}
}
function addMore(message, id) {

	console.log(message);

}
function getAll(message) {

	if (message[0].type == 0) {
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {

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
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/item/"
									+ message[i].imageId
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].itemId
									+ "</div>"
									+ "	</div>"
									+ "</div>" + "</div>");
		}
	} else if (message[0].type == 1) {
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {
			console.log("champion");

			$(".items_list")
					.append(
							"<div>" + "<div class='floating_img'>"
									+ "	<img id='img_id_"
									+ message[i].id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/"
									+ message[i].image
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
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/"
									+ message[i].image
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].championid
									+ "</div>"
									+ "	</div>" + "</div>" + "</div>");
		}
	} else if (message[0].type == 2) {
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {
			console.log("summoner");

			$(".items_list")
					.append(
							"<div>" + "<div class='floating_img'>"
									+ "	<img id='img_id_"
									+ message[i].id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/"
									+ message[i].image
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
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/"
									+ message[i].image
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].summonersid
									+ "</div>"
									+ "	</div>" + "</div>" + "</div>");

		}
	} else if (message[0].type == 3) {
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {
			console.log("champion");

			$(".items_list")
					.append(
							"<div>" + "<div class='floating_img'>"
									+ "	<img id='img_id_"
									+ message[i].id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/"
									+ message[i].image
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
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/"
									+ message[i].image
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].itemId
									+ "</div>"
									+ "	</div>"
									+ "</div>" + "</div>");
		}
	} else if (message[0].type == 5) {
		$(".items_list").text("");
		for (i = 0; i < message.length; i++) {
			console.log("championability");

			$(".items_list")
					.append(
							"<div>" + "<div class='floating_img'>"
									+ "	<img id='img_id_"
									+ message[i].id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/"
									+ message[i].image
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
									+ "http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/"
									+ message[i].image
									+ "</div>"
									+ "		<div class='description_id' >"
									+ message[i].id
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
						var position1 = $(this).offset();
						console.log(position1);
						var left = +position1.left - 210;
						var top = +position1.top - 10;
						$(".details").css("left", left + "px");
						$(".details").css("top", top + "px");
						$(".details").text("");
						$(".details").append(
								"	<img  class='details_img' src='"
										+ description_img + "'></img>");

						$(".details").append(
								"<h2 class='name'>" + description_name
										+ "</h2>");
						$(".details").append(
								"<h3 class='name'>" + description + "</h3>");

						// $(".details").append("<div class='data'>" +
						// "<p>Games</p>" +
						// "<p>Winrate</p>" +
						// "<p>Points:</p>" +
						// "</div>" );

						$(".details").show();

					}, function() {
						$(".details").hide();
					});

	
	$('.img_item')
			.click(
					function() {

						$(".remove").removeClass("active");

						if (tier == "tiera") {
							$("#img_" + tier + tiera).attr("src",
									description_img);
							$(".tierlista" + tiera).attr("value",
									description_id);
							console.log( tiera);
							tiera++;
							$(".tiera")
									.append(
											"	<td><a id='tiera"
													+ tiera
													+ "' class='add_item' onclick='itemClick(this.id)'> <img "
													+ "	class='build_img remove' id='img_tiera"
													+ tiera
													+ "'"
													+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
													+ "</a></td>"
													+ "<input type='hidden' class='tierlista"
													+ tiera
													+ "' value='0' id='tierlista["
													+ tiera + "  ]'"
													+ "	name='tierlista["
													+ tiera + "]' /> ");

							$("#img_" + tier + tiera).addClass("active");
						} else if (tier == "tierb") {
							$("#img_" + tier + tierb).attr("src",
									description_img);
							$(".tierlistb" + tierb).attr("value",
									description_id);
							console.log(".tierlisstb" + tierb);
							tierb++;
							$(".tierb")
									.append(
											"	<td><a id='tierb"
													+ tierb
													+ "' class='add_item' onclick='itemClick(this.id)'> <img "
													+ "	class='build_img remove' id='img_tierb"
													+ tierb
													+ "'"
													+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
													+ "</a></td>"
													+ "<input type='hidden' class='tierlistb"
													+ tierb
													+ "' value='0' id='tierlistb["
													+ tierb + "  ]'"
													+ "	name='tierlistb["
													+ tierb + "]' /> ");
							$("#img_" + tier + tierb).addClass("active");
						} else if (tier == "tierc") {
							$("#img_" + tier + tierc).attr("src",
									description_img);
							$(".tierlistc" + tierc).attr("value",
									description_id);
							console.log(".tierlistc" + tierc);
							tierc++;
							$(".tierc")
									.append(
											"	<td><a id='tierc"
													+ tierc
													+ "' class='add_item' onclick='itemClick(this.id)'> <img "
													+ "	class='build_img remove' id='img_tierc"
													+ tierc
													+ "'"
													+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
													+ "</a></td>"
													+ "<input type='hidden' class='tierlistc"
													+ tierc
													+ "' value='0' id='tierlistc["
													+ tierc + "  ]'"
													+ "	name='tierlistc["
													+ tierc + "]' /> ");
							$("#img_" + tier + tierc).addClass("active");
						} else if (tier == "tierd") {
							$("#img_" + tier + tierd).attr("src",
									description_img);
							$(".tierlistd" + tierd).attr("value",
									description_id);
							console.log(".tierlisstd" + tierd);
							tierd++;
							$(".tierd")
									.append(
											"	<td><a id='tierd"
													+ tierd
													+ "' class='add_item' onclick='itemClick(this.id)'> <img "
													+ "	class='build_img remove' id='img_tierd"
													+ tierd
													+ "'"
													+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
													+ "</a></td>"
													+ "<input type='hidden' class='tierlistd"
													+ tierd
													+ "' value='0' id='tierlistd["
													+ tierd + "  ]'"
													+ "	name='tierlistd["
													+ tierd + "]' /> ");
							$("#img_" + tier + tierd).addClass("active");
						}

					});
}
$(".textarea").keyup(function() {

	console.log(this.value);
	getAllData(this.value, searchid);
});
$(".editbox").keyup(function() {

	var id = this.id.replace("text", "");
	$("#" + id).attr("value", $("#" + this.id).html());

});
$(".card").hover(function() {
	$(this).children('.hover').slideToggle();

});

// [].slice.call(document.querySelectorAll('.tabs')).forEach(function(el) {
// new CBPFWTabs(el);
// });

var last_time_id = 1;
[].slice.call(document.querySelectorAll('select.cs-select')).forEach(
		function(el) {
			new SelectFx(el);
		});

$('#type').on('change', function() {
	var id = this.value;
	console.log(id);

	$("#change_topic").animate({

		height : "220px"
	}, 500, function() {

		$("#topic_type_" + last_time_id).fadeOut();
		setTimeout(function() {
			$("#topic_type_" + id).fadeIn();
		}, 500);

		last_time_id = id;
	});

})
var last_item_id;
var description_img;
var description_id;
var tier;
function itemClick(id) {

	console.log(id);

	$(".sidebar").animate({

		width : "230px"
	}, 500, function() {
		getAllData("", id.substring(5, 6), 3);
		searchid = id.substring(5, 6);
	});
	tier = id.substring(0, 5);
	console.log(tier);
	typeData = 2;
	last_item_id = id.substring(5, 6);
	console.log(last_item_id);
	$(".remove").removeClass("active");
	$("#img_" + tier + last_item_id).addClass("active");

}

var textAreaId;
$('.add_text').click(function() {
	var id = this.id.split("_");
	typeData = 3;
	textAreaId = id[0];

	console.log(id[1]);
	$(".sidebar").animate({

		width : "220px"
	}, 500, function() {

	});
	setTimeout(function() {
		getAllData("", id[1], 2);
		searchid = id.charAt(0);
	}, 500);
});

/* ]]> */