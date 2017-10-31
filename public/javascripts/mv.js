//
// 券売機シミュレータ
//

var 指定席ボタン   =         { left:  '1%', top:  '2%', width: '48%', height: '25%' };
var 乗換案内から購入ボタン = { left: '50%', top:  '2%', width: '48%', height: '25%' };
var 自由席ボタン =           { left:  '1%', top: '28%', width: '48%', height: '25%' };
var おトクなきっぷボタン =   { left: '50%', top: '28%', width: '48%', height: '25%' };

var 新幹線指定席ボタン =     { left:  '1%', top: '16%', width: '47%', height: '16%' };
var button22 = { left: '51%', top: '16%', width: '47%', height: '16%' };

var button31 = { left:  '1%', top:  '9%', width: '31%', height: '14%' };
var button32 = { left: '33%', top:  '9%', width: '31%', height: '14%' };
var button33 = { left: '65%', top:  '9%', width: '31%', height: '14%' };

//var states = {};
//states['トップ'] = {

var states = {
    トップ: {
	画像: 'https://gyazo.com/2069fefaec99bff27e6fde58f90bcd7e.png',
	ボタン: {
	    指定席:           { 座標: 指定席ボタン,           遷移: () => '指定席選択' },
	    乗換案内から購入: { 座標: 乗換案内から購入ボタン, 遷移: () => '指定席選択' },
	    自由席:           { 座標: 自由席ボタン,           遷移: () => '指定席選択' },
	    おトクなきっぷ:   { 座標: おトクなきっぷボタン,   遷移: () => '指定席選択' }
	}
    },
    指定席選択: {
	画像: 'https://gyazo.com/3a1f7bd4053a1989b9d32e1f2b8ce30e.png',
	ボタン: {
	    新幹線指定席:     { 座標: 新幹線指定席ボタン, 遷移: () => '新幹線指定席選択'},
	    button22:         { 座標: button22,           遷移: () => 'トップ' }
	}
    },
    新幹線指定席選択: {
	画像: 'https://gyazo.com/b6a4379be160f099e8ce568a03f67793.png',
	ボタン: {
	    button31:         { 座標: button31, 遷移: () => 'トップ'},
	    button32:         { 座標: button32, 遷移: () => 'トップ'},
	    button33:         { 座標: button33, 遷移: () => 'トップ'}  //, function(){ return '指定席選択'; }]
	}
    },
    あおもりホリデーパス: {
	画像: 'https://gyazo.com/99756639f580e97ae6015f2173e44187.png',
	ボタン: {
	}
    }
}

function transfunc(destfunc){
    return function(){
	trans(destfunc());
    };
}

function trans(name){ // stateに遷移
    $('body').empty();
    $('body').css('margin',0);
    var state = states[name];
    var image = $('<img>');
    image.attr('src',state.画像);
    image.css('width','100%');
    $('body').append(image);
    // for(var j=0;j<state.ボタン.length;j++){
    //	var button = state.ボタン[j][0];
    for (buttonname in state.ボタン){
	var button = state.ボタン[buttonname].座標;
	var div = $('<div>').
	    css('position','absolute').
	    css('background-color','#ff0').
	    css('top',button.top).
	    css('left',button.left).
	    css('width',button.width).
	    css('height',button.height).
	    css('opacity',0.3);
	div.on('click', transfunc(state.ボタン[buttonname].遷移));
	$('body').append(div);
    }
};

function readLinks(id){ // RFIDのタッチ情報を取得
    var linkdata = [];
    var api = 'http://connectouch.org/links';
    if(id) api = `${api}?id=${id}`;
    $.ajaxSetup({async: false});
    $.getJSON(api, null, function(data, status){
	if (status == 'success') {
	    linkdata = data
	    /*
	    if(data.length > 0){
		firstdata = data[0];
		lastdata = data[data.length-1];
		var date_obj = new Date(firstdata.time * 1000);
	    }
	    */
	}
    });
    return linkdata;
}

$(function() {
    var 券売機 = 鎌倉券売機

    // 券売機関連のリンクを取得
    var 鎌倉券売機リスト = readLinks(券売機);
    
    //
    // ユーザを調べ、それに応じて状態遷移を変える
    //

    //
    // 最も最近タッチされたカードのIDを取得
    //
    var link = 鎌倉券売機リスト[0].link;
    var nfcid = link[0];
    if(is_mac(nfcid)) nfcid = link[1];

    //
    // 利用履歴取得
    // 最近の趣味がわかるハズ
    //
    var nfc利用履歴リスト = readLinks(nfcid);
    nfc利用履歴リスト.forEach(function(利用履歴){
	var link = 利用履歴.link;
	var target = link[0];
	if(target == nfcid) target = link[1];
	//
	// targetごとにいろんな処理
	//
	if(target == 緑水亭ポスタ || true){
	    // 遷移関数を変更
	    states.トップ.ボタン.おトクなきっぷ.遷移 = () => 'あおもりホリデーパス';
	}
    });
    
    trans('トップ');
});
