//
// RFIDのIDなどは javascripts/ids.js で定義している
//
var currentUid = "" // 現在のユーザーIDを保持しておく
var ridList = []    // 過去のタッチ履歴を保持しておく

// データを取得
function readLinks(){
    const linkURL = 'http://connectouch.org/links';
    $.getJSON(
	linkURL,
	null,
	function(data, status){
	    console.log(status);
	    console.log(data);
		
		// 同じリーダーIDを持つ最新のデータを見つけてそのユーザーIDを取得
	    var ownId = signage // リーダー自身のID
	    for (i=0; i<data.length; i++){
				if (ownId == data[i].link[0]){
					// 前回と同じユーザーの場合は処理を省略
					if (currentUid == data[i].link[1]){
						changeSrc();
						return;
					}
					else {
						currentUid = data[i].link[1]
					}
					break;
				};
			};
			
			// 現在のユーザーが過去にタッチしたと思われる自身以外のリーダーのIDを取得
			$.grep(data, function(elem, index){
				if(elem.link[0] != ownId && elem.link[1] == currentUid){
					ridList.push(elem.link[0]);
				};
				// リーダーIDのリストから重複を削除
				$.unique(ridList);
			});

	    console.log(`currentUid = ${currentUid}`);
			console.log(`ridList = ${ridList}`);
			
	    changeSrc();
	});
};

// ridListに合わせて表示するページを選定
function changeSrc(){

	// リーダーIDの配列からランダムに1つ抽出
		var randRid = ridList[Math.floor(Math.random() * ridList.length)];
		console.log(`randRid = ${randRid}`);
		
		// 選ばれたリーダーIDに合わせてplace,typeを決める
		// JSONのデータと紐付けるためのものです
		var place = "";
		var type = "";
		switch (randRid){
			case akibaSight:
				place = "Akiba"
				type  = "sightseeing"
				break;
			case fujisawaFood:
				place = "Fujisawashi"
				type  = "food"
				break;
			case sendaiRelax:
				place = "Sendaishi" 
				type  = "relax"
				break;
			case niigataAmuse:
				place = "Niigatashi"
				type  = "amusement"
				break;
		}

		// 対応するデータをローカルのJSONから取得
		var srcList = [];
		var src = "";
		$.when(
			$.getJSON(
				"data/signage.json",
				null,
				function(data, status){
					console.log(status);
					console.log(data);
					$.grep(data, function(elem, index){
						if (elem.place == place || elem.type == type){
							srcList.push(elem.url)
						};
					});
					console.log(`srcList = ${srcList}`)
				})
		).done(function(){
			src = srcList[Math.floor(Math.random() * srcList.length)];
			console.log(`src = ${src}`);
			console.log("");

			// linksのデータ次第でundifinedになることがあるのでその時は初期値に
			if (typeof src === "undefined"){
				returnTop();
				return;
			}

			// iframeの更新
			$('#page').attr('src',src);
		});
}

function returnTop() {
    $('#page').attr('src',"http://jasf.org/rosenzu/map_tokyo.png");
}

$(function() {
    $('#page').attr('marginwidth',0);
    $('#top').on('click',returnTop);
    $('#recommend').on('click',readLinks);

    returnTop();
});
