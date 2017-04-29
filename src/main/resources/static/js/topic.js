$("#topic_text").append($("#topic_content").text());
var userid = $("#user_id").text();
var mainid = $("#main_id").text();
var topicid = $("#topic_id").text();
var sessionId = $("#session_id").text();
var authCount = $("#authCount").text();

var searchid;
function getToolTipData(type, data) {
	if (type == "item") {

		console.log(data);
		stompClient.send("/app/gettooltipitemdata/" + userid, {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "rune") {

		console.log(data);
		stompClient.send("/app/gettooltiprunedata/" + userid, {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "profile") {

		console.log(data);
		stompClient.send("/app/gettooltipuserdata/" + userid, {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "summoner") {

		console.log(data);
		stompClient.send("/app/gettooltipsummonerdata/" + userid, {}, JSON
				.stringify({
					'data' : data
				}));
	} else if (type == "champion") {

		console.log(data);
		stompClient.send("/app/gettooltipchampiondata/" + userid, {}, JSON
				.stringify({
					'data' : data
				}));
	}
}

function sendLike(id, type) {

	console.log(id);
	var likes = $(".main_like").text();

	console.log($("#user_id").text());
	stompClient.send("/app/setlikediscussiontopic/" + topicid, {}, JSON
			.stringify({
				'count' : likes,
				'id' : id,
				'type' : type,
				'user' : $("#user_id").text()

			}));
}
function sendLikeReply(id, type) {

	console.log(id);
	var likes = $(".like_" + id).text();
	console.log(type);
	console.log(likes);
	stompClient.send("/app/setlikediscussioncomment/" + topicid, {}, JSON
			.stringify({
				'count' : likes,
				'id' : id,
				'type' : type,
				'user' : $("#user_id").text()

			}));
}
var data = $("#comments_data").text();

console.log(data);
var jsonData = JSON.parse(data);
console.log(jsonData);
if (jsonData.length != 0) {
	fillComments(jsonData);
}
function openComment() {

	$("#reply_text").slideToggle("fast");
}

function openReply(id) {
	console.log(id);
	$(".reply_text_" + id).slideToggle("fast");
}
function sendReply(id) {
	console.log(id);
	console.log($("#textarea" + id).html());
	$(".reply_text_" + id).toggle("fast");
	stompClient.send("/app/reply/" + topicid, {}, JSON.stringify({
		'name' : $("#textarea" + id).html(),
		'user' : $("#user_id").text(),
		'id' : id
	}));
}
function sendComment() {

	$("#reply_text").toggle("fast");
	stompClient.send("/app/comment/" + topicid, {}, JSON.stringify({
		'name' : $("#contenttext").html(),
		'user' : $("#user_id").text()
	}));
}
var stompClient = null;


function setTopicLike(message, id, type, commentId, notificationcounter,
		notification) {

	notifications = JSON.parse(notification);

	stompClient.send("/app/notification/" + notifications.touser.id, {}, JSON
			.stringify({
				'touser' : notifications.touser,
				'content' : notifications.content,
				'fromuser' : notifications.fromuser
			}));
	if (type == true) {
		console.log($(".topic_up"));
		$(".topic_down").attr("disabled", false);
		$(".topic_down").css("opacity", "1");
		$(".topic_up").attr("disabled", true);
		$(".topic_up").css("opacity", "0.5");
	} else {
		$(".topic_up").attr("disabled", false);
		$(".topic_up").css("opacity", "1");
		$(".topic_down").attr("disabled", true);
		$(".topic_down").css("opacity", "0.5");
	}
	$(".main_like").text(message);
}
function setTopicLikeReply(message, id, type, commentId, notificationcounter,
		notification) {

	notifications = JSON.parse(notification);

	stompClient.send("/app/notification/" + notifications.touser.id, {}, JSON
			.stringify({
				'touser' : notifications.touser,
				'content' : notifications.content,
				'fromuser' : notifications.fromuser
			}));
	if (type == true) {
		console.log(message);
		$(".topic_down_" + id).attr("disabled", false);
		$(".topic_down_" + id).css("opacity", "1");
		$(".topic_up_" + id).attr("disabled", true);
		$(".topic_up_" + id).css("opacity", "0.5");
	} else {
		console.log(message);
		$(".topic_up_" + id).attr("disabled", false);
		$(".topic_up_" + id).css("opacity", "1");
		$(".topic_down_" + id).attr("disabled", true);
		$(".topic_down_" + id).css("opacity", "0.5");
	}
	$(".like_" + id).text(message);
}

function fillComments(jsonArray) {
	for ( var i in jsonArray) {

		if (jsonArray[i].reply == false) {

			$("#comments")
					.append(
							"<div style='display:block;' class='comment' id="
									+ jsonArray[i].id
									+ ">"
									+ "<table style='    display: inline; width: 100%;'><tr><td><p>"
									+ jsonArray[i].content
									+ "</p><tr><td>"
									+ "<img id='"
									+ jsonArray[i].user.id
									+ "'"
									+ "	src='http://ddragon.leagueoflegends.com/cdn/6.22.1/img/profileicon/"
									+ jsonArray[i].user.image
									+ ".png'"
									+ "class='  tooltip_guide profile'"
									+ "style='width: 30px; height: 30px;     float: left;' ></img>"
									+ ""
									+ "<p style='min-width: 200px;    position: relative; top: 8px; left: 10px;'>"
									+ jsonArray[i].user.name
									+ "</p></td>"
									+ ""
									+ "</tr></table>"
									+ "<button class='reply reply_comment1 comment_reply show_member' onclick='openReply("
									+ jsonArray[i].id
									+ ")'> <i class='share-icon fa fa-reply'></i> Reply</button>"
									+ "<table class='dis_votes_topic_comments show_member'>"
									+ "	<tr>"
									+ "<td>"
									+ "<button class='topic_up_"
									+ jsonArray[i].id
									+ "'"
									+ "onclick='sendLikeReply(this.id,1)' id='"
									+ jsonArray[i].id
									+ "'>"
									+ "<i class='fa fa-angle-up'></i>"
									+ "		</button>"
									+ "	</td>"
									+ "</tr>"
									+ "<tr>"
									+ "	<td><p style='margin-top: 0px; margin-bottom: 0px;'"
									+ "			class='like_"
									+ jsonArray[i].id
									+ "' id='main_likes'"
									+ "		>"
									+ jsonArray[i].votes
									+ "</p></td>"
									+ "</tr>"
									+ "<tr>"
									+ "<td>"
									+ "<button class='topic_down_"
									+ jsonArray[i].id
									+ "'"
									+ "onclick='sendLikeReply(this.id,2)' id='"
									+ jsonArray[i].id
									+ "'>"
									+ "<i class='fa fa-angle-down'></i>"
									+ "		</button>"
									+ "	</td>"
									+ "</tr>"
									+ "</table>"
									+ "	<div class='reply_text_"
									+ jsonArray[i].id
									+ " reply_text'>"

									+ "<table><tr>"
									+ "<td><div contentEditable='true' class='guide_textarea_dis'id='textarea"
									+ jsonArray[i].id
									+ "' name='textarea'	style='width:500px;height:200px;'></div></td>"
									+ "	<td>	<table>"
									+ "	<tr>"
									+ "			<td><a id='textarea"
									+ jsonArray[i].id
									+ "_item' class='add_text'> <img"
									+ "					alt='' class='add_text_img ' id='img_add_1'"
									+ "					src='/img/add.png'></img>"
									+ "			</a></td>"
									+ "		</tr>"
									+ "		<tr>"
									+ "			<td><a id='textarea"
									+ jsonArray[i].id
									+ "_summoners' class='add_text'> <img"
									+ "					alt='' class='add_text_img  ' id='img_add_1'"
									+ "				src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/SummonerSnowball.png'></img>"
									+ "		</a></td>"
									+ "	</tr>"
									+ "	<tr>"
									+ "			<td><a id='textarea"
									+ jsonArray[i].id
									+ "_runes' class='add_text'> <img"
									+ "				class='add_text_img'	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/r_3_3.png'></img>"
									+ "			</a></td>"
									+ "		</tr>"
									+ "	<tr>"
									+ "		<td><a id='textarea"
									+ jsonArray[i].id
									+ "_champion' class='add_text'> <img"
									+ "				alt='' class='add_text_img ' id='img_add_1'"
									+ "		src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
									+ "	</a></td>"
									+ "	</tr></table></td>"
									+ "	</tr>"
									+ "</table>"
									+ "<button class='reply post' onclick='sendReply("
									+ jsonArray[i].id
									+ ")'>"
									+ "	<i class='share-icon fa fa-reply'></i> Reply"
									+ "	</button>"
									+ "</div>"
									+ "</div><div class='reply_comment' id='attach_reply_"
									+ jsonArray[i].id + "'></div>"

					);
		} else {
			$("#attach_reply_" + jsonArray[i].commentid)
					.append(
							"<div style='display:block;' class='comment' id="
									+ jsonArray[i].id
									+ ">"
									+ "<table style='    display: inline; width: 100%;'><tr><td><p>"
									+ jsonArray[i].content
									+ "</p><tr><td>"
									+ "<img id='"
									+ jsonArray[i].user.id
									+ "'"
									+ "	src='http://ddragon.leagueoflegends.com/cdn/6.22.1/img/profileicon/"
									+ jsonArray[i].user.image
									+ ".png'"
									+ "class='  tooltip_guide profile'"
									+ "style='width: 30px; height: 30px;     float: left;' ></img>"
									+ ""
									+ "<p style='min-width: 200px;    position: relative; top: 8px; left: 10px;'>"
									+ jsonArray[i].user.name
									+ "</p></td>"
									+ ""
									+ "</tr></table>"
									+ "<button class='reply reply_comment1 comment_reply show_member' onclick='openReply("
									+ jsonArray[i].id
									+ ")'> <i class='share-icon fa fa-reply'></i> Reply</button>"
									+ "<table class='dis_votes_topic_comments show_member'>"
									+ "	<tr>"
									+ "<td>"
									+ "<button class='topic_up_"
									+ jsonArray[i].id
									+ "'"
									+ "onclick='sendLikeReply(this.id,1)' id='"
									+ jsonArray[i].id
									+ "'>"
									+ "<i class='fa fa-angle-up'></i>"
									+ "		</button>"
									+ "	</td>"
									+ "</tr>"
									+ "<tr>"
									+ "	<td><p style='margin-top: 0px; margin-bottom: 0px;'"
									+ "			class='like_"
									+ jsonArray[i].id
									+ "' id='main_likes'"
									+ "		>"
									+ jsonArray[i].votes
									+ "</p></td>"
									+ "</tr>"
									+ "<tr>"
									+ "<td>"
									+ "<button class='topic_down_"
									+ jsonArray[i].id
									+ "'"
									+ "onclick='sendLikeReply(this.id,2)' id='"
									+ jsonArray[i].id
									+ "'>"
									+ "<i class='fa fa-angle-down'></i>"
									+ "		</button>"
									+ "	</td>"
									+ "</tr>"
									+ "</table>"
									+ "	<div class='reply_text_"
									+ jsonArray[i].id
									+ " reply_text'>"

									+ "<table><tr>"
									+ "<td><div contentEditable='true' class='guide_textarea_dis'id='textarea"
									+ jsonArray[i].id
									+ "' name='textarea'	style='width:500px;height:200px;'></div></td>"
									+ "	<td>	<table>"
									+ "	<tr>"
									+ "			<td><a id='textarea"
									+ jsonArray[i].id
									+ "_item' class='add_text'> <img"
									+ "					alt='' class='add_text_img ' id='img_add_1'"
									+ "					src='/img/add.png'></img>"
									+ "			</a></td>"
									+ "		</tr>"
									+ "		<tr>"
									+ "			<td><a id='textarea"
									+ jsonArray[i].id
									+ "_summoners' class='add_text'> <img"
									+ "					alt='' class='add_text_img  ' id='img_add_1'"
									+ "				src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/SummonerSnowball.png'></img>"
									+ "		</a></td>"
									+ "	</tr>"
									+ "	<tr>"
									+ "			<td><a id='textarea"
									+ jsonArray[i].id
									+ "_runes' class='add_text'> <img"
									+ "				class='add_text_img'	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/r_3_3.png'></img>"
									+ "			</a></td>"
									+ "		</tr>"
									+ "	<tr>"
									+ "		<td><a id='textarea"
									+ jsonArray[i].id
									+ "_champion' class='add_text'> <img"
									+ "				alt='' class='add_text_img ' id='img_add_1'"
									+ "		src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
									+ "	</a></td>"
									+ "	</tr></table></td>"
									+ "	</tr>"
									+ "</table>"
									+ "<button class='reply post' onclick='sendReply("
									+ jsonArray[i].id
									+ ")'>"
									+ "	<i class='share-icon fa fa-reply'></i> Reply"
									+ "	</button>"
									+ "</div>"
									+ "</div><div class='reply_comment' id='attach_reply_"
									+ jsonArray[i].id + "'></div>"

					);
		}

		if (jsonArray[i].comment.length != 0) {
			console.log(jsonArray[i].comment.length);
			fillComments(jsonArray[i].comment)
		}

	}

	if (authCount == 3 || authCount == 2) {
		$(".show_member").css("display", "block");
	}
}
console.log(authCount);
if (authCount == 3 || authCount == 2) {
	$(".show_member").fadeIn();
}
function showGreeting(message, id, type, commentId, userid, image, username, notificationcounter,
		notification) {

	notifications = JSON.parse(notification);

	stompClient.send("/app/notification/" + notifications.touser.id, {}, JSON
			.stringify({
				'touser' : notifications.touser,
				'content' : notifications.content,
				'fromuser' : notifications.fromuser
			}));
	if (type == false)

	{
		console.log("dsds");
		$("#comments")
				.prepend(
						"<div style='display:none;' class='comment' id="
								+ id
								+ ">"
								+ "<table style='    display: inline; width: 100%;'><tr><td><p>"
								+ message
								+ "</p><tr><td>"
								+ "<img id='"
								+ userid
								+ "'"
								+ "	src='http://ddragon.leagueoflegends.com/cdn/6.22.1/img/profileicon/"
								+ image
								+ ".png'"
								+ "class='  tooltip_guide profile'"
								+ "style='width: 30px; height: 30px;     float: left;' ></img>"
								+ ""
								+ "<p style='min-width: 200px;    position: relative; top: 8px; left: 10px;'>"
								+ username
								+ "</p></td>"
								+ ""
								+ "</tr></table>"
								+ "<button class='reply reply_comment1 comment_reply show_member' onclick='openReply("
								+ id
								+ ")'> <i class='share-icon fa fa-reply'></i> Reply</button>"
								+ "<table class='dis_votes_topic_comments show_member'>"
								+ "	<tr>"
								+ "<td>"
								+ "<button class='topic_up_"
								+ id
								+ "'"
								+ "onclick='sendLikeReply(this.id,1)' id='"
								+ id
								+ "'>"
								+ "<i class='fa fa-angle-up'></i>"
								+ "		</button>"
								+ "	</td>"
								+ "</tr>"
								+ "<tr>"
								+ "	<td><p style='margin-top: 0px; margin-bottom: 0px;'"
								+ "			class='like_"
								+ id
								+ "' id='main_likes'"
								+ "		>0</p></td>"
								+ "</tr>"
								+ "<tr>"
								+ "<td>"
								+ "<button class='topic_down_"
								+ id
								+ "'"
								+ "onclick='sendLikeReply(this.id,2)' id='"
								+ id
								+ "'>"
								+ "<i class='fa fa-angle-down'></i>"
								+ "		</button>"
								+ "	</td>"
								+ "</tr>"
								+ "</table>"
								+ "	<div class='reply_text_"
								+ id
								+ " reply_text'>"

								+ "<table><tr>"
								+ "<td><div contentEditable='true' class='guide_textarea_dis'id='textarea"
								+ id
								+ "' name='textarea'	style='width:500px;height:200px;'></div></td>"
								+ "	<td>	<table>"
								+ "	<tr>"
								+ "			<td><a id='textarea"
								+ id
								+ "_item' class='add_text'> <img"
								+ "					alt='' class='add_text_img ' id='img_add_1'"
								+ "					src='/img/add.png'></img>"
								+ "			</a></td>"
								+ "		</tr>"
								+ "		<tr>"
								+ "			<td><a id='textarea"
								+ id
								+ "_summoners' class='add_text'> <img"
								+ "					alt='' class='add_text_img  ' id='img_add_1'"
								+ "				src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/SummonerSnowball.png'></img>"
								+ "		</a></td>"
								+ "	</tr>"
								+ "	<tr>"
								+ "			<td><a id='textarea"
								+ id
								+ "_runes' class='add_text'> <img"
								+ "				class='add_text_img'	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/r_3_3.png'></img>"
								+ "			</a></td>"
								+ "		</tr>"
								+ "	<tr>"
								+ "		<td><a id='textarea"
								+ id
								+ "_champion' class='add_text'> <img"
								+ "				alt='' class='add_text_img ' id='img_add_1'"
								+ "		src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
								+ "	</a></td>"
								+ "	</tr></table></td>"
								+ "	</tr>"
								+ "</table>"
								+ "<button class='reply post' onclick='sendReply("
								+ id
								+ ")'>"
								+ "	<i class='share-icon fa fa-reply'></i> Reply"
								+ "	</button>"
								+ "</div>"
								+ "</div><div class='reply_comment' id='attach_reply_"
								+ id + "'></div>"

				);
	
		$("#" + id).slideToggle("fast");
	} else {
		console.log("gg");
		$("#attach_reply_" + commentId)
				.prepend(
						"<div style='display:none;' class='comment' id="
								+ id
								+ ">"
								+ "<table style='    display: inline; width: 100%;'><tr><td><p>"
								+ message
								+ "</p><tr><td>"
								+ "<img id='"
								+ userid
								+ "'"
								+ "	src='http://ddragon.leagueoflegends.com/cdn/6.22.1/img/profileicon/"
								+ image
								+ ".png'"
								+ "class='  tooltip_guide profile'"
								+ "style='width: 30px; height: 30px;     float: left;' ></img>"
								+ ""
								+ "<p style='min-width: 200px;    position: relative; top: 8px; left: 10px;'>"
								+ username
								+ "</p></td>"
								+ ""
								+ "</tr></table>"
								+ "<button class='reply reply_comment1 comment_reply show_member' onclick='openReply("
								+ id
								+ ")'> <i class='share-icon fa fa-reply'></i> Reply</button>"
								+ "<table class='dis_votes_topic_comments show_member'>"
								+ "	<tr>"
								+ "<td>"
								+ "<button class='topic_up_"
								+ id
								+ "'"
								+ "onclick='sendLikeReply(this.id,1)' id='"
								+ id
								+ "'>"
								+ "<i class='fa fa-angle-up'></i>"
								+ "		</button>"
								+ "	</td>"
								+ "</tr>"
								+ "<tr>"
								+ "	<td><p style='margin-top: 0px; margin-bottom: 0px;'"
								+ "			class='like_"
								+ id
								+ "' id='main_likes'"
								+ "		>0</p></td>"
								+ "</tr>"
								+ "<tr>"
								+ "<td>"
								+ "<button class='topic_down_"
								+ id
								+ "'"
								+ "onclick='sendLikeReply(this.id,2)' id='"
								+ id
								+ "'>"
								+ "<i class='fa fa-angle-down'></i>"
								+ "		</button>"
								+ "	</td>"
								+ "</tr>"
								+ "</table>"
								+ "	<div class='reply_text_"
								+ id
								+ " reply_text'>"

								+ "<table><tr>"
								+ "<td><div contentEditable='true' class='guide_textarea_dis'id='textarea"
								+ id
								+ "' name='textarea'	style='width:500px;height:200px;'></div></td>"
								+ "	<td>	<table>"
								+ "	<tr>"
								+ "			<td><a id='textarea"
								+ id
								+ "_item' class='add_text'> <img"
								+ "					alt='' class='add_text_img ' id='img_add_1'"
								+ "					src='/img/add.png'></img>"
								+ "			</a></td>"
								+ "		</tr>"
								+ "		<tr>"
								+ "			<td><a id='textarea"
								+ id
								+ "_summoners' class='add_text'> <img"
								+ "					alt='' class='add_text_img  ' id='img_add_1'"
								+ "				src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/spell/SummonerSnowball.png'></img>"
								+ "		</a></td>"
								+ "	</tr>"
								+ "	<tr>"
								+ "			<td><a id='textarea"
								+ id
								+ "_runes' class='add_text'> <img"
								+ "				class='add_text_img'	src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/rune/r_3_3.png'></img>"
								+ "			</a></td>"
								+ "		</tr>"
								+ "	<tr>"
								+ "		<td><a id='textarea"
								+ id
								+ "_champion' class='add_text'> <img"
								+ "				alt='' class='add_text_img ' id='img_add_1'"
								+ "		src='http://ddragon.leagueoflegends.com/cdn/7.2.1/img/champion/Kindred.png'></img>"
								+ "	</a></td>"
								+ "	</tr></table></td>"
								+ "	</tr>"
								+ "</table>"
								+ "<button class='reply post' onclick='sendReply("
								+ id
								+ ")'>"
								+ "	<i class='share-icon fa fa-reply'></i> Reply"
								+ "	</button>"
								+ "</div>"
								+ "</div><div class='reply_comment' id='attach_reply_"
								+ id + "'></div>"

				);
		console.log("#" + id);
		$("#" + id).slideToggle("fast");
	}
	if (authCount == 3 || authCount == 2) {
		$(".show_member").css("display", "block");
	}
}
if ($('#auth').text() == "true") {
	var deletetrigger = document.getElementById("delete_b"), deletedialog = document
			.getElementById("delete_dialog"), deletedlg = new DialogFx(
			deletedialog);

	deletetrigger.addEventListener('click', deletedlg.toggle.bind(deletedlg));
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

$('.img_item').hover(
		function() {

			var contentPanelId = jQuery(this).attr("id");
			var maindescription = $("#description_id_"
					+ contentPanelId.replace('img_id_', ''));
			var description = maindescription.find('.description_text').text();
			var description_name = maindescription.find(
					'.description_name_text').text();
			var position = $(this).offset();
			description_img = maindescription.find('.description_img').text();
			description_id = maindescription.find('.description_id').text();
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
					"	<img  class='details_img' src='" + description_img
							+ "'></img>");

			$(".details").append(
					"<h2 class='name'>" + description_name + "</h2>");
			$(".details").append("<h3 class='name'>" + description + "</h3>");

			$(".details").append("<div class='data'>" + "<p>Games</p>" +
			// "<p>Winrate</p>" +
			// "<p>Points:</p>" +
			"</div>");

			$(".details").show();

		}, function() {
			$(".details").hide();
		});
setTimeout(function(){ connect()}, 2000);
function connect() {
	var socket = new SockJS('/gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.debug = null
	stompClient.connect({}, function(frame) {

		console.log('Connected: ' + frame);
		stompClient.subscribe('/topic/greetings/' + topicid,
				function(greeting) {
					console.log("inc");
					showGreeting(JSON.parse(greeting.body).content, JSON
							.parse(greeting.body).id,
							JSON.parse(greeting.body).type, JSON
									.parse(greeting.body).commentId, JSON
									.parse(greeting.body).userid, JSON
									.parse(greeting.body).image, JSON
									.parse(greeting.body).username, JSON
									.parse(greeting.body).notificationcounter,
									JSON.parse(greeting.body).notification);
				});
		stompClient.subscribe('/topic/topiclikes/' + topicid,
				function(greeting) {
					setTopicLike(JSON.parse(greeting.body).content, JSON
							.parse(greeting.body).id,
							JSON.parse(greeting.body).type, JSON
									.parse(greeting.body).commentId, JSON
									.parse(greeting.body).notificationcounter,
							JSON.parse(greeting.body).notification);
				});
		stompClient.subscribe('/topic/topiclikesreply/' + topicid, function(
				greeting) {
			setTopicLikeReply(JSON.parse(greeting.body).content, JSON
					.parse(greeting.body).id, JSON.parse(greeting.body).type,
					JSON.parse(greeting.body).commentId, JSON
					.parse(greeting.body).notificationcounter,
					JSON.parse(greeting.body).notification);
		});
	
		stompClient.subscribe('/topic/getguidedata/' + userid, function(
				greeting) {

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
$('.img_item')
		.click(
				function() {

					var img;

					$(".remove").removeClass("active");
					if (typeData == 0) {

						$("#img_" + last_item_id).attr("src", description_img);
						console.log("#img_" + last_item_id);
						console.log(".extra_item_" + last_item_id);
						$(".extra_data_" + last_item_id).attr("value",
								description_id);

					} else if (typeData == 1) {

						$("#img_summoners_" + last_item_id).attr("src",
								description_img);
						console.log(description_id);
						console.log(".extra_data_summoners_" + last_item_id);
						$(".extra_data_summoners_" + last_item_id).attr(
								"value", description_id);

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

					} else if (typeData == 3) {

						$("#" + textAreaId)
								.append(
										"<img id='"
												+ description_id
												+ "' class='textarea_img tooltip_guide item' src='"
												+ description_img + "'></img>");

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
						$("#param" + last_item_id)
								.attr("value", description_id);
						$("#img_add_" + last_item_id).attr("src",
								description_img);
						var id = +last_item_id + 1;

						last_item_id = id;

						$("#img_add_" + id).addClass("active");

					}

				});

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
						var left = +position.left - 310;
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

						$(".details_img").addClass("details_img_scale");

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
							if (description_img.includes("item")) {
								$("#" + textAreaId)
										.append(
												"<img id='"
														+ description_id
														+ "' class='textarea_img  item' onmouseover='hoverToolTopNew(this)' src='"
														+ description_img
														+ "'></img>");
							} else if (description_img.includes("spell")) {
								$("#" + textAreaId)
										.append(
												"<img id='"
														+ description_id
														+ "' class='textarea_img  summoner' onmouseover='hoverToolTopNew(this)' src='"
														+ description_img
														+ "'></img>");
							} else if (description_img.includes("rune")) {
								$("#" + textAreaId)
										.append(
												"<img id='"
														+ description_id
														+ "' class='textarea_img  rune' onmouseover='hoverToolTopNew(this)' src='"
														+ description_img
														+ "'></img>");
							} else if (description_img.includes("champion")) {
								$("#" + textAreaId)
										.append(
												"<img id='"
														+ description_id
														+ "' class='textarea_img  champion' onmouseover='hoverToolTopNew(this)' src='"
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
console.log($("#state").text());
if ($("#state").text() == true) {
	$(".topic_up").attr("disabled", true);
	$(".topic_up").css("opacity", "0.5");

} else
	($("#state").text() == false)
{
	$(".topic_down").attr("disabled", true);
	$(".topic_down").css("opacity", "0.5");
}
var edata = JSON.parse($("#extra_data").text());

for (kk = 0; kk < edata.length; kk++) {
	if (edata[kk].state == true) {
		console.log(edata);
		$(".topic_up_" + edata[kk].id).attr("disabled", true);
		$(".topic_up_" + edata[kk].id).css("opacity", "0.5");
	} else if (edata[kk].state == false) {
		console.log(edata);
		$(".topic_down_" + edata[kk].id).attr("disabled", true);
		$(".topic_down_" + edata[kk].id).css("opacity", "0.5");
	}

	// $("#time_"+edata[kk].id).append(edata[kk].time);

}
