//
// 券売機シミュレータ
//
// 2017/10/31 Toshiyuki Masui
//
// 誰かがポスタやサイネージにタッチした後で券売機に行って「おトクなきっぷ」
// を選択すると、履歴に応じておすすめ案内が表示される
//

//
// クリッカブルマップの座標
//
// https://labs.d-s-b.jp/ImagemapGenerator/ で取得
//
var 指定席ボタン =               { left:  23, top:  23, right:  761, bottom: 269 };
var 乗換案内から購入ボタン =     { left: 797, top:  24, right: 1534, bottom: 268 };
var 自由席ボタン =               { left:  23, top: 293, right:  760, bottom: 536 };
var おトクなきっぷボタン =       { left: 797, top: 293, right: 1534, bottom: 536 };

var 新幹線指定席ボタン =         { left:  16, top:  98, right:  430, bottom: 184 };
var 新幹線在来線のりつぎボタン = { left: 467, top:  97, right:  883, bottom: 184 };

var button31 =                   { left:  17, top:  59, right:  290, bottom: 132 };
var button32 =                   { left: 306, top:  59, right:  576, bottom: 132 };
var button33 =                   { left: 594, top:  58, right:  864, bottom: 132 };

var 全面ボタン =                 { left:   0, top:   0, right: 2000, bottom: 1000 };

//
// 状態定義
//
var states = {
    // 画像は https://www.youtube.com/watch?v=pQMaUxD8txg などから取得
    トップ: {
	画像: 'https://gyazo.com/2069fefaec99bff27e6fde58f90bcd7e.png', // 1570 x 942
	ボタン: {
	    指定席:                { 座標: 指定席ボタン,               遷移: () => '指定席選択' },
	    乗換案内から購入:      { 座標: 乗換案内から購入ボタン,     遷移: () => '指定席選択' },
	    自由席:                { 座標: 自由席ボタン,               遷移: () => '指定席選択' },
	    おトクなきっぷ:        { 座標: おトクなきっぷボタン,       遷移: () => 'あおもりホリデーパス' }
	}
    },
    指定席選択: {
	画像: 'https://gyazo.com/3a1f7bd4053a1989b9d32e1f2b8ce30e.png',
	ボタン: {
	    新幹線指定席:          { 座標: 新幹線指定席ボタン,         遷移: () => '新幹線指定席選択'},
	    新幹線在来線のりつぎ:  { 座標: 新幹線在来線のりつぎボタン, 遷移: () => 'トップ' }
	}
    },
    新幹線指定席選択: {
	画像: 'https://gyazo.com/b6a4379be160f099e8ce568a03f67793.png',
	ボタン: {
	    button31:              { 座標: button31,                   遷移: () => 'トップ'},
	    button32:              { 座標: button32,                   遷移: () => 'トップ'},
	    button33:              { 座標: button33,                   遷移: () => 'トップ'}
	}
    },
    あおもりホリデーパス: {
	画像: 'https://gyazo.com/99756639f580e97ae6015f2173e44187.png',
	ボタン: {
	    トップに戻る:          { 座標: 全面ボタン,                 遷移: () => 'トップ' }
	}
    },
    仙台まるごとパス: {
	画像: 'https://gyazo.com/eb4ec142d4a79ffbabbb8d9e12defce6.png',
	ボタン: {
	    トップに戻る:          { 座標: 全面ボタン,                 遷移: () => 'トップ' }
	}
    }
};

//
// ユーザを調べ、それに応じて状態遷移を変える
//
function updateNfcInfo(){
    var 券売機 = 鎌倉券売機;

    // 券売機関連のリンクを取得
    var 鎌倉券売機リスト = readLinks(券売機);

    //
    // 最も最近タッチされたカードのIDを取得
    // e.g. 増井Suica
    //
    var touchedNfc = nfcId(鎌倉券売機リスト[0]);

    //
    // 利用履歴取得
    // 最近の趣味がわかるハズ
    //
    var nfc利用履歴リスト = readLinks(touchedNfc);
    
    var done = false;
    nfc利用履歴リスト.forEach(function(利用履歴){
	var target = readerId(利用履歴);
	//
	// targetごとにいろんな処理!
	//
	if(target == 緑水亭ポスタ && ! done){
	    states.トップ.ボタン.おトクなきっぷ.遷移 = () => '仙台まるごとパス';
	    done = true;
	}
	if(target == 秋葉原サイネージ && ! done){
	    states.トップ.ボタン.おトクなきっぷ.遷移 = () => 'あおもりホリデーパス';
	    done = true;
	}
	if(target == 湘南台サイネージ && ! done){
	    states.トップ.ボタン.おトクなきっぷ.遷移 = () => 'あおもりホリデーパス';
	    done = true;
	}
    });
}

function transfunc(destfunc){
    return function(){
	trans(destfunc());
    };
}

function trans(name){ // nameという状態に遷移
    var state = states[name];
    
    updateNfcInfo(); // NFC情報更新。 遷移のたびに更新は問題だが

    //
    // バックグラウンドをクリア
    //
    $('body').empty().css('margin',0).css('padding',0);

    //
    // バックグラウンドに画像表示
    //
    var image = $('<img>').
	    attr('src',state.画像).
	    css('width','100%').
	    attr('usemap','#ImageMap').
	    appendTo($('body')).
	    rwdImageMaps();               // クリッカブルマップを拡大
    //
    // クリッカブルマップ定義
    //
    var map = $('<map>').
	    attr('name','ImageMap').
	    appendTo(image);
    //
    // クリッカブルマップ上のボタン領域と遷移定義
    //
    for (buttonname in state.ボタン){
	var button = state.ボタン[buttonname].座標;
	var area = $('<area>').
		appendTo(map).
		attr('shape','rect').
		attr('coords',`${button.left},${button.top},${button.right},${button.bottom}`);
	area.on('click', transfunc(state.ボタン[buttonname].遷移));
    }
};

function readLinks(id='', limit=10){ // RFIDのタッチ情報をConnecTouch.orgから取得
    var linkdata = [];
    var api = `http://connectouch.org/links?id=${id}&limit=${limit}`;
    $.ajaxSetup({async: false});
    $.getJSON(api, null, function(data, status){
	if (status == 'success') {
	    linkdata = data;
	}
    });
    return linkdata;
}

function nfcId(entry){
    var id = entry.link[0];
    if(isMac(id)) id = entry.link[1];
    return id;
}

function readerId(entry){
    var id = entry.link[0];
    if(! isMac(id)) id = entry.link[1];
    return id;
}

$(function() {
    trans('トップ');
});
