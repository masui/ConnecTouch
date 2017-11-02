//
// Chrome拡張機能
//
// 現在のマシンからどのURLを見てるかを通知
//
$(function(){
    //$.ajax('http://localhost/~masui/rememberurl.cgi',
    $.ajax('https://www.pitecan.com/rememberurl.cgi', // pitecan.com では駄目
	   {
	       type: 'get',
	       async: false,
	       data: { url: location.href },
	       dataType: 'text'
	   }
	  );
});
