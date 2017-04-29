/**
 * 
 */

/* <![CDATA[ */
var searchid;
function getToolTipData(type, data) {
	if (type == "item") {

		console.log(data);
		stompClient.send("/app/gettooltipitemdata/1", {}, JSON.stringify({
			'data' : data
		}));
	} else if (type == "rune") {

		console.log(data);
		stompClient.send("/app/gettooltiprunedata/1", {}, JSON.stringify({
			'data' : data
		}));
	} else if (type == "profile") {

		console.log(data);
		stompClient.send("/app/gettooltipuserdata/1", {}, JSON.stringify({
			'data' : data
		}));
	} else if (type == "summoner") {

		console.log(data);
		stompClient.send("/app/gettooltipsummonerdata/1", {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "champion") {

		console.log(data);
		stompClient.send("/app/gettooltipchampiondata/1", {}, JSON
				.stringify({
					'data' : data
				}));
	}
}
function getAllData(data, id, type) {
	if (type == 0) {
		if (id < 7) {

			stompClient.send("/app/getguideitemdata/1", {}, JSON.stringify({
				'data' : data
			}));
		} else if (id < 9) {

			stompClient.send("/app/getguidesummonersdata/1", {}, JSON
					.stringify({
						'data' : data
					}));
		} else {
			stompClient.send("/app/getguiderunesdata/1", {}, JSON.stringify({
				'data' : data
			}));
		}
	} else if (type == 2) {

		if (id == "item") {
			searchid = 0;
			stompClient.send("/app/getguideitemdata/1", {}, JSON.stringify({
				'data' : data
			}));
		} else if (id == "summoners") {
			searchid = 1;
			console.log(id);
			stompClient.send("/app/getguidesummonersdata/1", {}, JSON
					.stringify({
						'data' : data
					}));
		} else if (id == "champion") {
			searchid = 2;
			console.log(id);
			stompClient.send("/app/getguidechampiondata/1", {}, JSON
					.stringify({
						'data' : data
					}));

		} else if (id == "masteries") {
			searchid = 3;
			console.log(id);
			stompClient.send("/app/getguidemasteriesdata/1", {}, JSON
					.stringify({
						'data' : data
					}));

		} else if (id == "runes" || searchid == 4) {
			searchid = 4;
			console.log(id);
			stompClient.send("/app/getguiderunesdata/1", {}, JSON.stringify({
				'data' : data
			}));

		}

	} else if (type == 4) {

		if (searchid == 0) {
			searchid = 0;
			stompClient.send("/app/getguideitemdata/1", {}, JSON.stringify({
				'data' : data
			}));
		} else if (searchid == 1) {
			searchid = 1;
			console.log(id);
			stompClient.send("/app/getguidesummonersdata/1", {}, JSON
					.stringify({
						'data' : data
					}));
		} else if (searchid == 2) {
			searchid = 2;
			console.log(id);
			stompClient.send("/app/getguidechampiondata/1", {}, JSON
					.stringify({
						'data' : data
					}));

		} else if (searchid == 3) {
			searchid = 3;
			console.log(id);
			stompClient.send("/app/getguidemasteriesdata/1", {}, JSON
					.stringify({
						'data' : data
					}));

		} else if (searchid == 4) {
			searchid = 4;
			console.log(id);
			stompClient.send("/app/getguiderunesdata/1", {}, JSON.stringify({
				'data' : data
			}));

		}

	} else {
		console.log(id);
		if (id < 7) {
			searchid = 0;
			stompClient.send("/app/getguideitemdata/1", {}, JSON.stringify({
				'data' : data
			}));
		} else if (id < 1) {
			searchid = 2;
			stompClient.send("/app/getguidesummonersdata/1", {}, JSON
					.stringify({
						'data' : data
					}));
		} else {
			console.log(id);
			searchid = 4;
			stompClient.send("/app/getguiderunesdata/1", {}, JSON.stringify({
				'data' : data
			}));
		}
	}

}

var stompClient = null;
connect();

function connect() {
	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function(frame) {

		stompClient.subscribe('/topic/getguidedata/1', function(greeting) {

			getAll(JSON.parse(greeting.body));
		});
		stompClient.subscribe('/topic/gettooltipdata/1', function(greeting) {

			getToolTip(JSON.parse(greeting.body));
		});

	});
}
function getToolTip(message) {
	console.log(message);
		if (message.type == 0) 
		{
			$(".details").text("");
			$(".details").append("	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/item/"+message.imageId+"'></img>");
			
			$(".details").append("<h2 class='name'>"+message.name+"</h2>" );
			$(".details").append("<h3 class='name'>"+message.description+"</h3>" );
					
					
			$(".details").append("<div class='data'>" +
					"<p>Games</p>" +
//					"<p>Winrate</p>" +
//					"<p>Points:</p>" +
					"</div>" );
													
			
			$(".details").show();
		}
		else if (message.type == 1) 
		{
			$(".details").text("");
			$(".details").append("	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/champion/"+message.image+"'></img>");
			
			$(".details").append("<h2 class='name'>"+message.name+"</h2>" );
			$(".details").append("<h3 class='name'>"+message.description+"</h3>" );
					
					
			$(".details").append("<div class='data'>" +
					"<p>Games</p>" +
//					"<p>Winrate</p>" +
//					"<p>Points:</p>" +
					"</div>" );
													
			
			$(".details").show();
		}
		else if (message.type == 2) 
		{
			$(".details").text("");
			$(".details").append("	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/spell/"+message.image+"'></img>");
			
			$(".details").append("<h2 class='name'>"+message.name+"</h2>" );
			$(".details").append("<h3 class='name'>"+message.description+"</h3>" );
					
					
			$(".details").append("<div class='data'>" +
					"<p>Games</p>" +
//					"<p>Winrate</p>" +
//					"<p>Points:</p>" +
					"</div>" );
													
			
			$(".details").show();
		}
		else if (message.type == 3) 
		{
			$(".details").text("");
			$(".details").append("	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/rune/"+message.image+"'></img>");
			
			$(".details").append("<h2 class='name'>"+message.name+"</h2>" );
			$(".details").append("<h3 class='name'>"+message.description+"</h3>" );
					
					
			$(".details").append("<div class='data'>" +
					"<p>Games</p>" +
//					"<p>Winrate</p>" +
//					"<p>Points:</p>" +
					"</div>" );
													
			
			$(".details").show();
		}
		else
			{
			$(".details").text("");
			$(".details").append("	<img  class='details_img' src='http://ddragon.leagueoflegends.com/cdn/7.1.1/img/profileicon/"+message.summoner.image+".png'></img>");
			
			$(".details").append("<h2 class='name'>"+message.summoner.name+"</h2>" );
			$(".details").append("<p class='kda'>"+message.summoner.kills+"/"+message.summoner.deaths+"/"+message.summoner.assists+"</p>" );
					
					
			$(".details").append("<div class='data'>" +
					"<p>Games:"+message.summoner.games+"</p>" +
					
					"<p>Winrate: "+message.summoner.winrate+"</p>" +
					
					"</div>" );
													
			$(".details").append("	<img  style='margin-top:0px;' class='details_img tier' src='/img/tiers/"+message.summoner.tier+".png'></img>");
			
			$(".details").append("<h2 class='name'>"+message.summoner.tier+"</h2>" );
			$(".details").show();
			}
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
									+ message[i].champion_detail_id
									+ "' class='img_item' src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/"
									+ message[i].image
									+ "'></img>"

									+ "	<div class='description_data' id='description_id_"
									+ message[i].champion_detail_id
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
									+ message[i].champion_detail_id
									+ "</div>"
									+ "	</div>"
									+ "</div>" + "</div>");
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
									+ message[i].runeid
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
						var position = $(this).offset();
						description_img = maindescription.find(
								'.description_img').text();
						description_id = maindescription
								.find('.description_id').text();
						$(".item_description").text(description);
						$(".item_img").attr("src", description_img);
						$(".item_name").text(description_name);
						console.log(description_id);
						var left = +position.left - 210;
						var top = +position.top - 10;
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

						$(".details").append(
								"<div class='data'>" + "<p>Games</p>" +
								// "<p>Winrate</p>" +
								// "<p>Points:</p>" +
								"</div>");

						$(".details").show();

					}, function() {
						$(".details").hide();
					});
	$('.img_item')
			.click(
					function() {

						var img;

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
							console.log(textAreaId);
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

						} else if (typeData == 3) {

							$("#" + textAreaId)
									.append(
											"<img id='"
													+ description_id
													+ "' class='textarea_img tooltip_guide item' src='"
													+ description_img
													+ "'></img>");

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

								if ($(this).hasClass('profile')) {

								}

								else if ($(this).hasClass('item')) {
									var left = +position.left - 90;
									var top = +position.top - 300;
									$(".details").css("left", left + "px");
									$(".details").css("top", top + "px");
									$(".details").text("");

									getToolTipData("item", this.id);

									$(".details").show();

								}
							}, function() {
								$(".details").hide();
							});

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

						}

					});
}
var last_table_id = "general";
$("#sect_" + last_table_id).animate({

	height : "200px"
}, 500, function() {
	$("#sect_" + last_table_id + " td").toggle("slow");
});
$('.open_guide').click(function() {

	var id = this.id;
	if (id != last_table_id) {
		$("#sect_" + last_table_id + " td").toggle("fast");
		setTimeout(function() {

			$("#sect_" + last_table_id).animate({

				height : "0px"
			}, 500, function(last_table_id) {
				$("#sect_" + id).animate({

					height : "200px"
				}, 300, function() {
					$("#sect_" + id + " td").toggle("fast");
				});
			});
			last_table_id = id;
		}, 300);

	}

});

$(".textarea").keyup(function() {

	console.log(this.value);
	getAllData(this.value, 0, 4);
});

$(".card").hover(function() {
	$(this).children('.hover').slideToggle();

});

var last_item_id;
var description_img;
var description_id;

$('.add_mastery').click(
		function() {
			var id = this.id;

			var idd = id.replace('add_', '');
			console.log(idd);
			var value = $("#param" + idd).attr("value");
			console.log(value);
			if (idd == "81" || idd == "82" || idd == "83" || idd == "66"
					|| idd == "67" || idd == "68" || idd == "51" || idd == "52"
					|| idd == "53") {
				$("#param84").attr("value", $("#img_add_" + idd).attr("src"));
			}
			if (value == 0) {
				$("#param" + idd).attr("value", 1);

			} else {

				$("#param" + idd).attr("value", 0);
			}
			$("#img_add_" + idd).toggleClass("mastery_shade");

		});
$('.guide_switch').click(function() {
	console.log(this.id);
	$(".build").animate({

		height : "0px"
	}, 500, function() {

	});

});
var build_iter = 0;
var summonersIter = 0;
var notesIter = 0;
var typeData;
$('.extra')
		.click(
				function() {
					console.log(this.id);
					if (this.id == "build_extra") {
						typeData = 0;
						$(".more_extra_build").find('tr:last').prev().after(
								"<tr class='showtd extra_row" + build_iter
										+ "'></tr>");
						$(".extra_row" + build_iter)
								.animate(
										{

											height : "500px"
										},
										500,
										function() {

											$(".extra_row" + build_iter)
													.append(
															"<td colspan='3' class='show' ><table>"
																	+ "<tr>"

																	+"<td>Title<input type='text' id='extraBuildLabel["
																	+ build_iter
																	+ "]' name='extraBuildLabel["
																	+ build_iter
																	+ "]'></input>"
																	+ "</td>"
																	+ "</tr>"
																	+ "<tr>"
																	+

																	"<td >"
																	+ "<input type='hidden' value='0' class='extra_data_"
																	+ build_iter
																	+ "_0' id='itemList["
																	+ build_iter
																	+ "][0]' name='itemList["
																	+ build_iter
																	+ "][0]' />"
																	+ "<a class='extra_add_item' id='extra_item_"
																	+ build_iter
																	+ "_0'> <img class='build_img remove' id='img_"
																	+ build_iter
																	+ "_0' src='/img/add.png'></img></a>"
																	+ "</td>"
																	+ "</tr>"
																	+ "<tr>"

																	+ " <input type='hidden' class='extraBuildDescription"
																	+ build_iter
																	+ "text' value='0' id='extraBuildDescription["
																	+ build_iter
																	+ "]' name='extraBuildDescription["
																	+ build_iter
																	+ "]' />"
																	+ "<td><div contentEditable='true' class='guide_textarea'"
																	+ "	id='extraBuildDescription"
																	+ build_iter
																	+ "text' name='extraBuildDescription_"
																	+ build_iter
																	+ "text'"
																	+ "	 placeholder='Describe your build'></div></td>"
																	+ "	<td><table><tr>"
																	+ "	<td><a id='extraBuildDescription"
																	+ build_iter
																	+ "text_item' class='add_text'> <img alt=''"
																	+ "	class='add_text_img ' id='img_add_1'"
																	+ "	src='/img/add.png'></img>"
																	+ "</a></td></tr>"
																	+ "	<tr><td><a id='extraBuildDescription"
																	+ build_iter
																	+ "text_summoners' class='add_text'> <img alt=''"

																	+ "	class='add_text_img  ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/SummonerSnowball.png'></img>"
																	+ "</a></td></tr>"
																	+ "	<tr><td><a id='extraBuildDescription"
																	+ build_iter
																	+ "text_runes' class='add_text'> <img alt=''"
																	+ "	class='add_text_img  ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/r_3_3.png'></img>"
																	+ "</a></td></tr>"
																	+ "<tr><td><a id='extraBuildDescription"
																	+ build_iter
																	+ "text_champion' class='add_text'> <img alt=''"
																	+ "	class='add_text_img ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
																	+ "</a></td></tr></table>"
																	+ "</td>"
																	+ "</tr>"
																	+ "</table></td>");

											$(".show").css("display", "");
											$('.add_text').click(function() {
												var id = this.id.split("_");
												typeData = 3;
												textAreaId = id[0];

												console.log(id[1]);
												$(".sidebar").animate({

													width : "220px"
												}, 500, function() {
													getAllData("", id[1], 2);
													searchid = id.charAt(0);
												});

											});
											$('.extra_add_item')
													.click(
															function() {
																var id = this.id;
																console.log(id);
																var id = id
																		.replace(
																				"extra_item_",
																				"");
																console.log(id);
																$(".sidebar")
																		.animate(
																				{

																					width : "200px"
																				},
																				500,
																				function() {
																					getAllData(
																							"",
																							id
																									.charAt(0),
																							id
																									.charAt(2));
																					searchid = id.id
																							.charAt(0);
																				});

																last_item_id = id;
																$(".remove")
																		.removeClass(
																				"active");
																$(
																		"#img_"
																				+ last_item_id)
																		.addClass(
																				"active");
															});
											build_iter++;

										});

					} else if (this.id == "summoners_extra") {
						typeData = 1;
						$(".more_extra_summoners").find('tr:last').prev()
								.after(
										"<tr class='showtd extra_row_summoners"
												+ summonersIter + "'></tr>");
						$(".extra_row_summoners" + summonersIter)
								.animate(
										{

											height : "200px"
										},
										500,
										function() {
											console.log(".extra_row_summoners"
													+ summonersIter);
											$(
													".extra_row_summoners"
															+ summonersIter)
													.append(
															"<td colspan='3' class='show' ><table>"
																	+ "<tr>"
																	+

																	"<td >"
																	+ "Title<input type='text' id='extraSummonersLabel["
																	+ summonersIter
																	+ "]' name='extraSummonersLabel["
																	+ summonersIter
																	+ "]''></input>"
																	+ "</td>"
																	+ "</tr>"
																	+ "<tr>"
																	+

																	"<td >"
																	+ "<input type='hidden' value='0' class='extra_summoners_data_"
																	+ summonersIter
																	+ "_0' id='summonersList["
																	+ summonersIter
																	+ "][0]' name='summonersList["
																	+ summonersIter
																	+ "][0]' />"
																	+ "<a class='extra_add_item' id='extra_summoners_"
																	+ summonersIter
																	+ "_0'> <img class='build_img remove' id='img_summoners_"
																	+ summonersIter
																	+ "_0' src='/img/add.png'></img></a>"
																	+ "</td>"
																	+ "</tr>"
																	+ "<tr>"
																	+ " <td><input type='hidden' class='extraSummonersDescription"
																	+ build_iter
																	+ "text' value='0' id='extraSummonersDescription["
																	+ summonersIter
																	+ "]' name='extraSummonersDescription["
																	+ summonersIter
																	+ "]' /></td>"

																	+ "<td><div contentEditable='true' class='guide_textarea'"
																	+ "	id='extraSummonersDescription"
																	+ summonersIter
																	+ "text' name='extraSummonersDescription"
																	+ summonersIter
																	+ "text'"
																	+ "	 placeholder='Describe your build'></div></td>"
																	+ "	<td><table><tr>"
																	+ "	<td><a id='extraSummonersDescription"
																	+ buisummonersIterld_iter
																	+ "text_item' class='add_text'> <img alt=''"
																	+ "	class='add_text_img ' id='img_add_1'"
																	+ "	src='/img/add.png'></img>"
																	+ "</a></td></tr>"
																	+ "	<tr><td><a id='extraSummonersDescription"
																	+ summonersIter
																	+ "text_summoners' class='add_text'> <img alt=''"
																	+ "	class='add_text_img  ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/SummonerSnowball.png'></img>"
																	+ "</a></td></tr>"
																	+ "	<tr><td><a id='extraBuildDescription"
																	+ summonersIter
																	+ "text_runes' class='add_text'> <img alt=''"
																	+ "	class='add_text_img  ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/r_3_3.png'></img>"
																	+ "</a></td></tr>"
																	+ "<tr><td><a id='extraSummonersDescription"
																	+ summonersIter
																	+ "text_champion' class='add_text'> <img alt=''"
																	+ "	class='add_text_img ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
																	+ "</a></td></tr></table>"
																	+ "</td>"
																	+ "</tr>"
																	+ "</table></td>");

											$(".show").css("display", "");

											$('.add_text').click(function() {
												var id = this.id.split("_");
												typeData = 3;
												textAreaId = id[0];

												console.log(id[1]);
												$(".sidebar").animate({

													width : "220px"
												}, 500, function() {
													getAllData("", id[1], 2);
													searchid = id.charAt(0);
												});

											});

											$('.extra_add_item')
													.click(
															function() {
																var id = this.id;
																console.log(id);
																var id = id
																		.replace(
																				"extra_summoners_",
																				"");
																console.log(id);
																$(".sidebar")
																		.animate(
																				{

																					width : "200px"
																				},
																				500,
																				function() {
																					getAllData(
																							"",
																							id
																									.charAt(0),
																							id
																									.charAt(2));
																					searchid = id
																							.charAt(0);
																				});

																last_item_id = id;
																$(".remove")
																		.removeClass(
																				"active");
																$(
																		"#img_summoners_"
																				+ last_item_id)
																		.addClass(
																				"active");
															});
											summonersIter++;
										});

					} else if (this.id == "notes_extra") {

						$(".all_table").find('tr:last').prev().after(
								"<tr class='showtd extra_row_all" + notesIter
										+ "'></tr>");
						$(".extra_row_all" + notesIter)
								.animate(
										{

											height : "200px"
										},
										500,
										function() {

											$(".extra_row_all" + notesIter)
													.append(
															"<td colspan='3' class='show' ><table>"
																	+ "<tr>"
																	+

																	"<td >"
																	+ "Title<input type='text' id='extraNotes["
																	+ notesIter
																	+ "]' name='extraNotes["
																	+ notesIter
																	+ "]''></input>"
																	+ "</td>"
																	+ "</tr>"
																	+ "<tr>"
																	+ " <input type='hidden' class='extraNotesDescription"
																	+ notesIter
																	+ "text' value='0' id='extraNotesDescription["
																	+ notesIter
																	+ "]' name='extraNotesDescription["
																	+ notesIter
																	+ "]' />"
																	+ "<td><div contentEditable='true' class='guide_textarea'"
																	+ "	id='extraNotesDescription"
																	+ notesIter
																	+ "text' name='extraNotesDescription"
																	+ notesIter
																	+ "text'"
																	+ "	 placeholder='Describe your build'></div></td>"
																	+ "	<td><table><tr>"
																	+ "	<td><a id='extraNotesDescription"
																	+ notesIter
																	+ "_item' class='add_text'> <img alt=''"
																	+ "text	class='add_text_img ' id='img_add_1'"
																	+ "	src='/img/add.png'></img>"
																	+ "</a></td></tr>"
																	+ "	<tr><td><a id='extraNotesDescription"
																	+ notesIter
																	+ "text_summoners' class='add_text'> <img alt=''"
																	+ "	class='add_text_img  ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/SummonerSnowball.png'></img>"
																	+ "</a></td></tr>"
																	+ "	<tr><td><a id='extraBuildDescription"
																	+ notesIter
																	+ "text_runes' class='add_text'> <img alt=''"
																	+ "	class='add_text_img  ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/r_3_3.png'></img>"
																	+ "</a></td></tr>"
																	+ "<tr><td><a id='extraNotesDescription"
																	+ notesIter
																	+ "text_champion' class='add_text'> <img alt=''"
																	+ "	class='add_text_img ' id='img_add_1'"
																	+ "	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
																	+ "</a></td></tr></table>"
																	+ "</td>"
																	+ "</tr>"
																	+ "</table></td>");

											$(".show").css("display", "");

											$('.add_text').click(function() {
												var id = this.id.split("_");
												typeData = 3;
												textAreaId = id[0];

												console.log(id[1]);
												$(".sidebar").animate({

													width : "220px"
												}, 500, function() {
													getAllData("", id[1], 2);
													searchid = id.charAt(0);
												});

											});

											$('.extra_add_item')
													.click(
															function() {
																var id = this.id;
																console.log(id);
																var id = id
																		.replace(
																				"extra_summoners_",
																				"");
																console.log(id);
																$(".sidebar")
																		.animate(
																				{

																					width : "200px"
																				},
																				500,
																				function() {
																					getAllData(
																							"",
																							id
																									.charAt(0),
																							id
																									.charAt(2));
																					searchid = id
																							.charAt(0);
																				});

																last_item_id = id;
																$(".remove")
																		.removeClass(
																				"active");
																$(
																		"#img_summoners_"
																				+ last_item_id)
																		.addClass(
																				"active");
															});
											notesIter++;
										});

					}

				});
$('.add_item').click(function() {
	var id = this.id;
	console.log(id);

	$(".sidebar").animate({

		width : "230px"
	}, 500, function() {
		getAllData("", id.replace('add_', ''), 3);
		searchid = id.replace('add_', '', 1);
	});
	typeData = 2;
	last_item_id = jQuery(this).attr("id").replace('add_', '');

	$(".remove").removeClass("active");
	$("#img_add_" + last_item_id).addClass("active");

});
var textAreaId;
$('.add_text').click(function() {
	var id = this.id.split("_");
	typeData = 3;
	textAreaId = id[0];

	console.log(id[0]);
	console.log(id[1]);
	$(".sidebar").animate({

		width : "220px"
	}, 500, function() {

	});
	setTimeout(function() {
		getAllData("", id[1], 2);
	}, 500);
});

/* ]]> */