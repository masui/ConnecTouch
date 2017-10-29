//
// Chrome拡張機能
//
// 現在どのマシンからどのURLを見てるかを通知
//
$(function(){
    var macaddr = '';
    $.ajax('http://localhost/~masui/macaddr.cgi',
	   {
               type: 'get',
               async: false,
               success: function (data) {
		   macaddr = data;
               }
	   }
	  );
    $.ajax('http://masui.org/TellURL/tellurl.cgi',
	   {
	       type: 'get',
	       async: false,
	       data: { url: location.href, macaddr: macaddr },
	       dataType: 'text',
	       xhrFields: {
		   withCredentials: true
	       }
	   }
	  );
});
