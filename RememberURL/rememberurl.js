//
// Chrome拡張機能
//
// 現在のマシンからどのURLを見てるかを通知
//
$(function(){
    var valid = true;
    var ignorePatterns = [
	/wifemovie/
    ];
    for(var i=0; i<ignorePatterns.length; i++){
	if(location.href.match(ignorePatterns[i])){
	    valid = false;
	}
    }
    if(valid){
	$.ajax('https://www.pitecan.com/RememberURL/remember.cgi', // pitecan.com では駄目
	       {
		   type: 'get',
		   // async: false,
		   data: { url: location.href, title: document.title, id: 'masui' },
		   dataType: 'text'
	       }
	      );
    }
});
  
