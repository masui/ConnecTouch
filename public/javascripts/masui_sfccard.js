//
// 増井のSFCカードをGoldfishにタッチしたときの行動
//
const idtable = [
    ['0023dfdfe588', '秋葉原サイネージ'],
    ['f45c89bfd495', '湘南台サイネージ'],
    ['a45e60e40c05', '増井Mac'],
    ['0022cf46f69b', '緑水亭ポスタ'],
    ['b827ebc26e60', '鎌倉券売機'],
    ['b827eb535d6f', 'RasPi??'],
    ['e52d967345eb', 'ヒカルのマシン'],
    
    ['0110041085168d11', '増井Suica'],
    ['01147302560fd305', '増井SFCカード'],
    ['011401147f10c10a', '早川Suica'],
    ['0114b34d2414b148', '早川学生証'],
    ['0114b34d0316e228', '佐竹学生証'],
    ['0114c302c014bf0f', '及川SFCカード']
];

function id2name(id){
    for(var i=0;i<idtable.length;i++){
	if(id == idtable[i][0]) return idtable[i][1];
    }
    return id;
};

function name2id(name){
    for(var i=0;i<idtable.length;i++){
	if(name == idtable[i][1]) return idtable[i][0];
    }
    return name;
};

const masuiFriends = [
    '0110041085168d11',   // 増井Suica
    '011401147f10c10a',   // 早川Suica
    '0114b34d2414b148',   // 早川学生証
    '0114b34d0316e228',   // 佐竹学生証
    '0114c302c014bf0f'    // 及川SFCカード
];

function zeropad(s){
    return ("0"+s).slice(-2);
}

function datestr(t){
    var d = new Date(t * 1000);
    return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}` + ' ' +
	`${zeropad(d.getHours())}:${zeropad(d.getMinutes())}:${zeropad(d.getSeconds())}`;
}

$(function() {
    var data = getHistory(増井SFCカード,10);
    $('<h1>').text('増井カード履歴').appendTo($('body'));
    var ul = $('<ul>').appendTo($('body'));
    for(var i=0; i<data.length; i++){
	var link = data[i].link;
	var reader = link[0];
	if(reader == 増井SFCカード) reader = link[1];
	$('<li>').text(`${datestr(data[i].time)} - ${id2name(reader)}`).appendTo(ul);
    }
    var data = getHistory('',100);
    $('<h1>').text('増井の友達カード履歴').appendTo($('body'));
    ul = $('<ul>').appendTo($('body'));
    for(var i=0; i<data.length; i++){
	var link = data[i].link;
	var cardname = null;
	var readername;
	if(masuiFriends.indexOf(link[0]) >= 0){
	    cardname = id2name(link[0]);
	    readername = id2name(link[1]);
	}
	if(masuiFriends.indexOf(link[1]) >= 0){
	    cardname = id2name(link[1]);
	    readername = id2name(link[0]);
	}
	if(cardname){
	    $('<li>').text(`${datestr(data[i].time)} - ${cardname}が${readername}にタッチ`).appendTo(ul);
	}
    }
});
