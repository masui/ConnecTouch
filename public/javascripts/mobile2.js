const list = {
  n0110041085168d11: 'masui.png',
  n01147302560fd305: 'masui.png',
  n011401147f10c10a: 'hayakawa.png',
  n0114b34d2414b148: 'hayakawa.png',
  n0114b34d0316e228: 'satake.png',
  n0114c302c014bf0f: 'satou.png',
  n010101121512e002: 'satou.png',
  n01010112a718242f: 'oyokawa.png',
  n0139001cb197e6f5: 'ito.png',
  n010101123d0c1c11: 'saji.png',
  p0023dfdfe588: '秋葉原サイネージ',
  pf45c89bfd495: '湘南台サイネージ',
  pa45e60e40c05: '増井Mac',
  p0022cf46f69b: '緑水亭ポスタ',
  pb827ebc26e60: '鎌倉券売機',
  pdeltapi: '',
  psatakepi: 'サイネージ',
  psajipi: '',
  phikarupi1: 'なぞなぞ１',
  phikarupi2: 'なぞなぞ2',
  phikarupi3: 'なぞなぞ3'
}

const IDlist = [
  '0110041085168d11',
  '01147302560fd305',
  '011401147f10c10a',
  '0114b34d2414b148',
  '0114b34d0316e228',
  '0114c302c014bf0f',
  '010101121512e002',
  '01010112a718242f',
  '0139001cb197e6f5',
  '010101123d0c1c11'
]
let viewdata = [[]];

$(function() {
  //$('.place').hide();
  let counter=0;
  let linkURL; //= 'http://connectouch.org/links?limit=10000';
  let i =0;
  for (i = 0; i <10; i++) {
    linkURL = 'http://connectouch.org/links?id='+IDlist[i]+'&limit=300'
    $.getJSON(
      linkURL, //第一引数にURL
      null, //第二引数に送信するデータ(今回は受信だけなので'null'指定)
      function(data, status) { //第三引数に受信時の処理を記述
        if (status == 'success' && data != undefined) { //通信が成功し中身も存在する場合処理を開始
          console.log(status);
          //$("#test").html(status + '!');
          console.log(data);

          //リーダーのIDとカードのIDを控える
          //最新の使用履歴にあるIDが自分のIDと仮定する
          //取得した配列から最後の要素を取り出す
          //const lastIndex = (data.length - 1) //要素数は0からカウントされるため
          //console.log('lastCardID : ' + data[lastIndex].link[1])
          //console.log('lastReaderID : ' + data[lastIndex].link[0])
          for (var index in data) {
            let l = viewdata.length;
            viewdata[l] = new Array(3)
            viewdata[l][0]= data[index].time;
            viewdata[l][1]= data[index].link[1];
            viewdata[l][2]= data[index].link[0];
          }
          counter += data.length;

        } else {
          console.log('error')
        }
      }
    );
  }
  if (i == 10) {
    for (var j=1; j<viewdata.length; j++) {
      let _time = calTime(viewdata[j][0]);
      let _place = list['p' + viewdata[j][2]];
      let _icon = list['n' + viewdata[j][1]];
      // if (type == 'n') {
      //   $('#datalist').append('<div class="data_set"><span class="data">' + data[index].link[0] + '</span><span class="time">' + calTime(data[index].time) + '</span></div>');
      // } else if (type == 'p') {
      //   $('#datalist').append('<div class="data_set"><span class="data">' + data[index].link[1] + '</span><span class="time">' + calTime(data[index].time) + '</span></div>');
      // }
      //if (_place != undefined && _icon != undefined) {
        $('.timeline').append('<div class="column"><img class="icon" src="images/user_icons/'+ _icon +'" alt="icon" data-param="'+ viewdata[j][2]+'" /><div class="link" data-param="'+ viewdata[j][1]+'"><span class="place">'+_place +'</span><span class="time">'+_time +'</span></div></div>');
      //}

    }
  }


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
