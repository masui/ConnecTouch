const list = {
  n0110041085168d11: 'masui.png',
  n01147302560fd305: 'masui.png',
  n011401147f10c10a: 'hayalawa.png',
  n0114b34d2414b148: 'hayakawa.png',
  n0114b34d0316e228: 'stake.png',
  n0114c302c014bf0f: 'sato.png',
  n0114c302c014bf0f: 'oyokawa.png',
  n0139001cb197e6f5: 'ito.png',
  p0023dfdfe588: '秋葉原サイネージ',
  pf45c89bfd495: '湘南台サイネージ',
  pa45e60e40c05: '増井Mac',
  p0022cf46f69b: '緑水亭ポスタ',
  pb827ebc26e60: '鎌倉券売機'
}


$(function() {
  //$('.place').hide();

  const linkURL = 'http://connectouch.org/links';
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
          let _time = calTime(data[index].time);
          let _place = list['p' + data[index].link[0]];
          let _icon = list['n' + data[index].link[1]];
          // if (type == 'n') {
          //   $('#datalist').append('<div class="data_set"><span class="data">' + data[index].link[0] + '</span><span class="time">' + calTime(data[index].time) + '</span></div>');
          // } else if (type == 'p') {
          //   $('#datalist').append('<div class="data_set"><span class="data">' + data[index].link[1] + '</span><span class="time">' + calTime(data[index].time) + '</span></div>');
          // }
          $('.timeline').append('<div class="column"><img class="icon" src="images/user_icons/'+ _icon +'" alt="icon" data-param="'+ data[index].link[1]+'" /><div class="link" data-param="'+ data[index].link[0]+'"><span class="place">'+_place +'</span><span class="time">'+_time +'</span></div></div>');
        }

      } else {
        console.log('error')
      }
    }
  );
  $(".timeline").on("click",".link",function() {
    let param = $(this).data('param');
    $(this).parent().css("background-color","#bebebe");
    let url = "pages/mobile_content.html?p" +param;
    window.location.href = url;
  });

  $('.timeline').on('click','.icon',function() {
    let param = $(this).data('param');
    let url = "pages/mobile_content.html?n" +param;
    window.location.href = url;
  })

})

function calTime(num) {
  let dat = new Date(num * 1000);//ミリ秒→秒
  return dat.toLocaleString().slice(0, -3).slice(5);//年及び秒数省略
}
