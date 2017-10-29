//
// Chrome拡張機能
//
// 現在どのマシンからどのURLを見てるかを通知
//
$(function(){
    $.ajax('http://localhost/~masui/rememberurl.cgi',
	   {
	       type: 'get',
	       async: false,
	       data: { url: location.href },
	       dataType: 'text'
	   }
	  );
});
