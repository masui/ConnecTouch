//
// 各種ライブラリ
//
function readHistory(id='', limit=10){ // RFIDのタッチ情報をConnecTouch.orgから取得
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


function isMac(id){ // IDがMACアドレスかどうか
    return id.match(/^[0-9a-f]{12}$/);
}

function isCard(id){ // IDがRFIDかどうか
    return !isMac(id);
}

function nfcId(entry){
    for(var id in entry.link){
	if(isCard(id)) return id;
    }
    return null;
}

function readerId(entry){
    for(var id in entry.link){
	if(isMac(id)) return id;
    }
    return null;
}

