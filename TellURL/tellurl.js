//
//
//
$(function(){
    $.ajax('http://masui.org/TellURL/tellurl.cgi',
	   {
	       type: 'get',
	       async: false,
	       data: { url: location.href },
	       dataType: 'text',
	       xhrFields: {
		   withCredentials: true
	       }
	   }
	  );
});
