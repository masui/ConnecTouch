$(function() {

  const list = {
    n0110041085168d11: '増井Suica',
    n01147302560fd305: '増井SFCカード',
    n011401147f10c10a: '早川Suica',
    n0114b34d2414b148: '早川学生証',
    n0114b34d0316e228: '佐竹学生証',
    n0114c302c014bf0f: '佐藤学生証',
    n0114c302c014bf0f: '及川SFCカード',
    n0139001cb197e6f5: '伊藤iPhoneX',
    p0023dfdfe588: '秋葉原サイネージ',
    pf45c89bfd495: '湘南台サイネージ',
    pa45e60e40c05: '増井Mac',
    p0022cf46f69b: '緑水亭ポスタ',
    pb827ebc26e60: '鎌倉券売機'
  }


  const param = window.location.search.substring(1);
  const ids = window.location.search.substring(2);
  const type = window.location.search.substring(1, 2);
  //console.log(param);

  const linkURL = 'http://connectouch.org/links?id=' + ids;
  $('.text').append(list[param]);
  $.getJSON(
    linkURL, //第一引数にURL
    null, //第二引数に送信するデータ(今回は受信だけなので'null'指定)
    function(data, status) { //第三引数に受信時の処理を記述
      if (status == 'success' && data != undefined) { //通信が成功し中身も存在する場合処理を開始
        console.log(status);
        //$("#test").html(status + '!');
        console.log(data)

        //リーダーのIDとカードのIDを控える
        //最新の使用履歴にあるIDが自分のIDと仮定する
        //取得した配列から最後の要素を取り出す
        //const lastIndex = (data.length - 1) //要素数は0からカウントされるため
        //console.log('lastCardID : ' + data[lastIndex].link[1])
        //console.log('lastReaderID : ' + data[lastIndex].link[0])

        for (index in data) {

          data[index].link[1] = list['n' + data[index].link[1]];
          data[index].link[0] = list['p' + data[index].link[0]];
          if (type == 'n') {
            $('#datalist').append('<div class="data_set"><span class="data">' + data[index].link[0] + '</span><span class="time">' + calTime(data[index].time) + '</span></div>');
          } else if (type == 'p') {
            $('#datalist').append('<div class="data_set"><span class="data">' + data[index].link[1] + '</span><span class="time">' + calTime(data[index].time) + '</span></div>');
          }

        }

      } else {
        console.log('error')
      }
    });

})

function calTime(num) {
  let dat = new Date(num * 1000);//ミリ秒→秒
  return dat.toLocaleString().slice(0, -3).slice(5);//年及び秒数省略
}
