//
// 券売機シミュレータ
//

var button11 = { left:   0, top:  10, width: 400, height: 140 };
var button12 = { left: 400, top:  10, width: 400, height: 140 };
var button13 = { left:   0, top: 150, width: 400, height: 140 };
var button14 = { left: 400, top: 150, width: 400, height: 140 };

var button21 = { left:   0, top:  85, width: 400, height:  90 };
var button22 = { left: 400, top:  85, width: 400, height:  90 };

var button31 = { left:  20, top:  50, width: 250, height:  90 };
var button32 = { left: 275, top:  50, width: 250, height:  90 };
var button33 = { left: 530, top:  50, width: 250, height:  90 };

var states = [
    {
	name: 'トップ',
	image: 'https://gyazo.com/2069fefaec99bff27e6fde58f90bcd7e.png',
	buttons: [
	    [button11, '指定席選択'],
	    [button12, '指定席選択', function(){ alert('指定席選択'); }]
	]
    },
    {
	name: '指定席選択',
	image: 'https://gyazo.com/3a1f7bd4053a1989b9d32e1f2b8ce30e.png',
	buttons: [
	    [button21, '新幹線指定席選択'],
	    [button22, 'トップ', function(){ alert('トップに戻る'); }]
	]
    },
    {
	name: '新幹線指定席選択',
	image: 'https://gyazo.com/b6a4379be160f099e8ce568a03f67793.png',
	buttons: [
	    [button31, 'トップ'],
	    [button32, 'トップ'],
	    [button33, 'トップ', function(){ alert('トップに戻る'); }]
	]
    }
];

function transfunc(s, f){
    return function(){ trans(s); f(); };
}

function trans(s){ // sに遷移
    $('body').empty();
    for(var i=0;i<states.length;i++){
	if(states[i].name == s){
	    var state = states[i];
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
			css('opacity',0.5);
		div.on('click',transfunc(state.buttons[j][1], state.buttons[j][2]));
		$('body').append(div);
	    }
	    break;
	}
    }
};

$(function() {
    trans('トップ');
    // $('#otoku').on('click',function(){ alert(100); });
});
