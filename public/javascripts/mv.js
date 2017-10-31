//
// 券売機シミュレータ
//

var button11 = { left:  '1%', top:  '2%', width: '48%', height: '25%' };
var button12 = { left: '50%', top:  '2%', width: '48%', height: '25%' };
var button13 = { left:  '1%', top: '28%', width: '48%', height: '25%' };
var button14 = { left: '50%', top: '28%', width: '48%', height: '25%' };

var button21 = { left:  '1%', top: '16%', width: '47%', height: '16%' };
var button22 = { left: '51%', top: '16%', width: '47%', height: '16%' };

var button31 = { left:  '1%', top:  '9%', width: '31%', height: '14%' };
var button32 = { left: '33%', top:  '9%', width: '31%', height: '14%' };
var button33 = { left: '65%', top:  '9%', width: '31%', height: '14%' };

var states = {};
states['トップ'] = {
    image: 'https://gyazo.com/2069fefaec99bff27e6fde58f90bcd7e.png',
    buttons: [
	[button11, '指定席選択'],
	[button12, '指定席選択',
	 function(){ alert(10); return '指定席選択'; } // 状況によって飛び先を変える!
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
    $('body').css('margin',0);
    var state = states[name];
    var image = $('<img>');
    image.attr('src',state.image);
    image.css('width','100%');
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
	    // var date_obj = new Date(lastdata.time * 1000);
	    // alert(date_obj.toString());
	}
    });
}

$(function() {
    readLinks();
    // ユーザを調べ、それに応じて状態遷移を変える
    trans('トップ');
});
