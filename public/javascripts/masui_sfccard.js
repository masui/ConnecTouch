//
// 増井のSFCカードをGoldfishにタッチしたときの行動
//
const id2name = {
    '0023dfdfe588': '秋葉原サイネージ',
    'f45c89bfd495': '湘南台サイネージ',
    'a45e60e40c05': '増井Mac',
    '0022cf46f69b': '緑水亭ポスタ',
    'b827ebc26e60': '鎌倉券売機',
    'e52d967345eb': 'ヒカルのマシン'
}

$(function() {
    var data = getHistory(増井SFCカード);
    $('<h1>').text('Masui Card History').appendTo($('body'));
    for(var i=0; i<data.length; i++){
	var link = data[i].link;
	var reader = link[0];
	if(reader == 増井SFCカード) reader = link[1];
	console.log(id2name[reader] + " " + reader);
	$('<div>').text(id2name[reader]).appendTo($('body'));
    }
    var data = getHistory('',100);
    for(var i=0; i<data.length; i++){
	var link = data[i].link;
	console.log("" + link[0] + " " + link[1]);
    }
});
