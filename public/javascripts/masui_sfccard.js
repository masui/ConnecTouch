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

const masuiFriends = [
    '0110041085168d11',   // 増井Suica
    '011401147f10c10a',   // 早川Suica
    '0114b34d2414b148',   // 早川学生証
    '0114b34d0316e228',   // 佐竹学生証
    '0114c302c014bf0f'    // 及川SFCカード
];

$(function() {
    var data = getHistory(増井SFCカード,10);
    $('<h1>').text('Masui Card Touch History').appendTo($('body'));
    for(var i=0; i<data.length; i++){
	var link = data[i].link;
	var reader = link[0];
	if(reader == 増井SFCカード) reader = link[1];
	console.log(id2name[reader] + " " + reader);
	//$('<div>').text(id2name[reader]).appendTo($('body'));
	$('<div>').text(id2name[reader] + "..." + new Date(data[i].time * 1000).toString()).appendTo($('body'));
    }
    var data = getHistory('',100);
    for(var i=0; i<data.length; i++){
	var link = data[i].link;
	if(masuiFriends.indexOf(link[0]))
	    console.log("found link[0]");
	if(masuiFriends.indexOf(link[1]))
	    console.log("found link[1]");
    }
});
