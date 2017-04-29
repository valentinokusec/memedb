
console.log($("#properties").text());
var data=JSON.parse($("#properties").text());
console.log(data.bodycolor);

$("body").css("background",data.bodycolor);
$(".content_dis").css("background",data.bodycolor);

document.title = $('#main_name').text();