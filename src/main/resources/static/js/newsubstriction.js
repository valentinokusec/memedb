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
setTimeout(function() {
	connectSubstriction()
}, 2000);

function connectSubstriction() {
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

						console.log(typeData);
						$(".remove").removeClass("active");
						if (typeData == 0) {

							$("#img_" + last_item_id).attr("src",
									description_img);
							console.log("#img_" + last_item_id);
							console.log(".extra_item_" + last_item_id);
							$(".extra_data_" + last_item_id).attr("value",
									description_id);

						} else if (typeData == 1) {

							$("#img_summoners_" + last_item_id).attr("src",
									description_img);
							console.log(description_id);
							console
									.log(".extra_data_summoners_"
											+ last_item_id);
							$(".extra_data_summoners_" + last_item_id).attr(
									"value", description_id);

						} else if (typeData == 3) {

							$("#" + textAreaId)
									.append(
											"<img id='"
													+ description_id
													+ "' onmouseover='hoverTooltip(this)' class='textarea_img  tooltip_guide item' src='"
													+ description_img
													+ "'></img>");
							console.log(description_id);
							var paramid = textAreaId.replace("text", "");
							var div = $("#" + textAreaId);
							$("#" + paramid).attr("value", div.html());
							console.log(div.html());

						} else if (typeData == 2) {
							console.log("#item_add_" + last_item_id);
							$("#item_add_" + last_item_id).attr("value",
									description_id);
							$("#param" + last_item_id).attr("value",
									description_id);
							$("#img_add_" + last_item_id).attr("src",
									description_img);
							var id = +last_item_id + 1;

							last_item_id = id;

							$("#img_add_" + id).addClass("active");

						} else if (typeData == 3) {
							if (description_img.includes("item")) {
								$("#" + textAreaId)
										.append(
												"<img id='"
														+ description_id
														+ "' class='textarea_img tooltip_guide item' src='"
														+ description_img
														+ "'></img>");
							} else if (description_img.includes("spell")) {
								$("#" + textAreaId)
										.append(
												"<img id='"
														+ description_id
														+ "' class='textarea_img tooltip_guide summoner' src='"
														+ description_img
														+ "'></img>");
							} else if (description_img.includes("rune")) {
								$("#" + textAreaId)
										.append(
												"<img id='"
														+ description_id
														+ "' class='textarea_img tooltip_guide rune' src='"
														+ description_img
														+ "'></img>");
							} else if (description_img.includes("champion")) {
								$("#" + textAreaId)
										.append(
												"<img id='"
														+ description_id
														+ "' class='textarea_img tooltip_guide champion' src='"
														+ description_img
														+ "'></img>");
							}
							var paramid = textAreaId.replace("text", "");
							var div = $("#" + textAreaId);
							$("#" + paramid).attr("value", div.html());
							console.log(div.html());
							$("." + paramid).attr("value", div.html());
							console.log(div.html());
							$('.tooltip_guide').hover(function() {
								console.log("dd");
								// var id =
								// jQuery(this).attr("id").replace("dis_id_","");

								// var idd=+id-1;
								var idd = 0;

								var position = $(this).offset();
								var classs = $(this).attr('class');
								var left = +position.left - 90;
								var top = +position.top - 300;
								$(".details").css("left", left + "px");
								$(".details").css("top", top + "px");
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

								}

							}, function() {
								$(".details").hide();
							});

						}
						if (typeData == 5) {
							if (listid == "build") {
								$("#img_build" + build).attr("src",
										description_img);
								$(".buildlist" + build).attr("value",
										description_id);
								console.log("#img_build" + build);
								build++;
								$(".build")
										.append(
												"	<td><a id='build"
														+ build
														+ "' class='' onclick='itemClick(this.id)'> <img "
														+ "	class='build_img remove' id='img_build"
														+ build
														+ "'"
														+ "	src='/img/add.png'></img>"
														+ "</a></td>"
														+ "<input type='hidden' class='buildlist"
														+ build
														+ "' value='0' id='buildlist["
														+ build + "  ]'"
														+ "	name='buildlist["
														+ build + "]' /> ");

								$("#img_build" + build).addClass("active");
							} else {
								$("#img_combo" + combo).attr("src",
										description_img);
								$(".combolist" + combo).attr("value",
										description_id);
								console.log(description_img);
								combo++;
								$(".combo")
										.append(
												"	<td><a id='combo"
														+ combo
														+ "' class='' onclick='itemClick(this.id)'> <img "
														+ "	class='build_img remove' id='img_combo"
														+ combo
														+ "'"
														+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
														+ "</a></td>"
														+ "<input type='hidden' class='combolist"
														+ combo
														+ "' value='0' id='combolist["
														+ combo + "  ]'"
														+ "	name='combolist["
														+ combo + "]' /> ");

								$("#img_combo" + combo).addClass("active");
							}
						}
					});
}
$(".textarea").keyup(function() {

	console.log(this.value);
	getAllData(this.value, searchid);
});
$(".editbox").keyup(function() {

	var id = this.id.replace("text", "");
	console.log(id);
	console.log($("#" + this.id).html());
	$("." + id).attr("value", $("#" + this.id).html());

});
$(".card").hover(function() {
	$(this).children('.hover').slideToggle();

});
dataset = 0;
$(".newdataset").click(
		function() {
			dataset++;
			$(".substriction").append(
					"<tr>" + "<td><label>Data set</label></td>" + "	</tr>"
							+ "<tr>" + "<td><input type='text' "
							+ "id='substrictionitem[" + dataset
							+ "].header' name='substrictionitem[" + dataset
							+ "].header' />" + "	</td>" + "</tr>" + "<tr>"
							+ "<td><label>Content</label></td>" + "</tr>"
							+ "<tr>" + "<td><label>Content</label></td>"
							+ "</tr>" +
									"<tr>"
						+"<td><div contentEditable='true'"
								+" class='guide_textarea_dis  dis_are dis_area_img onkeyup='keyUp(this)' "
								+"id='content" + dataset+"text' name='content" + dataset+"text'"
								+"placeholder='Describe your build'></div></td>"
						+"<td><table>"
								+"<tr>"
									+"<td><a id='contenttext_item' class='add_text'> <img"
											+" class='add_text_img'   src='/img/add.png'></img>"
									+"</a></td>"
								+"</tr>"
								+"<tr>"
									+"<td><a id='contenttext_summoners' class='add_text'> <img"
											+" class='add_text_img  ' "
											+"src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/SummonerSnowball.png'></img>"
									+"</a></td>"
								+"</tr>"
								+"<tr>"
									+"<td><a id='contenttext_runes'"
										+"class='add_text add_text_img'> <img class='add_text_img'"
											+"src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/r_3_3.png'></img>"
									+"</a></td>"
								+"</tr>"
								+"<tr>"
									+"<td><a id='contenttext_champion' class='add_text'> <img"
											+" class='add_text_img ' "
											+"src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
									+"</a></td>"
								+"</tr>"
							+"</table></td>"
					+"</tr>" +
							"	<input type='hidden' class='content" + dataset+"' value='0'"
					+"id='substrictionitem[" + dataset+"].content' name='substrictionitem[" + dataset+"].content' />");
			
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
function keyUp(data) {
	console.log("dd");
	var id = this.id.replace("text", "");

	
	$("." + id).attr("value", $("#" + this.id).html());

}
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