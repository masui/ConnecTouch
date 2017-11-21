//
// RFIDのIDなどは javascripts/ids.js で定義している
//
var ownId = ORFサイネージ // 自身を定義
var currentUid = "" // 現在のユーザーのIDを保持
var latestRid  = "" // 最後にタッチしたリーダーのIDを保持

const linkURL = 'http://connectouch.org/links';
const GET_ID = 'http://connectouch.org/links?id='

// サイネージにタッチしたユーザーのIDを特定
function getUid() {
  $.getJSON(
    GET_ID + ownId,
    null,
    function(data, status){
      // 現在のユーザーを特定
      currentUid = data[0].link[1]
      getRid()
  })
};

// 現在のユーザーが最後にタッチしたリーダーのIDを特定
function getRid() {
  $.getJSON(
    GET_ID + currentUid,
    null,
    function(data, status){
        var new_link;
        for(let v of data) {
            if(v.link[0] == ownId) continue;
            new_link = v.link[0];
            break;
        }
        if(new_link == latestRid) {
            console.log('same rid');
            return;
        }
        latestRid = new_link;
      console.log(`currentUid = ${currentUid}`)
      console.log(`latestRid = ${latestRid}`)
      changeSrc()
  })
}

// latestRidに合わせて表示するページを選定
function changeSrc(){
    console.log(data);
  var info = data.filter(function(elem, index){
    if (elem.id == latestRid) return true;
  });

  if(info.length == 0) return false;
  name = info[0].name;
  endPoint = info[0].location;
  src = info[0].url;

  console.log(name);
  console.log(endPoint);
  console.log(src);

  $('#page').attr('src', src);

  setInterval(function() {
    returnTop();
}, 20 * 1000);
}

// TOP遷移
function returnTop() {
  $('#page').attr('src',"top.html");
}

// iframの更新処理
$(function() {
  returnTop();
});

// ポーリング処理
var interval_sec = 1;
setInterval(function() {
    getUid();
}, interval_sec * 1000);