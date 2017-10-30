//
// setdisp(image, [buttons])
// button = 
//

// trans(3) 状態3に移動

//
// button1 == {
//   image: 'http://....', <= 透明かも
//   pos: [10, 20],
//   size: [100, 100]
//   
// }
// state1 = {
//   name: 'state1',
//   image: 'http://....',
//   buttons: [
//     [button1, 'state2'],
//     [button2, 'state3', function(){ ... }]
//   ],
// }
//

var button1 = {
    left: 400,
    top: 150,
    width: 400,
    height: 140
};
var button2 = {
    left: 0,
    top: 150,
    width: 400,
    height: 140
};

var states = [
    {
	name: 'トップ',
	image: 'https://gyazo.com/2069fefaec99bff27e6fde58f90bcd7e.png',
	buttons: [
	    [button1, '指定席'],
	    [button2, '指定席', function(){ alert(100); }]
	]
    },
    {
	name: '指定席',
	image: 'https://gyazo.com/3a1f7bd4053a1989b9d32e1f2b8ce30e.png',
	buttons: [
	    [button1, 'トップ'],
	    [button2, 'トップ', function(){ alert(200); }]
	]
    }
];

function transfunc(s){
    return function(){ trans(s); };
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
		div.on('click',transfunc(state.buttons[j][1]));
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
