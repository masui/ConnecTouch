//
// RFIDのIDなどは javascripts/ids.js で定義している
//
var ownId = signage // 自身を定義
var currentUid = "" // 現在のユーザーのIDを保持
var latestRid  = "" // 最後にタッチしたリーダーのIDを保持

const linkURL = 'http://connectouch.org/links';
let GET_UID = 'http://connectouch.org/links?id=' + ownId
let GET_RID = 'http://connectouch.org/links?id=' + currentUid

// サイネージにタッチしたユーザーのIDを特定
function getUid(directionsService, directionsDisplay) {
  $.getJSON(
    GET_UID,
    null,
    function(data, status){
      // 現在のユーザーを特定
      currentUid = data[0].link[1]
      getRid(directionsService, directionsDisplay)
  })
};

// 現在のユーザーが最後にタッチしたリーダーのIDを特定
function getRid(directionsService, directionsDisplay) {
  $.getJSON(
    GET_RID,
    null,
    function(data, status){
      latestRid = data[0].link[0]
      console.log(`currentUid = ${currentUid}`)
      console.log(`latestRid = ${latestRid}`)
      changeSrc(directionsService, directionsDisplay)
  })
}

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
  $('#page').attr('src',"railmap.html");
}

// iframの更新処理
$(function() {
  $('#page').attr('marginwidth',0);
  $('#top').on('click',returnTop);
  //$('#reco').on('click',readLinks);
  
  returnTop();
});