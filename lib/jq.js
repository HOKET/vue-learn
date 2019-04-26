$(function(){
	addEventListener();
});

function createRequest(method, url, data, successFunc, failFunc) {
	if (!url) return;
	$.ajax({
		url: url, //处理页面的路径
		data: data, //要提交的数据是一个JSON
		type: method, //提交方式
		dataType: "TEXT", //返回数据的类型
		//TEXT字符串 JSON返回JSON XML返回XML
		success: successFunc, //回调函数 ,成功时返回的数据存在形参data里
		error: failFunc,
	});
}

function Search(data) {
	var text = JSON.parse(data);
	var $p = $("#result");
	// p.innerText = data;
	var content = text.result[0];
	if (content) {
		var $h1 = $("<h1>"+ content.name +"</h1>");
		var $dec = $("<p>"+ content.desc +"</p>");
		$p.after($h1);
		$h1.after($dec);
	}
}

function addEventListener() {
	$("#btn").bind('click', function() {
		createRequest('GET', 'https://api.apiopen.top/searchAuthors', {
			name: $("#id").val(),
		}, Search)
	});
}