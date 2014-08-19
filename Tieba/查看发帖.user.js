// ==UserScript==
// @name 		查看发帖
// @namespace 	firefox
// @include 	http://tieba.baidu.com/*
// @version 	1
// @run-at 		document-start
// @require 	http://code.jquery.com/jquery-latest.min.js
// @grant 		none
// ==/UserScript==
//用户个人中心自动去除访问记录加一个查看发帖记录链接
window.location.href.indexOf('http://tieba.baidu.com/home') != -1 && (function () {
	var dflag = false, aflag = false, b = null, un = null;
	var i = setInterval(function () {
			b = $(".del_card_btn");
			if(b && b.length > 0) {
				b.click();
				$(".dialogJ").hide();
				$(".dialogJbtn").click();
				flag = $(".del_card_btn").length < 1 ? true : false;
			}
			un = $('.userinfo_username ');
			if(un.length > 0 && !aflag) {
				if(un)
					$('.userinfo_middle .userinfo_title').append('<a style="margin-left: 10px;text-decoration: none!important;cursor: pointer;color:#FF6600;" href="http://www.tieba.com/f/search/ures?ie=utf-8&kw=&qw=&rn=100&un=' + encodeURIComponent(un.text()) + '&sm=1"" target="_blank">发言记录</a>')
					aflag = true;
			}
			if(b.length < 0 && flag && aflag) {
				clearInterval(i);
			}
		}, 100);
})();
//用户卡片添加查看发帖记录
$(document).ready(function(){
	document.addEventListener('DOMNodeInserted',function(e){
		if(e.target.className == 'card_headinfo_wrap'){
			var sp = $('.card_userinfo_num .userinfo_split + span').css({ color: "red",cursor:'default'});
			sp.click(function(){
				var name = encodeURIComponent(JSON.parse($('#user_visit_card').attr('data-field')).un);
				window.open("http://www.tieba.com/f/search/ures?ie=utf-8&kw=&qw=&rn=100&un=" + name + "&sm=1", "_blank");
			});
		};
	},false);
});