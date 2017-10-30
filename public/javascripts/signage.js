//
// サイネージシミュレータ
//

var div1, div2, div3;
var iframe;

var button11 = { left:   0, top:  10, width: 400, height: 140 };
var button12 = { left: 400, top:  10, width: 400, height: 140 };
var button13 = { left:   0, top: 150, width: 400, height: 140 };
var button14 = { left: 400, top: 150, width: 400, height: 140 };

var button21 = { left:   0, top:  85, width: 400, height:  90 };
var button22 = { left: 400, top:  85, width: 400, height:  90 };

var button31 = { left:  20, top:  50, width: 250, height:  90 };
var button32 = { left: 275, top:  50, width: 250, height:  90 };
var button33 = { left: 530, top:  50, width: 250, height:  90 };

var states = {};
states['トップ'] = {
    image: 'https://gyazo.com/2069fefaec99bff27e6fde58f90bcd7e.png',
    buttons: [
	[button11, '指定席選択'],
	[button12, '指定席選択',
	 function(){ return '指定席選択'; } // 状況によって飛び先を変える!
	]
    ]
};
states['指定席選択'] = {
    image: 'https://gyazo.com/3a1f7bd4053a1989b9d32e1f2b8ce30e.png',
    buttons: [
	[button21, '新幹線指定席選択'],
	[button22, 'トップ', function(){ return 'トップ'; }]
    ]
};
states['新幹線指定席選択'] = {
    image: 'https://gyazo.com/b6a4379be160f099e8ce568a03f67793.png',
    buttons: [
	[button31, 'トップ'],
	[button32, 'トップ'],
	[button33, 'トップ', function(){ return '指定席選択'; }]
    ]
};

function transfunc(s, destfunc){
    return function(){
	var dest;
	dest = s;
	if(destfunc) dest = destfunc();
	trans(dest);
    };
}

function trans(name){ // stateに遷移
    $('body').empty();
    var state = states[name];
    var image = $('<img>');
    image.attr('src',state.image);
    image.css('width',800);
    $('body').append(image);
    for(var j=0;j<state.buttons.length;j++){
	var button = state.buttons[j][0];
	var div = $('<div>').
		css('position','absolute').
		css('background-color','#ff0').
		css('top',button.top).
		css('left',button.left).
		css('width',button.width).
		css('height',button.height).
		css('opacity',0.3);
	div.on('click',transfunc(state.buttons[j][1], state.buttons[j][2]));
	$('body').append(div);
    }
};

function readLinks(){
    const linksURL = 'http://connectouch.org/links'; // ConnecTouch API
    $.getJSON(linksURL, null, function(data, status){
	if (status == 'success') {
            firstdata = data[0];
	    lastdata = data[data.length-1];
	     var date_obj = new Date(lastdata.time * 1000);
	     alert(date_obj.toString());
	}
    });
}

$(function() {
    readLinks();
    // ユーザを調べ、それに応じて状態遷移を変える
    div1 = $('<div>');
    div1.css('background-color','yellow').
	css('float','left').
	css('width',300).
	css('height',100).
	css('margin',10).
	text('DIV1');
    $('body').append(div1);
    
    div2 = $('<div>');
    div2.css('background-color','yellow').
	css('float','left').
	css('width',300).
	css('height',100).
	css('margin',10).
	text('DIV2');
    $('body').append(div2);
    
    div3 = $('<div>');
    div3.css('background-color','yellow').
	css('float','left').
	css('width',300).
	css('height',100).
	css('margin',10).
	text('DIV3');
    $('body').append(div3);

    $('body').append($('<p>'));
    
    iframe = $('<iframe>');
    iframe.attr('marginwidth',0);
    iframe.attr('src','http://www.ryokusuitei.co.jp/');
    iframe.css('margin',0).
	css('padding',0).
	css('width','100%').
	css('height','90%').
	css('border','none');
    $('body').append(iframe);
    
    // trans('トップ');
});
