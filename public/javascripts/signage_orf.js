//
// RFIDのIDなどは javascripts/ids.js で定義している
//
var ownId = signage // 自身を定義
var currentUid = "" // 現在のユーザーのIDを保持
var latestRid  = "" // 最後にタッチしたリーダーのIDを保持

// connectouch.org/linksからデータを取得
function readLinks(directionsService, directionsDisplay){
  const linkURL = 'http://connectouch.org/links';
  $.getJSON(
	  linkURL,
	  null,
	  function(data, status){
    
      // 自身と同じIDを持つデータと取得
      var uidList = $.grep(data,
        function(elem, index){
          return(ownId == elem.link[0])
        });
       //現在のユーザーID
      currentUid = uidList[0].link[1]

      // 現在のユーザーが過去にタッチしたリーダーIDを取得
      var ridList = $.grep(data,
        function(elem, index){
          return(elem.link[0] != ownId && elem.link[1] == currentUid)
        });
      // 最後にタッチしたリーダーのID
      latestRid = ridList[0].link[0]

	    console.log(`currentUid = ${currentUid}`);
      console.log(`latestRid = ${latestRid}`);
      
      changeSrc(directionsService, directionsDisplay);
  });
};

// latestRidに合わせて表示するページを選定
function changeSrc(directionsService, directionsDisplay){
  var info = data.filter(function(elem, index){
    if (elem.id == latestRid) return true;
  });

  name = info[0].name
  endPoint = info[0].location
  src = info[0].url

  console.log(name)
  console.log(endPoint)
  console.log(src)

  $('#page').attr('src', src)

  calcAndDispRoute(endPoint, directionsService, directionsDisplay)
}

// TOPボタン
function returnTop() {
  $('#page').attr('src',"http://jasf.org/rosenzu/index.html");
}

// iframの更新処理
$(function() {
  $('#page').attr('marginwidth',0);
  $('#top').on('click',returnTop);
  //$('#recommend').on('click',readLinks);
  
  returnTop();
});